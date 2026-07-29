import { createHeader } from './components/Header.js';
import { createProgressBar } from './components/ProgressBar.js';
import { createButton } from './components/Button.js';
import { createChoiceCard } from './components/ChoiceCard.js';
import { createQuestionCard } from './components/QuestionCard.js';
import { createRadarChart } from './components/RadarChart.js';
import { createResultCard } from './components/ResultCard.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Component Demo
  const headerBox = document.getElementById('demo-header');
  headerBox.appendChild(createHeader({ logoText: '나의 창업 DNA', badgeText: 'STI Test' }));

  // 2. ProgressBar Component Demo
  let step = 3;
  const total = 12;
  const progressBox = document.getElementById('demo-progressbar');
  const progressBar = createProgressBar({ current: step, total });
  progressBox.appendChild(progressBar);

  document.getElementById('btn-step-prev').addEventListener('click', () => {
    if (step > 1) {
      step--;
      progressBar.updateProgress(step, total);
    }
  });

  document.getElementById('btn-step-next').addEventListener('click', () => {
    if (step < total) {
      step++;
      progressBar.updateProgress(step, total);
    }
  });

  // 3. Button Component Demo
  const buttonBox = document.getElementById('demo-buttons');
  buttonBox.appendChild(createButton({ text: 'Primary Button', variant: 'primary', icon: '🚀', onClick: () => alert('Primary Clicked!') }));
  buttonBox.appendChild(createButton({ text: 'Outline Button', variant: 'outline', icon: '🔗', onClick: () => alert('Outline Clicked!') }));
  buttonBox.appendChild(createButton({ text: 'Secondary Button', variant: 'secondary', icon: '🔄', onClick: () => alert('Secondary Clicked!') }));

  // 4. ChoiceCard Component Demo
  const choiceBox = document.getElementById('demo-choice-cards');
  const choice1 = createChoiceCard({ letter: 'A', text: '일반 선택지 카드 상태 (Default State)', isSelected: false });
  const choice2 = createChoiceCard({ letter: 'B', text: '선택 완료된 카드 상태 (Selected State)', isSelected: true });
  choiceBox.appendChild(choice1);
  choiceBox.appendChild(choice2);

  // 5. QuestionCard Component Demo
  const questionBox = document.getElementById('demo-question-card');
  const questionCard = createQuestionCard({
    question: 'Q3. 아이디어 해커톤 시간, 당신이 가장 먼저 맡고 싶은 역할은?',
    options: [
      { letter: 'A', text: '새로운 기획 및 비전 제시', type: 'idea' },
      { letter: 'B', text: '화면 디자인 및 기술 프로토타입 구현', type: 'maker' },
      { letter: 'C', text: '시장 규모 분석 및 수익모델(BM) 설계', type: 'strategy' },
      { letter: 'D', text: '팀원 간 역할 조율 및 피칭 발표 준비', type: 'collabo' },
    ],
    onSelectOption: (opt) => {
      alert(`선택된 항목: [${opt.letter}] ${opt.text}`);
    }
  });
  questionBox.appendChild(questionCard);

  // 6. RadarChart Component Demo
  const radarBox = document.getElementById('demo-radar-chart');
  
  const getScoreValues = () => ({
    idea: Number(document.getElementById('score-idea').value),
    maker: Number(document.getElementById('score-maker').value),
    strategy: Number(document.getElementById('score-strategy').value),
    collabo: Number(document.getElementById('score-collabo').value),
    analyst: Number(document.getElementById('score-analyst').value),
    action: Number(document.getElementById('score-action').value),
  });

  const renderLiveRadar = () => {
    radarBox.innerHTML = '';
    radarBox.appendChild(createRadarChart({ scores: getScoreValues() }));
  };

  renderLiveRadar();

  ['score-idea', 'score-maker', 'score-strategy', 'score-collabo', 'score-analyst', 'score-action'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderLiveRadar);
  });

  // 7. ResultCard Component Demo
  const resultBox = document.getElementById('demo-result-card');
  const resultCard = createResultCard({
    scores: getScoreValues(),
    onShare: () => alert('공유하기 버튼 클릭!'),
    onRetry: () => alert('다시하기 버튼 클릭!')
  });
  resultBox.appendChild(resultCard);
});
