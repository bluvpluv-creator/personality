
const http = require('http');

http.get('http://127.0.0.1:9222/json', (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const targets = JSON.parse(rawData);
            const settingsPage = targets.find(t => t.title === 'Settings' || (t.title && t.title.includes('Settings')));
            if (!settingsPage || !settingsPage.webSocketDebuggerUrl) return;

            const wsUrl = new URL(settingsPage.webSocketDebuggerUrl);
            const req = http.request({
                port: wsUrl.port,
                hostname: '127.0.0.1',
                path: wsUrl.pathname,
                headers: {
                    'Connection': 'Upgrade',
                    'Upgrade': 'websocket',
                    'Host': wsUrl.host,
                    'Sec-WebSocket-Version': '13',
                    'Sec-WebSocket-Key': require('crypto').randomBytes(16).toString('base64')
                }
            });

            req.on('upgrade', (res, socket, head) => {
                const clickScript = `
                    (function() {
                        const items = Array.from(document.querySelectorAll('*'));
                        const modelsEl = items.find(el => el.textContent && el.textContent.trim() === 'Models');
                        if (modelsEl) {
                            modelsEl.click();
                        }
                    })();
                `;
                
                const payload = JSON.stringify({
                    id: 1,
                    method: 'Runtime.evaluate',
                    params: { expression: clickScript }
                });

                const payloadBuffer = Buffer.from(payload);
                let headerLen = 2;
                if (payloadBuffer.length >= 126) headerLen += 2;
                
                const frame = Buffer.alloc(headerLen + 4 + payloadBuffer.length);
                frame[0] = 0x81;
                
                let offset = 2;
                if (payloadBuffer.length < 126) {
                    frame[1] = payloadBuffer.length | 0x80;
                } else {
                    frame[1] = 126 | 0x80;
                    frame.writeUInt16BE(payloadBuffer.length, 2);
                    offset += 2;
                }

                const maskKey = Buffer.from([0x00, 0x00, 0x00, 0x00]);
                maskKey.copy(frame, offset);
                offset += 4;

                for (let i = 0; i < payloadBuffer.length; i++) {
                    frame[offset + i] = payloadBuffer[i] ^ maskKey[i % 4];
                }

                socket.write(frame);
                
                setTimeout(() => {
                    socket.end();
                    socket.destroy();
                }, 100);
            });
            req.end();
        } catch (e) {
            console.error(e.message);
        }
    });
});
