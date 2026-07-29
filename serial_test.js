/**
 * Web Serial API Controller for Arduino Firmware (web_serial_firmware.ino)
 */

let port = null;
let reader = null;
let keepReading = true;
let inputBuffer = '';

// DOM Elements
const statusBadge = document.getElementById('status-badge');
const statusText = document.getElementById('status-text');
const btnConnect = document.getElementById('btn-connect');
const btnDisconnect = document.getElementById('btn-disconnect');
const baudRateSelect = document.getElementById('baud-rate-select');
const terminal = document.getElementById('terminal-screen');
const warningBox = document.getElementById('web-serial-warning');

// Control Inputs & Buttons
const btnSendPing = document.getElementById('btn-send-ping');
const btnDigitalOn = document.getElementById('btn-digital-on');
const btnDigitalOff = document.getElementById('btn-digital-off');
const btnCustomDigitalWrite = document.getElementById('btn-custom-digital-write');
const digitalPinInput = document.getElementById('digital-pin-input');
const digitalValSelect = document.getElementById('digital-val-select');

const btnDigitalRead = document.getElementById('btn-digital-read');
const digitalReadPin = document.getElementById('digital-read-pin');

const pwmSlider = document.getElementById('pwm-slider');
const pwmValText = document.getElementById('pwm-val-text');

const btnAnalogRead = document.getElementById('btn-analog-read');
const analogReadPin = document.getElementById('analog-read-pin');

const servoSlider = document.getElementById('servo-slider');
const servoValText = document.getElementById('servo-val-text');

const btnBuzzerSend = document.getElementById('btn-buzzer-send');
const buzzerFreq = document.getElementById('buzzer-freq');
const buzzerMs = document.getElementById('buzzer-ms');

const rawCmdInput = document.getElementById('raw-cmd-input');
const btnSendRaw = document.getElementById('btn-send-raw');
const btnClearLog = document.getElementById('btn-clear-log');

// Interactive Control Elements Array for Toggling Disabled State
const controlElements = [
  btnSendPing, btnDigitalOn, btnDigitalOff, btnCustomDigitalWrite,
  btnDigitalRead, pwmSlider, btnAnalogRead, servoSlider,
  btnBuzzerSend, rawCmdInput, btnSendRaw
];

// Check Browser Web Serial API Compatibility
if (!('serial' in navigator)) {
  warningBox.style.display = 'block';
  btnConnect.disabled = true;
  logTerminal('Web Serial API를 지원하지 않는 브라우저입니다.', 'err');
}

/**
 * Appends formatted message to terminal log
 * @param {string} msg 
 * @param {'info' | 'sent' | 'recv' | 'err'} type 
 */
function logTerminal(msg, type = 'info') {
  const time = new Date().toLocaleTimeString();
  const line = document.createElement('div');
  line.className = `log-${type}`;

  if (type === 'sent') {
    line.textContent = `[${time}] >> ${msg}`;
  } else if (type === 'recv') {
    line.textContent = `[${time}] << ${msg}`;
  } else if (type === 'err') {
    line.textContent = `[${time}] [ERROR] ${msg}`;
  } else {
    line.textContent = `[${time}] [INFO] ${msg}`;
  }

  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

/**
 * Updates UI connection state
 * @param {boolean} isConnected 
 */
function updateConnectionUI(isConnected) {
  if (isConnected) {
    statusBadge.classList.add('connected');
    statusText.textContent = '연결됨 (Connected)';
    btnConnect.disabled = true;
    btnDisconnect.disabled = false;
    baudRateSelect.disabled = true;

    controlElements.forEach(el => {
      if (el) el.disabled = false;
    });
  } else {
    statusBadge.classList.remove('connected');
    statusText.textContent = '연결 해제됨';
    btnConnect.disabled = false;
    btnDisconnect.disabled = true;
    baudRateSelect.disabled = false;

    controlElements.forEach(el => {
      if (el) el.disabled = true;
    });
  }
}

/**
 * Connects to Arduino via Web Serial API
 */
async function connectSerial() {
  try {
    const baudRate = parseInt(baudRateSelect.value, 10) || 115200;
    logTerminal(`시리얼 포트 선택 창 요청 중 (Baud Rate: ${baudRate})...`, 'info');

    port = await navigator.serial.requestPort();
    await port.open({ baudRate });

    logTerminal(`시리얼 포트 연결 성공! (${baudRate} bps)`, 'info');
    updateConnectionUI(true);

    keepReading = true;
    readSerialLoop();
  } catch (err) {
    console.error('Serial Connection Failed:', err);
    logTerminal(`연결 실패: ${err.message}`, 'err');
    updateConnectionUI(false);
  }
}

/**
 * Reads serial data stream line by line
 */
async function readSerialLoop() {
  while (port && port.readable && keepReading) {
    try {
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      reader = textDecoder.readable.getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          reader.releaseLock();
          break;
        }
        if (value) {
          inputBuffer += value;
          const lines = inputBuffer.split('\n');
          // Keep last incomplete chunk in buffer
          inputBuffer = lines.pop();

          lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed) {
              logTerminal(trimmed, 'recv');
            }
          });
        }
      }
    } catch (err) {
      console.error('Serial Read Error:', err);
      logTerminal(`수신 에러: ${err.message}`, 'err');
      break;
    }
  }
}

