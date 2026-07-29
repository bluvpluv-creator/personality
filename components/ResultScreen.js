import { createHeader } from './Header.js';
import { createRadarChart } from './RadarChart.js';
import { createButton } from './Button.js';
import { shareKakaoTalk } from '../utils/kakaoShare.js';

export const PERSONALITY_TYPES = {
  idea: {
    typeKey: 'idea',
    badgeText: '번뜩이는 통찰력의',
    title: '💡 아이디어형 (Idea Generator)',
    subtitle: '남들이 보지 못하는 신선한 기회를 포착하는 창의적 창업가!',
    emoji: '💡',
    color: '#FF9F43',
    role: 'CPO, 아이디어 기획자, 비전 제시가',
    strengths: [
      '남들이 놓치는 새로운 문제와 시장 기회 포착',
      '기발하고 세련된 창업 아이디어 창출',
      '상황 변화에 맞춘 민첩한 피봇(Pivot) 기획'
    ],
    caution: '현실적인 기술적 구현 가능성과 수치 검증을 소홀히 하지 않도록 주의!',
    bestMatch: '제작형, 실행형'
  },
  maker: {
    typeKey: 'maker',
    badgeText: '손끝으로 구현하는',
    title: '🛠️ 제작형 (Maker & Developer)',
    subtitle: '아이디어를 실제 눈에 보이는 제품으로 뚝딱 만들어내는 메이커!',
    emoji: '🛠️',
    color: '#10AC84',
    role: 'CTO, 제품 디자이너, 개발자',
    strengths: [
      '아이디어를 실제 동작하는 프로토타입으로 빠르게 제작',
      '제품의 완성도와 사용자 경험(UX) 집중',
      '기술적 문제 해결 및 개발 로직 구현'
    ],
    caution: '제품 완벽주의에 빠져 현장 검증 타이밍을 놓치지 않도록 주의!',
    bestMatch: '아이디어형, 전략형'
  },
  strategy: {
    typeKey: 'strategy',
    badgeText: '치밀한 든든한 나침반',
    title: '📈 전략형 (Business Strategist)',
    subtitle: '시장성과 수익구조(BM)를 치밀하게 계산하는 전략가!',
    emoji: '📈',
    color: '#2E86DE',
    role: 'CEO, BM 기획자, 브랜딩 총괄',
    strengths: [
      '지속 가능한 수익모델(BM) 및 시장성 설계',
      '팀의 체계적인 목표 수립과 사업 방향 제시',
      '자원 효율화 및 사업적 위험 최소화'
    ],
    caution: '계획 수립에 너무 많은 시간을 써서 빠른 현장 실험을 주저하지 않도록 주의!',
    bestMatch: '실행형, 분석형'
  },
  collabo: {
    typeKey: 'collabo',
    badgeText: '팀의 분위기 메이커',
    title: '🤝 협업형 (Team Builder)',
    subtitle: '팀의 시너지를 극대화하고 소통을 이끄는 커뮤니케이터!',
    emoji: '🤝',
    color: '#FF6B6B',
    role: '피처(발표자), HR/팀장, 대외 네트워킹',
    strengths: [
      '팀원 간 갈등 조율 및 강력한 동기부여',
      '대외 네트워킹 및 설득력 있는 피칭 발표',
      '어려운 상황에서도 팀의 긍정적인 분위기 유지'
    ],
    caution: '모든 사람의 의견을 수용하려다 결정을 내리지 못하는 상황 주의!',
    bestMatch: '모든 유형 (특히 제작형, 분석형)'
  },
  analyst: {
    typeKey: 'analyst',
    badgeText: '팩트 폭격 리서처',
    title: '📊 분석형 (Data Analyst)',
    subtitle: '데이터와 정밀한 분석으로 리스크를 관리하는 지성파!',
    emoji: '📊',
    color: '#576574',
    role: '데이터 분석가, 리스크 관리자, 리서처',
    strengths: [
      '객관적인 데이터 중심의 신뢰도 높은 의사결정',
      '철저한 시장 조사 및 경쟁사 리분석',
      '논리적인 논거 확보 및 데이터 검증'
    ],
    caution: '과도한 데이터 분석(Analysis Paralysis)으로 실행이 지연되지 않도록 주의!',
    bestMatch: '아이디어형, 전략형'
  },
  action: {
    typeKey: 'action',
    badgeText: '일단 고 추진러',
    title: '🔥 실행형 (Action Taker)',
    subtitle: '고민보다 일단 현장에 부딪히며 피드백을 수집하는 행동파!',
    emoji: '🔥',
    color: '#EE5253',
    role: '마케터, 현장 리서처, 영업/고객 수집',
    strengths: [
      '압도적인 추진력과 발로 뛰는 현장 리서치',
      '고객 피드백 수집 및 신속한 서비스 적용',
      '팀에 강력한 에너지와 실행 모멘텀 부여'
    ],
    caution: '사전 전략이나 위험 요소를 살피지 않고 무작정 돌진하지 않도록 주의!',
    bestMatch: '전략형, 분석형'
  }
};

