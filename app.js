import { questionsData } from './data/questions.js';
import { createStartScreen } from './components/StartScreen.js';
import { createProgressBar } from './components/ProgressBar.js';
import { createQuestionCard } from './components/QuestionCard.js';
import { createLoadingScreen } from './components/LoadingScreen.js';
import { createResultScreen } from './components/ResultScreen.js';

function initApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  appContainer.innerHTML = '';

  let currentStep = 1;
  const totalSteps = questionsData.length; // 12 Questions
  const userScores = { idea: 10, maker: 10, strategy: 10, collabo: 10, analyst: 10, action: 10 };

  // Render StartScreen Component Initially
  const startScreen = createStartScreen({
    logoText: '나의 창업 DNA',
    badgeText: 'STI Test',
    participantCount: 154,
    onStartTest: () => {
      renderQuizFlow(appContainer, currentStep, totalSteps, userScores);
    }
  });

  appContainer.appendChild(startScreen);
}

function renderQuizFlow(container, step, total, scores) {
  container.innerHTML = '';

  // Render Progress Bar (e.g. 1 / 12 ~ 12 / 12)
  const progressBar = createProgressBar({ current: step, total: total });
  container.appendChild(progressBar);

  // Get Question Object for Current Step
  const currentQ = questionsData[step - 1];

  const questionCard = createQuestionCard({
    question: currentQ.question,
    options: currentQ.options,
    onSelectOption: (selectedOpt) => {
      // Accumulate score for selected personality type
      if (selectedOpt && selectedOpt.type && scores[selectedOpt.type] !== undefined) {
        scores[selectedOpt.type] += 15;
      }
      
      if (step < total) {
        // Next Question
        renderQuizFlow(container, step + 1, total, scores);
      } else {
        // Finished all 12 questions: Show 3s Loading Screen -> Show Result Report!
        renderLoadingView(container, () => {
          renderResult(container, scores);
        });
      }
    }
  });

  container.appendChild(questionCard);
}

function renderLoadingView(container, onComplete) {
  container.innerHTML = '';

  const loadingScreen = createLoadingScreen({
    duration: 3000,
    messages: [
      '당신의 12개 창업 답변 데이터를 모으고 있어요...',
      '6가지 창업 성향 매칭 알고리즘 가동 중...',
      '당신과 어울리는 환상의 짝꿍 분석 완료!'
    ],
    onComplete: onComplete
  });

  container.appendChild(loadingScreen);
}

function renderResult(container, scores) {
  container.innerHTML = '';

  const resultScreen = createResultScreen({
    scores,
    onShare: () => {
      navigator.clipboard?.writeText(window.location.href);
      alert('📋 결과 링크가 클립보드에 복사되었습니다! 팀원들에게 공유해보세요.');
    },
    onSaveImage: () => {
      alert('📸 결과 리포트 저장 준비 완료!');
    },
    onRetry: () => {
      initApp();
    }
  });

  container.appendChild(resultScreen);
}

document.addEventListener('DOMContentLoaded', initApp);