/**
 * Sends command string to Arduino over Serial
 * @param {string} cmdString 
 */
async function sendSerialCommand(cmdString) {
  if (!port || !port.writable) {
    logTerminal('시리얼 포트가 연결되어 있지 않습니다.', 'err');
    return;
  }

  try {
    const encoder = new TextEncoder();
    const writer = port.writable.getWriter();
    const payload = cmdString.trim() + '\n';
    await writer.write(encoder.encode(payload));
    writer.releaseLock();

    logTerminal(cmdString.trim(), 'sent');
  } catch (err) {
    console.error('Serial Write Error:', err);
    logTerminal(`송신 실패: ${err.message}`, 'err');
  }
}

/**
 * Disconnects Serial port
 */
async function disconnectSerial() {
  keepReading = false;

  if (reader) {
    try {
      await reader.cancel();
    } catch (e) {}
  }

  if (port) {
    try {
      await port.close();
      logTerminal('시리얼 포트 연결이 정상 해제되었습니다.', 'info');
    } catch (err) {
      logTerminal(`포트 닫기 에러: ${err.message}`, 'err');
    }
    port = null;
  }

  updateConnectionUI(false);
}

// ==========================================
// Event Listeners
// ==========================================

btnConnect.addEventListener('click', connectSerial);
btnDisconnect.addEventListener('click', disconnectSerial);

// 1. PING
btnSendPing.addEventListener('click', () => sendSerialCommand('PING'));

// 2. DIGITAL Commands
btnDigitalOn.addEventListener('click', () => sendSerialCommand('DIGITAL:WRITE:13:1'));
btnDigitalOff.addEventListener('click', () => sendSerialCommand('DIGITAL:WRITE:13:0'));

btnCustomDigitalWrite.addEventListener('click', () => {
  const pin = digitalPinInput.value || 13;
  const val = digitalValSelect.value || 1;
  sendSerialCommand(`DIGITAL:WRITE:${pin}:${val}`);
});

btnDigitalRead.addEventListener('click', () => {
  const pin = digitalReadPin.value || 2;
  sendSerialCommand(`DIGITAL:READ:${pin}`);
});

// 3. ANALOG Commands
pwmSlider.addEventListener('input', (e) => {
  pwmValText.textContent = e.target.value;
});

pwmSlider.addEventListener('change', (e) => {
  sendSerialCommand(`ANALOG:WRITE:9:${e.target.value}`);
});

btnAnalogRead.addEventListener('click', () => {
  const pin = analogReadPin.value || 0;
  sendSerialCommand(`ANALOG:READ:${pin}`);
});

// 4. SERVO Commands
servoSlider.addEventListener('input', (e) => {
  servoValText.textContent = `${e.target.value}°`;
});

servoSlider.addEventListener('change', (e) => {
  sendSerialCommand(`SERVO:WRITE:9:${e.target.value}`);
});

// 5. BUZZER Command
btnBuzzerSend.addEventListener('click', () => {
  const pin = 8;
  const freq = buzzerFreq.value || 523;
  const duration = buzzerMs.value || 300;
  sendSerialCommand(`BUZZER:${pin}:${freq}:${duration}`);
});

// 6. Raw Command Input
btnSendRaw.addEventListener('click', () => {
  const cmd = rawCmdInput.value;
  if (cmd) {
    sendSerialCommand(cmd);
    rawCmdInput.value = '';
  }
});

rawCmdInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    btnSendRaw.click();
  }
});

btnClearLog.addEventListener('click', () => {
  terminal.innerHTML = '<div class="log-info">[System] 터미널 로그가 초기화되었습니다.</div>';
});

// Initial UI Setup
updateConnectionUI(false);
