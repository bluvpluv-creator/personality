/**
 * 12개의 대학생 창업 캠프 맞춤 상황별 질문 및 성향 매핑 데이터
 * (아이디어형, 제작형, 전략형, 협업형, 분석형, 실행형)
 */
export const questionsData = [
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
      { letter: 'B', text: '데이터와 경쟁사 조사를 찾아 지적된 문제의 객관적 수치를 재검증한다.', type: 'analyst' },
      { letter: 'C', text: '당장 밖으로 나가 타겟 고객 10명에게 직접 물어보고 피드백을 수집해온다.', type: 'action' },
      { letter: 'D', text: '멘토님의 조언을 반영하여 팀의 비즈니스 모델(BM)과 구조를 수정한다.', type: 'strategy' },
    ]
  },
  {
    id: 3,
    question: "Q3. 해커톤 프로젝트 역할을 정할 때, 당신이 가장 욕심나는 역할은?",
    options: [
      { letter: 'A', text: '서비스의 비전을 정하고 핵심 가치와 기획을 총괄하는 역할', type: 'idea' },
      { letter: 'B', text: '디자인 화면이나 기술 프로토타입을 직접 개발해 보여주는 역할', type: 'maker' },
      { letter: 'C', text: '팀 분위기를 다잡고 마지막 피칭 발표에서 청중을 사로잡는 역할', type: 'collabo' },
      { letter: 'D', text: '시장 조사 보고서를 작성하고 수치 데이터로 설득력을 만드는 역할', type: 'analyst' },
    ]
  },
  {
    id: 4,
    question: "Q4. 아이디어를 실제 고객에게 검증하기 위해 당신이 가장 선호하는 방식은?",
    options: [
      { letter: 'A', text: '당장 거리로 나가 지나가는 사람들에게 인터뷰와 행동 반응을 수집한다.', type: 'action' },
      { letter: 'B', text: 'Figma 시안이나 간단한 웹페이지를 만들어 고객이 직접 클릭해보게 만든다.', type: 'maker' },
      { letter: 'C', text: '설문지 문항을 정교하게 설계하고 데이터를 수집해 통계 분석한다.', type: 'analyst' },
      { letter: 'D', text: '타겟 고객층이 모인 커뮤니티나 SNS에 글을 올려 반응을 소통한다.', type: 'collabo' },
    ]
  },
  {
    id: 5,
    question: "Q5. 사업계획서를 작성할 때 당신이 가장 공들여 작성하고 싶은 파트는?",
    options: [
      { letter: 'A', text: '기존에 없던 독창적인 문제 정의와 혁신적인 해결방안 파트', type: 'idea' },
      { letter: 'B', text: '수익 창출 구조(BM), 유닛 이코노믹스 및 재무 추정 파트', type: 'strategy' },
      { letter: 'C', text: '서비스의 작동 원리, 핵심 기능 및 UI/UX 프로토타입 파트', type: 'maker' },
      { letter: 'D', text: '시장 규모(TAM-SAM-SOM) 산출 및 데이터 기반 리스크 분석 파트', type: 'analyst' },
    ]
  },
  {
    id: 6,
    question: "Q6. 팀원 간 아이디어 방향성이 갈려서 분위기가 서먹해졌을 때 당신의 행동은?",
    options: [
      { letter: 'A', text: '음료수를 챙겨주며 분위기를 풀고, 양쪽 이야기를 들어주며 중간점을 찾는다.', type: 'collabo' },
      { letter: 'B', text: '논쟁보다는 빠르게 A안/B안을 가볍게 만들어보고 실제 반응으로 결정하자고 한다.', type: 'action' },
      { letter: 'C', text: '수치적인 근거와 고객 데이터 중 어느 안이 더 타당한지 비교 분석하자고 제안한다.', type: 'analyst' },
      { letter: 'D', text: '이 아이템의 궁극적인 비즈니스 목표와 수익성에 어느 쪽이 맞는지 가이드한다.', type: 'strategy' },
    ]
  },
  {
    id: 7,
    question: "Q7. 발표까지 5시간 남았는데, 예상치 못한 프로토타입 기술 오작동이 발생했다!",
    options: [
      { letter: 'A', text: '우회할 수 있는 기발한 순발력으로 발표 시나리오를 살짝 바꾼다.', type: 'idea' },
      { letter: 'B', text: '끝까지 집중하여 어떻게든 오류를 수정하고 완성품을 완성해낸다.', type: 'maker' },
      { letter: 'C', text: '오류 상황을 인정하고, 대신 사업적 시장성과 수익성 장점에 무게를 둔다.', type: 'strategy' },
      { letter: 'D', text: '팀원들의 사기가 떨어지지 않도록 격려하고 발표 멘트를 함께 다듬는다.', type: 'collabo' },
    ]
  },
  {
    id: 8,
    question: "Q8. 타겟 고객의 진짜 목소리를 들으러 현장 리서치를 나갈 때 당신의 스타일은?",
    options: [
      { letter: 'A', text: '망설임 없이 먼저 다가가 "잠시 인터뷰 가능하신가요?"라고 대화를 연다.', type: 'action' },
      { letter: 'B', text: '친근한 미소와 라포(Rapport) 형성으로 상대방이 편하게 진심을 말하게 유도한다.', type: 'collabo' },
      { letter: 'C', text: '인터뷰 질문 리스트를 논리적인 순서로 준비하고 답변을 꼼꼼히 기록한다.', type: 'analyst' },
      { letter: 'D', text: '인터뷰 중 새로운 페인포인트가 나오면 즉석에서 더 좋은 아이디어를 발굴한다.', type: 'idea' },
    ]
  },
  {
    id: 9,
    question: "Q9. 해커톤의 꽃! 최종 발표를 1시간 앞두고 당신이 마지막으로 검토하는 부분은?",
    options: [
      { letter: 'A', text: '발표 슬라이드의 시각적 완성도와 프로토타입 시연 영상 상태 점검', type: 'maker' },
      { letter: 'B', text: '심사위원의 날카로운 질문에 대비한 데이터 및 객관적 Q&A 자료 준비', type: 'analyst' },
      { letter: 'C', text: '발표자의 발음, 톤, 제스처를 점검하고 강렬한 메시지 전달력 연습', type: 'collabo' },
      { letter: 'D', text: '핵심 가치제안(Value Prop)과 수익 모델이 명확히 전달되는지 논리 점검', type: 'strategy' },
    ]
  },
  {
    id: 10,
    question: "Q10. 중요한 의사결정을 내려야 할 때, 당신을 가장 강력하게 설득하는 요소는?",
    options: [
      { letter: 'A', text: '"기존 시장에 전혀 없던 차별화된 혁신적 시각인가?"', type: 'idea' },
      { letter: 'B', text: '"지금 당장 행동으로 옮겨 부딪혀볼 수 있는가?"', type: 'action' },
      { letter: 'C', text: '"수익이 명확하고 지속 가능한 사업으로 발전 가능한가?"', type: 'strategy' },
      { letter: 'D', text: '"믿을 수 있는 데이터와 수치적 팩트가 뒷받침되는가?"', type: 'analyst' },
    ]
  },
  {
    id: 11,
    question: "Q11. 창업 캠프가 끝난 뒤, 당신이 생각하는 '가장 성공적인 팀'은?",
    options: [
      { letter: 'A', text: '세상을 바꿀 수 있는 기발하고 독창적인 아이디어를 발굴한 팀', type: 'idea' },
      { letter: 'B', text: '단기간에 실제 가동되는 훌륭한 앱/서비스 프로토타입을 완성한 팀', type: 'maker' },
      { letter: 'C', text: '실제로 돈을 벌 수 있는 명확한 비즈니스 모델을 증명한 팀', type: 'strategy' },
      { letter: 'D', text: '팀원 모두가 서로 존중하고 단합하여 최고의 시너지를 낸 팀', type: 'collabo' },
    ]
  },
  {
    id: 12,
    question: "Q12. 1박 2일 창업 캠프가 끝난 후, 가장 먼저 하고 싶은 일은?",
    options: [
      { letter: 'A', text: '현장에서 얻은 고객 피드백을 가지고 바로 다음 실험 행동에 들어간다.', type: 'action' },
      { letter: 'B', text: '캠프 모은 조사 데이터와 멘토링 피드백을 정돈해 리포트로 정리한다.', type: 'analyst' },
      { letter: 'C', text: '고생한 팀원들과 뒷풀이를 하며 앞으로도 계속 인연과 협업을 이어간다.', type: 'collabo' },
      { letter: 'D', text: '이 사업을 실제 창업으로 발전시키고 유료 고객을 모을 전략 계획을 세운다.', type: 'strategy' },
    ]
  }
];
