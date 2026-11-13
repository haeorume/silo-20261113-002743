# DailyList — 디자인 명세

## 1. 개요
- 제품명: DailyList (할)
- 역할: 할 일 목록 SaaS — 사용자가 할 일을 추가하고 완료 표시할 수 있는 랜딩 및 홈 화면
- 클론 기반: ai-website-cloner-template (Next.js) + Any.do CRAFT.md 레이아웃 구조
- 변경 원칙: 클론 템플릿의 프레임·간격·패딩은 유지, 콘텐츠와 비주얼만 바꿈

## 2. 컬러 토큰 (Primary / Neutral / Semantic)
- Primary: `#0083ff` — Any.do 브랜드 블루, CTA 와 핵심 액션에 사용
- Primary Dark: `#2d6bd8` — 호버, 강조 상태
- Neutral 900: `#030303` — 주요 타이포그래피, 헤딩
- Neutral 700: `#5f6368` — 보조 텍스트, 설명
- Neutral 100: `#f5f8fc` — 섹션 배경, 카드 컨테이너
- Neutral 50: `#ffffff` — 전체 페이지 배경
- Semantic Success: `#22c55e` — 완료, 성공 상태
- Semantic Error: `#ef4444` — 에러, 경고 상태
- Semantic Warning: `#f59e0b` — 주의, pending 상태

## 3. 타이포그래피
- Font Stack: `Inter, "Inter Fallback", system-ui, -apple-system, sans-serif`
- Heading: `28px / 34px / 40px` — H1/H2/H3 계층
- Body: `15px` — 본문, 리스트 항목
- Small: `13px` — 보조 라벨, 메타 정보
- Mono: `ui-monospace, SFMono-Regular, Menlo` — ID 와 상태 표시

## 4. 레이아웃 구조
- Max Content Width: `1200px` — 중앙 정렬, padding 48px
- Breakpoints: `390`, `576`, `768`, `1024` — Any.do 기준 유지
- Header: 고정 헤더, 로고 좌측, "시작하기" CTA 우측
- Hero: H1 + 핵심 메시지 + "시작하기" 버튼 (Primary)
- Features: 2~4 컬럼 카드, 각 카드에 아이콘 + 제목 + 설명
- Empty State: 리스트가 없을 때 표시 (중앙 정렬, "할 일을 추가해보세요" + 버튼)
- Loading State: Skeleton 카드 3 개, 로딩 스피너 헤더
- Error State: 에러 메시지 + "다시 시도하기" 버튼

## 5. 컴포넌트 명세
- Button: Primary(Primary), Secondary(Neutral 900, border), Ghost(Transparent)
- Card: 배경 #f5f8fc, padding 24px, border-radius 12px, shadow-sm
- Input: border Neutral 300, focus ring Primary, padding 8px 12px
- Badge: 작은 라벨, border-radius 999px, font-size 12px

## 6. 화면 상태
- Loading: 헤더 Skeleton + Hero Skeleton(3 개) — 무한 스크롤 시 추가
- Empty: "할 일 목록이 없습니다." + "첫 번째 할 일을 추가해보세요" 버튼
- Success: 완료 체크 표시, 카드 하단에 green checkmark
- Error: 네트워크/저장소 에러 시 에러 바 + 재시도 버튼

## 7. 반응형
- Mobile-first: 390px 기준, padding 16px → 24px
- Tablet: 768px 이상에서 2 컬럼 → 데스크탑 3~4 컬럼
- Touch: 버튼 최소 44px 높이, 카드 클릭 영역 충분히 확보

## 8. 개발 전달 항목
- tokens.css: CSS 변수로 모든 토큰 정의 (color, spacing, font-size)
- components.json: Tailwind config 와 theme extension 연결
- page.tsx: Hero, Features, Empty/Loading/Error 상태 포함
- prototype.html: 정적 프로토타입 (Next.js 없이 브라우저에서 확인 가능)
