const vscode = require('vscode');
const cp = require('child_process');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = `$(server-environment) QUOTA`;
    statusBarItem.tooltip = `Open Antigravity MODEL QUOTA Settings`;
    statusBarItem.command = 'antigravityQuotaButton.openModelsSettings';
    statusBarItem.show();

    let disposable = vscode.commands.registerCommand('antigravityQuotaButton.openModelsSettings', async () => {
        // 設定画面を開く
        await vscode.commands.executeCommand('workbench.action.openAntigravitySettings');
        vscode.window.showInformationMessage("Opening Models Quota... 🚀");

        // 描画待機（1秒）
        setTimeout(() => {
            const jsScript = `
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
                const clickScript = \`
                    (function() {
                        const items = Array.from(document.querySelectorAll('*'));
                        const modelsEl = items.find(el => el.textContent && el.textContent.trim() === 'Models');
                        if (modelsEl) {
                            modelsEl.click();
                        }
                    })();
                \`;
                
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
`;
            const scriptPath = require('path').join(__dirname, 'cdp_script.js');
            require('fs').writeFileSync(scriptPath, jsScript);

            // nodeプロセスを利用して強制実行し、結果をハンドリング
            cp.exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`Quota Button Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    vscode.window.showErrorMessage(`Quota Button Stderr: ${stderr}`);
                    return;
                }
                if (stdout && stdout.trim().length > 0) {
                    vscode.window.showInformationMessage(`Quota Button Log: ${stdout}`);
                }
            });
        }, 1000);
    });

    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
