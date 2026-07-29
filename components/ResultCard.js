import { createRadarChart } from './RadarChart.js';
import { createButton } from './Button.js';

/**
 * ResultCard Component
 * @param {Object} props
 * @param {Object} props.typeData - Result type metadata (title, badgeText, emoji, color, strengths, chemistry)
 * @param {Object} props.scores - Score breakdown object
 * @param {Function} props.onShare - Share button callback
 * @param {Function} props.onRetry - Retry button callback
 * @returns {HTMLElement}
 */
export function createResultCard({ typeData = {}, scores = {}, onShare, onRetry } = {}) {
  const container = document.createElement('div');
  container.className = 'result-card animate-slide-up';

  const defaultType = {
    badgeText: typeData.badgeText || '일단 고 추진러',
    title: typeData.title || '🔥 실행형 (Action Taker)',
    subtitle: typeData.subtitle || '고민보다는 일단 행동으로 부딪히며 피득백을 수집하는 창업가!',
    emoji: typeData.emoji || '🚀',
    color: typeData.color || '#EE5253',
    strengths: typeData.strengths || [
      '빠른 실행력과 뛰어난 현장 검증 능력',
      '고객 피백을 적극적으로 수용하는 유연함',
      '팀에 강력한 추진력과 에너지 불어넣기'
    ],
    bestMatch: typeData.bestMatch || '전략형, 분석형',
  };

  container.innerHTML = `
    <div class="result-badge" style="background-color: ${defaultType.color};">
      ${defaultType.badgeText}
    </div>
    <h1 class="result-title">${defaultType.title}</h1>
    <p class="result-subtitle">${defaultType.subtitle}</p>

    <div class="result-graphic">
      <span>${defaultType.emoji}</span>
    </div>

    <!-- 6-Axis Radar Score Chart -->
    <div id="chart-wrapper"></div>

    <!-- Key Strengths List -->
    <div class="strength-list">
      <h3 class="text-h3" style="margin-bottom: 12px; color: var(--color-text-main);">💡 핵심 강점</h3>
      ${defaultType.strengths.map(s => `
        <div class="strength-item">
          <span class="strength-icon">✔</span>
          <span>${s}</span>
        </div>
      `).join('')}
    </div>

    <!-- Match Badge -->
    <div style="background-color: #f3f0ff; padding: 14px 18px; border-radius: var(--radius-md); margin-bottom: 24px; text-align: left;">
      <span style="font-size: 14px; font-weight: 700; color: var(--color-primary);">🤝 환상의 짝꿍 유형:</span>
      <span style="font-size: 14px; font-weight: 600; color: var(--color-text-main); margin-left: 6px;">${defaultType.bestMatch}</span>
    </div>

    <!-- Action Buttons -->
    <div class="button-group" style="display: flex; flex-direction: column; gap: 12px;"></div>
  `;

  // Mount Radar Chart
  const chartWrapper = container.querySelector('#chart-wrapper');
  chartWrapper.appendChild(createRadarChart({ scores }));

  // Mount Action Buttons
  const buttonGroup = container.querySelector('.button-group');
  const shareBtn = createButton({
    text: '결과 링크 복사하기',
    variant: 'primary',
    icon: '🔗',
    onClick: onShare
  });

  const retryBtn = createButton({
    text: '테스트 다시하기',
    variant: 'secondary',
    icon: '🔄',
    onClick: onRetry
  });

  buttonGroup.appendChild(shareBtn);
  buttonGroup.appendChild(retryBtn);

  return container;
}