export function getDominantType(scores = {}) {
  let highestScore = -1;
  let dominantKey = 'action';

  const keys = ['idea', 'maker', 'strategy', 'collabo', 'analyst', 'action'];
  keys.forEach(key => {
    const val = scores[key] || 0;
    if (val > highestScore) {
      highestScore = val;
      dominantKey = key;
    }
  });

  return PERSONALITY_TYPES[dominantKey] || PERSONALITY_TYPES.action;
}

/**
 * ResultScreen Component
 * @param {Object} props
 * @param {Object} props.scores - Score breakdown object
 * @param {Function} [props.onShareKakao] - Custom KakaoTalk share callback
 * @param {Function} [props.onShare] - Share link callback
 * @param {Function} [props.onSaveImage] - Save image button callback
 * @param {Function} [props.onRetry] - Retry test callback
 * @returns {HTMLElement}
 */
export function createResultScreen({ scores = {}, onShareKakao, onShare, onSaveImage, onRetry } = {}) {
  const container = document.createElement('div');
  container.className = 'result-screen-container animate-slide-up';

  // 1. Top Header Component
  const header = createHeader({ logoText: '나의 창업 DNA', badgeText: '진단 결과' });
  container.appendChild(header);

  // 2. Get Dominant Personality Type Data
  const typeInfo = getDominantType(scores);

  // 3. Result Content Body
  const content = document.createElement('div');
  content.className = 'result-screen-content';

  content.innerHTML = `
    <!-- Personality Type Header Badge -->
    <div class="result-badge-tag" style="background-color: ${typeInfo.color};">
      ${typeInfo.badgeText}
    </div>

    <h1 class="text-h1 result-title-text">${typeInfo.title}</h1>
    <p class="text-body result-subtitle-text">${typeInfo.subtitle}</p>

    <!-- Character Avatar Graphic -->
    <div class="result-avatar-circle" style="box-shadow: 0 12px 28px ${typeInfo.color}33;">
      <span class="avatar-emoji">${typeInfo.emoji}</span>
    </div>

    <!-- 6-Axis Radar Chart Component Slot -->
    <div class="radar-section">
      <h3 class="text-h3 section-heading">📊 나의 6대 창업 역량</h3>
      <div id="radar-chart-slot"></div>
    </div>

    <!-- Recommended Role Badge Box -->
    <div class="role-box">
      <span class="role-label">🎯 팀 내 추천 역할:</span>
      <span class="role-value">${typeInfo.role}</span>
    </div>

    <!-- Key Strengths Section -->
    <div class="strengths-box">
      <h3 class="text-h3 section-heading">💡 핵심 강점 3가지</h3>
      <ul class="strengths-ul">
        ${typeInfo.strengths.map(s => `
          <li class="strength-li">
            <span class="check-icon" style="color: ${typeInfo.color};">✔</span>
            <span>${s}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- Caution Note -->
    <div class="caution-box">
      <h4 class="text-caption caution-heading">⚠️ 주의할 점</h4>
      <p class="text-body caution-text">${typeInfo.caution}</p>
    </div>

    <!-- Chemistry / Best Match -->
    <div class="match-box">
      <span class="match-icon">🤝</span>
      <div>
        <div class="text-caption match-label">환상의 짝꿍 유형</div>
        <div class="text-body-lg match-value">${typeInfo.bestMatch}</div>
      </div>
    </div>

    <!-- Action Buttons Group Slot -->
    <div class="result-buttons-wrapper" id="result-buttons-slot"></div>
  `;

  // 4. Mount Radar Chart
  const radarSlot = content.querySelector('#radar-chart-slot');
  radarSlot.appendChild(createRadarChart({ scores }));

  // 5. Mount Action Buttons
  const buttonsSlot = content.querySelector('#result-buttons-slot');

  // KakaoTalk Share Button (Yellow #FEE500)
  const kakaoShareBtn = createButton({
    text: '카카오톡으로 공유하기',
    variant: 'kakao',
    icon: '💬',
    onClick: onShareKakao || (() => shareKakaoTalk({ typeInfo, scores }))
  });

  const shareBtn = createButton({
    text: '결과 링크 복사하기',
    variant: 'primary',
    icon: '🔗',
    onClick: onShare || (() => {
      navigator.clipboard?.writeText(window.location.href);
      alert('📋 결과 링크가 클립보드에 복사되었습니다!');
    })
  });

  const saveImageBtn = createButton({
    text: '결과 이미지로 저장하기',
    variant: 'outline',
    icon: '📸',
    onClick: onSaveImage || (() => alert('📸 결과 리포트 저장 완료!'))
  });

  const retryBtn = createButton({
    text: '테스트 다시하기',
    variant: 'secondary',
    icon: '🔄',
    onClick: onRetry
  });

  buttonsSlot.appendChild(kakaoShareBtn);
  buttonsSlot.appendChild(shareBtn);
  buttonsSlot.appendChild(saveImageBtn);
  buttonsSlot.appendChild(retryBtn);

  container.appendChild(content);

  return container;
}
