# [Design System] 대학생 창업 성향 테스트 (STI) UI/UX 디자인 가이드

## 1. 디자인 컨셉 & 비주얼 테마 (Design Concept)

- **컨셉 키워드**: `Vibrant` (활기찬), `Energetic` (에너제틱한), `Intuitive` (직관적인), `Mobile-First` (모바일 최적화)
- **무드**: 창업 캠프의 열정과 대학생의 경쾌함을 전달하는 모던 팝 스튜디오 톤. 글래스모피즘(Glassmorphism) 스카이/네온 요소와 둥근 모서리(Border Radius), 트렌디한 카드 레이아웃 적용.
- **레이아웃 스펙**:
  - Max Width: `480px` (모바일 앱뷰 모듈형 디자인, 데스크톱 접속 시 중앙 카드 배치)
  - Breakpoints: Mobile (`< 600px`), Tablet/Desktop (`>= 600px`)

---

## 2. 컬러 시스템 (Color System)

### 2.1 메인 브랜드 컬러 (Brand Colors)

| 용도 | Color Name | Hex Code | HSL / RGB | 사용 가이드 |
| --- | --- | --- | --- | --- |
| **Primary** | Energetic Purple | `#6C5CE7` | `hsl(246, 75%, 63%)` | CTA 버튼, 활성화 탭, 메인 포인트 |
| **Primary Light**| Soft Lavender | `#A29BFE` | `hsl(245, 100%, 80%)` | 프로그레스바 그라데이션, 포커스 링 |
| **Secondary** | Warm Coral | `#FF6B6B` | `hsl(0, 100%, 71%)` | 궁합 뱃지, 이벤트 강조, 핫 뱃지 |
| **Background** | Light Slate Gray | `#F8F9FA` | `rgb(248, 249, 250)` | 전체 웹 페이지 배경 |
| **Surface** | Pure White | `#FFFFFF` | `rgb(255, 255, 255)` | 카드, 선택지 버튼, 모달 배경 |
| **Text Main** | Dark Charcoal | `#2D3436` | `rgb(45, 52, 54)` | 본문 및 주요 헤딩 텍스트 |
| **Text Sub** | Cool Gray | `#636E72` | `rgb(99, 110, 114)` | 설명 문구, 부제목, 캡션 |

### 2.2 6가지 창업 성향 대표 포인트 컬러 (Personality Type Colors)

| 유형 | 성향 명칭 | Hex Code | HSL | 컬러 무드 및 의미 |
| --- | --- | --- | --- | --- |
| **1. 아이디어형** | 비전 제시가 | `#FF9F43` | `hsl(30, 100%, 63%)` | 오렌지 (창의성, 번뜩임) |
| **2. 제작형** | 뚝딱 메이커 | `#10AC84` | `hsl(165, 83%, 37%)` | 티얼 그린 (기술력, 제품 구현) |
| **3. 전략형** | 든든한 나침반 | `#2E86DE` | `hsl(210, 72%, 53%)` | 로열 블루 (전문성, BM/전략) |
| **4. 협업형** | 분위기 메이커 | `#FF6B6B` | `hsl(0, 100%, 71%)` | 핫 코랄 (소통, 분위기 조율) |
| **5. 분석형** | 팩트 폭격 리서처 | `#576574` | `hsl(210, 14%, 40%)` | 슬레이트 그레이 (이성, 데이터) |
| **6. 실행형** | 일단 고 추진러 | `#EE5253` | `hsl(359, 81%, 63%)` | 네온 레드 (추진력, 행동) |

### 2.3 CSS 디자인 토큰 (CSS Variables)

```css
:root {
  /* Brand Tokens */
  --color-primary: #6c5ce7;
  --color-primary-light: #a29bfe;
  --color-secondary: #ff6b6b;
  --color-bg: #f8f9fa;
  --color-surface: #ffffff;
  --color-text-main: #2d3436;
  --color-text-sub: #636e72;

  /* Type Colors */
  --color-type-idea: #ff9f43;
  --color-type-maker: #10ac84;
  --color-type-strategy: #2e86de;
  --color-type-collabo: #ff6b6b;
  --color-type-analyst: #576574;
  --color-type-action: #ee5253;

  /* Layout & Shadows */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 9999px;
  --shadow-card: 0 10px 30px rgba(108, 92, 231, 0.08);
  --shadow-button: 0 6px 20px rgba(108, 92, 231, 0.25);
}
```

---

## 3. 타이포그래피 가이드 (Typography)

- **글꼴 (Font Family)**: `Pretendard`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **글꼴 계층 및 스펙 (Typography Hierarchy)**:

| Level | Size (px) | Weight | Line Height | 적용 화면 및 컴포넌트 |
| --- | --- | --- | --- | --- |
| **Display H1** | 28px | Bold (700) | 1.3 | 메인 카피, 결과 페이지 대표 유형 제목 |
| **Title H2** | 22px | Bold (700) | 1.4 | 질문 제목 카드, 섹션 헤드라인 |
| **Title H3** | 18px | SemiBold (600) | 1.4 | 카드 소제목, 강조 항목 명칭 |
| **Body Large** | 16px | SemiBold (600) | 1.5 | 질문 선택지 버튼 문구 |
| **Body Base** | 15px | Regular (400) | 1.6 | 일반 설명 문구, 결과 리포트 본문 |
| **Caption** | 13px | Medium (500) | 1.4 | 프로그레스 카운터(3/12), 뱃지, 날짜 |

