/**
 * Web Serial API Controller for Arduino Universal Firmware
 * Baud Rate: 115200
 */

let port = null;
let reader = null;
let writer = null;
let keepReading = false;

// DOM Elements
const btnConnect = document.getElementById('btn-connect');
const btnDisconnect = document.getElementById('btn-disconnect');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const terminalLog = document.getElementById('terminal-log');
const btnClearTerm = document.getElementById('btn-clear-term');

// Slider Value Displays
const outSlider = document.getElementById('out-slider');
const outVal = document.getElementById('out-val');
const servoSlider = document.getElementById('servo-slider');
const servoVal = document.getElementById('servo-val');

// Initialize UI Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  checkWebSerialSupport();
});

function checkWebSerialSupport() {
  if (!('serial' in navigator)) {
    logTerminal('ERR', '이 브라우저는 Web Serial API를 지원하지 않습니다. Chrome/Edge 브라우저를 사용해 주세요.');
    btnConnect.disabled = true;
  }
}

function setupEventListeners() {
  // Connect / Disconnect Buttons
  btnConnect.addEventListener('click', connectSerial);
  btnDisconnect.addEventListener('click', disconnectSerial);
  btnClearTerm.addEventListener('click', () => {
    terminalLog.innerHTML = '';
  });

  // Slider Updates
  outSlider.addEventListener('input', (e) => {
    outVal.textContent = e.target.value;
  });
  servoSlider.addEventListener('input', (e) => {
    servoVal.textContent = `${e.target.value}°`;
  });

  // Actuator Buttons
  document.getElementById('btn-send-out').addEventListener('click', () => {
    sendCommand(`OUT:${outSlider.value}`);
  });

  document.getElementById('btn-send-servo').addEventListener('click', () => {
    sendCommand(`SERVO:${servoSlider.value}`);
  });

  document.getElementById('btn-send-buzzer').addEventListener('click', () => {
    const freq = document.getElementById('buzzer-freq').value || 1000;
    const dur = document.getElementById('buzzer-dur').value;
    if (dur) {
      sendCommand(`BUZZER:${freq},${dur}`);
    } else {
      sendCommand(`BUZZER:${freq}`);
    }
  });

  document.getElementById('btn-stop-buzzer').addEventListener('click', () => {
    sendCommand(`BUZZER:0`);
  });

  document.getElementById('btn-send-neo').addEventListener('click', () => {
    const hexColor = document.getElementById('neo-color').value;
    const idx = document.getElementById('neo-idx').value.trim();
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    if (idx !== '') {
      sendCommand(`NEO:${idx},${r},${g},${b}`);
    } else {
      sendCommand(`NEO:${r},${g},${b}`);
    }
  });

  document.getElementById('btn-send-lcd').addEventListener('click', () => {
    const row = document.getElementById('lcd-row').value;
    const text = document.getElementById('lcd-text').value;
    sendCommand(`LCD:${row},${text}`);
  });

  document.getElementById('btn-send-mp3').addEventListener('click', () => {
    const track = document.getElementById('mp3-track').value || 1;
    sendCommand(`MP3:${track}`);
  });

  // Sensor Reading Buttons
  document.getElementById('btn-read-dht').addEventListener('click', () => sendCommand('READ:DHT'));
  document.getElementById('btn-read-ultra').addEventListener('click', () => sendCommand('READ:ULTRA'));
  document.getElementById('btn-read-light').addEventListener('click', () => sendCommand('READ:LIGHT'));
  document.getElementById('btn-read-soil').addEventListener('click', () => sendCommand('READ:SOIL'));
  document.getElementById('btn-read-switch').addEventListener('click', () => sendCommand('READ:SWITCH'));
  document.getElementById('btn-read-dust').addEventListener('click', () => sendCommand('READ:DUST'));

  document.getElementById('btn-read-all').addEventListener('click', async () => {
    const sensors = ['READ:DHT', 'READ:ULTRA', 'READ:LIGHT', 'READ:SOIL', 'READ:SWITCH', 'READ:DUST'];
    for (const s of sensors) {
      await sendCommand(s);
      await new Promise(r => setTimeout(r, 200));
    }
  });

  // Custom Command Input
  const customCmdInput = document.getElementById('custom-cmd-input');
  document.getElementById('btn-send-custom').addEventListener('click', () => {
    const cmd = customCmdInput.value.trim();
    if (cmd) {
      sendCommand(cmd);
      customCmdInput.value = '';
    }
  });

  customCmdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const cmd = customCmdInput.value.trim();
      if (cmd) {
        sendCommand(cmd);
        customCmdInput.value = '';
      }
    }
  });
}

/**
 * Connect to Web Serial Port (115200 Baud)
 */
async function connectSerial() {
  try {
    port = await navigator.serial.requestPort();
    logTerminal('INFO', '시리얼 포트 선택됨. 연결을 시도합니다 (115200 Baud)...');
    
    await port.open({ baudRate: 115200 });

    const textEncoder = new TextEncoderStream();
    const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
    writer = textEncoder.writable.getWriter();

    keepReading = true;
    updateConnectionStatus(true);
    logTerminal('INFO', '🟢 아두이노와 115200 Baud 속도로 성공적으로 연결되었습니다!');

    // Start read loop asynchronously
    readLoop();
  } catch (err) {
    console.error('Serial connect error:', err);
    logTerminal('ERR', `연결 실패: ${err.message}`);
    updateConnectionStatus(false);
  }
}

