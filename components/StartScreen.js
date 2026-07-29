import { createHeader } from './Header.js';
import { createButton } from './Button.js';

/**
 * StartScreen (Landing View) Component
 * @param {Object} props
 * @param {string} [props.logoText='나의 창업 DNA']
 * @param {string} [props.badgeText='STI Test']
 * @param {number} [props.participantCount=154]
 * @param {Function} props.onStartTest - Callback when "테스트 시작하기" button is clicked
 * @returns {HTMLElement}
 */
export function createStartScreen({
  logoText = '나의 창업 DNA',
  badgeText = 'STI Test',
  participantCount = 154,
  onStartTest
} = {}) {
  const container = document.createElement('div');
  container.className = 'start-screen-container animate-slide-up';

  // 1. Top Header Component
  const header = createHeader({ logoText, badgeText });
  container.appendChild(header);

  // 2. Main Content Wrapper
  const content = document.createElement('div');
  content.className = 'start-screen-content';

  content.innerHTML = `
    <!-- Social Proof Badge -->
    <div class="social-proof-badge">
      <span class="badge-icon">🔥</span>
      <span>현재 <strong>${participantCount.toLocaleString()}명</strong>의 대학생 참여 중</span>
    </div>

    <!-- Floating Hero Graphic -->
    <div class="hero-graphic-wrapper">
      <div class="hero-graphic-circle">
        <span class="hero-emoji">🚀</span>
      </div>
      <div class="hero-sub-badge badge-idea">💡 아이디어</div>
      <div class="hero-sub-badge badge-action">🔥 실행력</div>
    </div>

    <!-- Main Title & Subtitle -->
    <h1 class="text-h1 start-title">
      10초 만에 알아보는<br>
      <span class="highlight-text">나의 창업 DNA</span>
    </h1>

    <p class="text-body start-subtitle">
      창업 캠프에서 나는 기획자일까, 제작자일까?<br>
      내 창업 성향과 환상의 짝꿍을 찾아보세요!
    </p>

    <!-- Feature Highlights -->
    <div class="feature-highlights">
      <div class="feature-tag">⏱️ 2분 소요</div>
      <div class="feature-tag">🎯 12개 질문</div>
      <div class="feature-tag">🤝 팀원 궁합 추천</div>
    </div>

    <!-- CTA Button Slot -->
    <div class="cta-button-wrapper" id="cta-button-slot"></div>
  `;

  // 3. Mount Primary CTA Button
  const ctaSlot = content.querySelector('#cta-button-slot');
  const startButton = createButton({
    text: '테스트 시작하기',
    variant: 'primary',
    icon: '🚀',
    onClick: onStartTest
  });
  ctaSlot.appendChild(startButton);

  container.appendChild(content);

  return container;
}
