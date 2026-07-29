import { createHeader } from './components/Header.js';
import { createProgressBar } from './components/ProgressBar.js';
import { createButton } from './components/Button.js';
import { createQuestionCard } from './components/QuestionCard.js';
import { createResultCard } from './components/ResultCard.js';

// Sample Questions Data
const sampleQuestions = [
  {
    id: 1,
    question: "Q1. 창업 캠프 첫날! 팀원들과 아이디어를 정하는 해커톤 시간, 당신의 첫 행동은?",
    options: [
      { letter: 'A', text: '요즘 우리가 겪는 불편함 중에 완전히 새로운 아이디어 없을까?', type: 'idea' },
      { letter: 'B', text: '1박 2일 안에 프로토타입으로 직접 만들 수 있는 아이템부터 찾아보자!', type: 'maker' },
      { letter: 'C', text: '이 아이템이 진짜 돈이 될까? 시장 규모와 수익성부터 따져봐야 해.', type: 'strategy' },
      { letter: 'D', text: '다들 어색한데 자기소개부터 하고, 각자 잘하는 역할을 나눠볼까요?', type: 'collabo' },
    ]
  },
  {
    id: 2,
    question: "Q2. 멘토링 시간, 멘토님이 아이디어에 대해 날카로운 리스크 지적을 하셨을 때 당신의 반응은?",
    options: [
      { letter: 'A', text: '지적된 리스크를 회피할 더 기발한 피봇(Pivot) 아이디어를 바로 제안한다.', type: 'idea' },
      { letter: 'B', text: '데이터와 수치 자료를 찾아 지적된 문제의 객관적 수치를 재검증한다.', type: 'analyst' },
      { letter: 'C', text: '당장 밖으로 나가 고객 10명에게 직접 물어보고 피드백을 수집해온다.', type: 'action' },
      { letter: 'D', text: '멘토님의 조언을 반영하여 팀의 사업계획서 구조와 BM을 수정한 다.', type: 'strategy' },
    ]
  }
];

// App Initialization
function initApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  let currentStep = 1;
  const totalSteps = 12;
  const userScores = { idea: 0, maker: 0, strategy: 0, collabo: 0, analyst: 0, action: 0 };

  // Render Header
  const header = createHeader({ logoText: '나의 창업 DNA', badgeText: 'STI Test' });
  appContainer.appendChild(header);

  // Main View Container
  const mainView = document.createElement('main');
  mainView.style.flex = '1';
  mainView.style.display = 'flex';
  mainView.style.flexDirection = 'column';
  appContainer.appendChild(mainView);

  // Render Landing Page Initially
  renderLandingPage(mainView, () => {
    renderQuizFlow(mainView, currentStep, totalSteps, userScores);
  });
}

function renderLandingPage(container, onStart) {
  container.innerHTML = `
    <div style="padding: 32px 20px; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 1;" class="animate-slide-up">
      <span style="font-size: 64px; margin-bottom: 16px;">🚀</span>
      <h1 class="text-h1" style="margin-bottom: 12px;">10초 만에 알아보는<br>나의 창업 DNA</h1>
      <p class="text-body" style="margin-bottom: 32px;">창업 캠프에서 나는 기획자일까, 제작자일까, 실행러일까?<br>나만의 성향과 환상의 짝꿍을 찾아보세요!</p>
      
      <div id="start-btn-wrapper" style="width: 100%; max-width: 320px;"></div>
    </div>
  `;

  const btnWrapper = container.querySelector('#start-btn-wrapper');
  const startBtn = createButton({
    text: '테스트 시작하기',
    variant: 'primary',
    onClick: onStart
  });
  btnWrapper.appendChild(startBtn);
}

function renderQuizFlow(container, step, total, scores) {
  container.innerHTML = '';

  const progressBar = createProgressBar({ current: step, total: total });
  container.appendChild(progressBar);

  const currentQ = sampleQuestions[(step - 1) % sampleQuestions.length];

  const questionCard = createQuestionCard({
    question: currentQ.question,
    options: currentQ.options,
    onSelectOption: (selectedOpt) => {
      if (scores[selectedOpt.type] !== undefined) {
        scores[selectedOpt.type] += 20;
      }
      
      if (step < total) {
        renderQuizFlow(container, step + 1, total, scores);
      } else {
        renderResult(container, scores);
      }
    }
  });

  container.appendChild(questionCard);
}

function renderResult(container, scores) {
  container.innerHTML = '';

  const resultCard = createResultCard({
    scores,
    onShare: () => {
      alert('결과 링크가 클립보드에 복사되었습니다!');
    },
    onRetry: () => {
      initApp();
    }
  });

  container.appendChild(resultCard);
}

document.addEventListener('DOMContentLoaded', initApp);