/**
 * Disconnect Web Serial Port
 */
async function disconnectSerial() {
  keepReading = false;
  
  if (reader) {
    try {
      await reader.cancel();
    } catch (e) {}
    reader = null;
  }

  if (writer) {
    try {
      await writer.close();
    } catch (e) {}
    writer = null;
  }

  if (port) {
    try {
      await port.close();
    } catch (e) {}
    port = null;
  }

  updateConnectionStatus(false);
  logTerminal('INFO', '🔴 아두이노와 연결이 해제되었습니다.');
}

/**
 * Send command string to Arduino
 * @param {string} cmd 
 */
async function sendCommand(cmd) {
  if (!writer) {
    logTerminal('ERR', '아두이노가 연결되지 않았습니다.');
    return;
  }

  const formatted = cmd.trim() + '\n';
  try {
    await writer.write(formatted);
    logTerminal('TX', cmd.trim());
  } catch (err) {
    console.error('Send command error:', err);
    logTerminal('ERR', `전송 오류: ${err.message}`);
  }
}

/**
 * Asynchronous Serial Read Loop
 */
async function readLoop() {
  const textDecoder = new TextDecoderStream();
  const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
  reader = textDecoder.readable.getReader();

  let receiveBuffer = '';

  try {
    while (keepReading) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      receiveBuffer += value;
      let lines = receiveBuffer.split(/\r?\n/);
      receiveBuffer = lines.pop(); // Keep remaining un-terminated line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.length > 0) {
          handleIncomingResponse(trimmed);
        }
      }
    }
  } catch (err) {
    console.error('Read loop error:', err);
    logTerminal('ERR', `수신 오류: ${err.message}`);
  } finally {
    if (reader) {
      reader.releaseLock();
    }
  }
}

/**
 * Handles incoming response strings from Arduino
 * @param {string} line 
 */
function handleIncomingResponse(line) {
  if (line.startsWith('OK:')) {
    logTerminal('OK', line);
  } else if (line.startsWith('DATA:')) {
    logTerminal('RX', line);
    parseSensorData(line);
  } else if (line.startsWith('ERR:')) {
    logTerminal('ERR', line);
  } else {
    logTerminal('RX', line);
  }
}

/**
 * Parses sensor response format (DATA:SENSOR:VALUE) and updates UI badges
 * @param {string} line 
 */
function parseSensorData(line) {
  // Line format: DATA:SENSOR:VALUE (e.g. DATA:DHT:24.5,50.0)
  const parts = line.split(':');
  if (parts.length >= 3) {
    const sensor = parts[1];
    const val = parts.slice(2).join(':');

    if (sensor === 'DHT') {
      const el = document.getElementById('val-dht');
      if (el) el.textContent = `${val} (°C, %)`;
    } else if (sensor === 'ULTRA') {
      const el = document.getElementById('val-ultra');
      if (el) el.textContent = `${parseFloat(val).toFixed(1)} cm`;
    } else if (sensor === 'LIGHT') {
      const el = document.getElementById('val-light');
      if (el) el.textContent = val;
    } else if (sensor === 'SOIL') {
      const el = document.getElementById('val-soil');
      if (el) el.textContent = val;
    } else if (sensor === 'SWITCH') {
      const el = document.getElementById('val-switch');
      if (el) el.textContent = val;
    } else if (sensor === 'DUST') {
      const el = document.getElementById('val-dust');
      if (el) el.textContent = val;
    }
  }
}

/**
 * Updates UI connection state
 * @param {boolean} isConnected 
 */
function updateConnectionStatus(isConnected) {
  if (isConnected) {
    statusDot.classList.add('connected');
    statusText.textContent = '아두이노 연결됨 (115200 Baud)';
    btnConnect.style.display = 'none';
    btnDisconnect.style.display = 'inline-flex';
  } else {
    statusDot.classList.remove('connected');
    statusText.textContent = '아두이노 연결 해제됨';
    btnConnect.style.display = 'inline-flex';
    btnDisconnect.style.display = 'none';
  }
}

/**
 * Log message to Web Serial Terminal console UI
 * @param {'TX' | 'RX' | 'OK' | 'ERR' | 'INFO'} type 
 * @param {string} message 
 */
function logTerminal(type, message) {
  const timestamp = new Date().toLocaleTimeString();
  const entry = document.createElement('div');
  entry.className = 'log-entry';

  let typeClass = 'log-info';
  let typeLabel = '[INFO]';

  if (type === 'TX') {
    typeClass = 'log-tx';
    typeLabel = '[TX ➡️]';
  } else if (type === 'RX') {
    typeClass = 'log-rx';
    typeLabel = '[RX ⬅️]';
  } else if (type === 'OK') {
    typeClass = 'log-ok';
    typeLabel = '[OK ✅]';
  } else if (type === 'ERR') {
    typeClass = 'log-err';
    typeLabel = '[ERR ❌]';
  }

  entry.innerHTML = `<span style="color: #666;">[${timestamp}]</span> <span class="${typeClass}">${typeLabel}</span> ${escapeHtml(message)}`;
  terminalLog.appendChild(entry);
  terminalLog.scrollTop = terminalLog.scrollHeight;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