---

## 4. 버튼 & 카드 컴포넌트 가이드 (UI Components)

### 4.1 Primary CTA 버튼 (메인 시작하기, 공유하기)
- **Style**: Round Pill (`var(--radius-pill)`), Height `56px`, Fill (`var(--color-primary)`)
- **Hover/Active**: Scale `0.98`, Box-shadow 조절로 깊이감 전이

```css
.btn-primary {
  width: 100%;
  height: 56px;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  border-radius: var(--radius-pill);
  border: none;
  box-shadow: var(--shadow-button);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:active {
  transform: scale(0.97);
  box-shadow: 0 2px 10px rgba(108, 92, 231, 0.2);
}
```

### 4.2 선택지 카드 버튼 (Test Choice Buttons)
- **Style**: White Fill, Border `2px solid #E9ECEF`, Radius `var(--radius-md)`
- **Hover/Selected State**: Border `2px solid var(--color-primary)`, Background `#F3F0FF`

```css
.choice-card {
  width: 100%;
  padding: 18px 20px;
  background: var(--color-surface);
  border: 2px solid #e9ecef;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-main);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.choice-card:hover, .choice-card:active {
  border-color: var(--color-primary);
  background-color: #f3f0ff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(108, 92, 231, 0.12);
}
```

---

## 5. 애니메이션 & 인터랙션 가이드 (Animations & Interactions)

### 5.1 진행률 표시 바 (Progress Bar)
- **Fill Animation**: 문항 이동 시 `width`가 0.4초간 매끄럽게 확장되는 애니메이션 적용 (`transition: width 0.4s ease-in-out`).

```css
.progress-bar-fill {
  height: 8px;
  background: linear-gradient(90deg, var(--color-primary-light), var(--color-primary));
  border-radius: var(--radius-pill);
  transition: width 0.4s ease-in-out;
}
```

### 5.2 페이드 & 슬라이드 전환 (Slide-up Fade In)
- **질문 전환**: 다음 질문으로 넘어갈 때 아래에서 위로 살짝 떠오르는 모션.

```css
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.question-card-active {
  animation: slideUpFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### 5.3 로딩 화면 펄스 애니메이션 (Loading Pulse)
- **분석 중 효과**: 3초 로딩 시 캐릭터나 로딩 아이콘에 펄스 효과 부여.

```css
@keyframes pulseGlow {
  0% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.06); opacity: 1; box-shadow: 0 0 24px rgba(108, 92, 231, 0.35); }
  100% { transform: scale(1); opacity: 0.85; }
}

.loading-graphic {
  animation: pulseGlow 1.8s infinite ease-in-out;
}
```

---

## 6. 화면 레이아웃 & 와이어프레임 구조 (Layout Wireframe)

### 📱 메인 화면 (Main / Landing View)
- **Header**: 로고 / 캠프명 뱃지
- **Hero Graphic**: 3D 팝 일러스트 또는 캐릭터 그래픽
- **Title**: `Display H1` ("10초 만에 알아보는 나의 창업 DNA")
- **Subtitle**: `Body Base` ("창업 캠프에서 나는 기획자일까, 실행러일까?")
- **CTA Button**: `[테스트 시작하기]`

### 📝 테스트 화면 (Quiz View)
- **Progress Header**: "3 / 12" + 상단 8px 프로그레스바
- **Question Box**: `Title H2` ("Q3. 해커톤 아이디어 도출 시간, 당신의 첫마디는?")
- **Option List**: 4개의 `.choice-card` 세로 정렬

### 📊 결과 리포트 화면 (Result View)
- **Badge**: "불꽃 추진력의" (`var(--color-type-action)`)
- **Title**: `Display H1` ("🔥 실행형 (Action Taker)")
- **Graphic**: 결과 캐릭터 카드
- **Radar Chart**: 6가지 유형 능력치 수치 표현 (CSS 또는 Canvas 차트)
- **Details**: 
  - 💡 핵심 강점 3가지 카드
  - ⚠️ 주의할 점 카드
  - 🤝 환상의 짝꿍 유형 (궁합 뱃지)
- **Actions**: `[결과 링크 복사]` | `[이미지 저장]` | `[다시 하기]`

---

## 7. 추가 확인 질문 사항 (Design Customization Questions)

디자인 가이드를 더욱 정밀하게 최종 다듬기 위한 몇 가지 확인 사항입니다:

1. **다크 모드 지원 여부**: 기본 라이트 모드 외에 다크 모드(Dark Mode) 지원 가이드도 추가할까요?
2. **결과 차트 방식**: 결과 화면의 성향 비율을 **방사형(Radar) 차트**로 표현할까요, 아니면 **가로 바(Bar) 차트** 형태로 직관 표현할까요?
3. **일러스트/캐릭터 컨셉**: 결과 유형 캐릭터를 **2D 네온 캐릭터** vs **3D 이모지/클레이 아트** 중 어느 톤으로 배치할까요?
