import { createHeader } from './Header.js';

/**
 * LoadingScreen Component for Analysis State
 * @param {Object} props
 * @param {number} [props.duration=3000] - Loading duration in ms before completing
 * @param {Array<string>} [props.messages] - Dynamic cycling messages
 * @param {Function} [props.onComplete] - Callback when loading finishes
 * @returns {HTMLElement & { cancelTimer: () => void }}
 */
export function createLoadingScreen({
  duration = 3000,
  messages = [
    '당신의 창업 답변 데이터를 모으고 있어요...',
    '6가지 창업 성향 매칭 알고리즘 가동 중...',
    '당신과 어울리는 환상의 짝꿍 분석 완료!'
  ],
  onComplete
} = {}) {
  const container = document.createElement('div');
  container.className = 'loading-screen-container animate-slide-up';

  // Top Header Component
  const header = createHeader({ logoText: '나의 창업 DNA', badgeText: '분석 중' });
  container.appendChild(header);

  // Content Box
  const content = document.createElement('div');
  content.className = 'loading-screen-content';

  content.innerHTML = `
    <div class="loading-graphic-wrapper">
      <div class="loading-graphic pulse-glow">
        <span class="loading-icon">🔍</span>
      </div>
      <div class="loading-spinner-ring"></div>
    </div>

    <h2 class="text-h2 loading-title">창업 DNA 분석 중</h2>
    <p class="text-body loading-message" id="loading-message-text">${messages[0]}</p>

    <!-- Sub Loading Dots Bar -->
    <div class="loading-dots-bar">
      <span class="dot dot-1"></span>
      <span class="dot dot-2"></span>
      <span class="dot dot-3"></span>
    </div>
  `;

  container.appendChild(content);

  // Message Cycling Logic & Completion Timer
  let msgIdx = 0;
  const msgEl = content.querySelector('#loading-message-text');

  const intervalId = setInterval(() => {
    msgIdx = (msgIdx + 1) % messages.length;
    if (msgEl) {
      msgEl.style.opacity = '0';
      setTimeout(() => {
        msgEl.textContent = messages[msgIdx];
        msgEl.style.opacity = '1';
      }, 150);
    }
  }, 1000);

  const timeoutId = setTimeout(() => {
    clearInterval(intervalId);
    if (typeof onComplete === 'function') {
      onComplete();
    }
  }, duration);

  container.cancelTimer = () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };

  return container;
}
