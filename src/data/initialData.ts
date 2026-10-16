import { Course, Post, Review, SiteConfig } from '../types';

export const initialSiteConfig: SiteConfig = {
  instituteName: 'Midam교육 연구소',
  tagline: 'AI 실무 & 컴퓨터 OA 전문 교육의 새로운 기준',
  representative: '오숙경',
  instructorTitle: '대표 / 수석 강사',
  address: '군산시 백토로 144, 3층',
  phone: '063-463-7110',
  email: 'midam_edu@naver.com',
  operatingHours: '평일 09:00 - 21:00 / 토요일 09:30 - 17:00 (일요일·공휴일 휴무)',
  
  // Theme & Colors (Deep black with violet/purple accents)
  primaryColor: '#a855f7',
  accentColor: '#c084fc',
  fontFamily: 'Noto Sans KR',
  
  // Hero section
  heroBadge: '2026년 상반기 AI & OA 실무 마스터 클래스 개강',
  heroTitle: '변화하는 업무의 흐름을 주도하는',
  heroHighlight: '생성형 AI 실무 & 컴퓨터 OA 마스터',
  heroSubtitle: '오숙경 대표 강사의 1:1 맞춤형 실습 코칭. ChatGPT·Claude 프롬프트 엔지니어링부터 실무 엑셀·컴퓨터활용능력까지, 비전공자도 현업에서 즉시 써먹는 탄탄한 역량을 완성합니다.',
  heroImage: '/src/assets/images/hero_ai_academy_1792163196717.jpg',
  
  // Announcement banner
  showAnnouncementBar: true,
  announcementBarText: '📢 [군산 백토로 본원] 2026 AI 비즈니스 프롬프트 & 컴활 실기 단기완성반 선착순 15명 특별 모집 중 (문의: 063-463-7110)',
  
  // Stats
  statGraduates: '1,850+ 명',
  statSatisfaction: '98.7 %',
  statExperience: '14 년+',
  statPartners: '48 개소',
  
  // Social links
  socialLinks: {
    kakao: 'https://open.kakao.com/o/midam_edu',
    naverBlog: 'https://blog.naver.com/midam_edu_lab',
    youtube: 'https://youtube.com/@midam_ai_oa',
    instagram: 'https://instagram.com/midam_education',
  },
  
  // SEO
  seo: {
    metaTitle: 'Midam교육 연구소 | AI실무교육 · 컴퓨터OA 전문 교육기관 (군산 백토로)',
    metaDescription: '군산 대표 AI 및 컴퓨터 실무 교육기관 Midam교육 연구소. 오숙경 대표 강사의 생성형 AI 활용, ChatGPT 실무, 엑셀 데이터 분석, 컴활 1·2급, 직무역량 강화.',
    keywords: 'Midam교육연구소, 오숙경강사, 군산컴퓨터학원, AI실무교육, 프롬프트엔지니어링, 컴퓨터활용능력, 군산엑셀학원, ChatGPT교육',
    ogImage: '/src/assets/images/hero_ai_academy_1792163196717.jpg',
    canonicalUrl: 'https://midam-edu.kr',
  },
};

export const initialCourses: Course[] = [
  {
    id: 'course-1',
    title: '비즈니스 생성형 AI & 프롬프트 엔지니어링 실무',
    category: 'AI실무',
    level: '입문',
    duration: '4주 (총 16시간) / 주 2회',
    targetAudience: '보고서 및 기획서 작성 시간을 절반으로 줄이고 싶은 직장인 및 자영업자',
    description: 'ChatGPT, Claude, Perplexity 등 최신 생성형 AI 도구를 실무에 바로 접목하여 기획서, 시장조사, 이메일, 마케팅 문구 작성을 자동화하는 실전형 교육입니다.',
    curriculumList: [
      '1주차: AI 도구 생태계 이해 및 고품질 프롬프트 설계 공식 (ROLE-TASK-CONTEXT-FORMAT)',
      '2주차: 직무별 맞춤 보고서, 기획서 및 데이터 초안 생성 실습',
      '3주차: Claude & Perplexity를 활용한 논문/시장조사 및 정보 심층 분석',
      '4주차: 맞춤형 GPTs 만들기 및 팀 내 AI 활용 업무 표준 매뉴얼 제작',
    ],
    image: '/src/assets/images/course_ai_prompt_1792163198645.jpg',
    highlightBadge: '수강 만족도 1위',
    isPopular: true,
    scheduleInfo: '화·목 저녁반 (19:00~21:00) / 토요 집중반 (10:00~14:00)',
    feeInfo: '개별 상담 및 국비지원/직무교육 연계 가능',
  },
  {
    id: 'course-2',
    title: '실무 엑셀(Excel) 데이터 분석 & 보고서 마스터',
    category: '컴퓨터OA',
    level: '중급',
    duration: '6주 (총 24시간) / 주 2회',
    targetAudience: '반복되는 엑셀 수작업에서 벗어나 스마트한 데이터 시각화와 통계를 구현하려는 실무자',
    description: '필수 함수(XLOOKUP, INDEX/MATCH, SUMIFS)부터 피벗테이블 고급 분석, 동적 대시보드 차트 제작, 그리고 실무 파워쿼리(Power Query) 기초까지 완벽 정복합니다.',
    curriculumList: [
      '1주차: 실무 데이터 정리 테크닉 및 텍스트/날짜 핵심 가공 함수',
      '2주차: 찾기/참조 및 조건부 논리 함수의 실무 결합 패턴',
      '3주차: 피벗테이블 다차원 분석 및 슬라이서 연동 인터랙티브 보고서',
      '4주차: 한눈에 들어오는 데이터 시각화 및 임원 보고용 차트 디자인',
      '5주차: 파워쿼리(Power Query)를 활용한 매월 반복 데이터 1초 자동 병합',
      '6주차: 실무 종합 프로젝트: 우리 회사 월간 실적 대시보드 직접 완성하기',
    ],
    image: '/src/assets/images/course_office_oa_1792163197850.jpg',
    highlightBadge: '직장인 선호도 1위',
    isPopular: true,
    scheduleInfo: '월·수 저녁반 (19:30~21:30) / 주말반',
    feeInfo: '실습 교재 및 실무 서식 템플릿 50종 무료 제공',
  },
  {
    id: 'course-3',
    title: 'AI 기반 업무자동화 (RPA & 노코드 워크플로우)',
    category: '업무자동화',
    level: '실무마스터',
    duration: '5주 (총 20시간)',
    targetAudience: '매일 반복되는 이메일 발송, 파일 정리, 웹 크롤링 업무를 자동화하고 싶은 분',
    description: '코딩을 몰라도 가능한 Make, Zapier와 파이썬 기초 스크립트를 생성형 AI와 결합하여 매일 2시간 이상 걸리던 루틴 업무를 버튼 한 번으로 해결합니다.',
    curriculumList: [
      '1주차: 업무 흐름 다이어그램 작성 및 자동화 가능한 병목 포인트 진단',
      '2주차: Make / Zapier를 활용한 노코드 도구 연동 (구글시트 ↔ 이메일 ↔ 알림톡)',
      '3주차: AI를 이용한 고객 문의 자동 분류 및 회신 템플릿 시스템 구축',
      '4주차: 웹 데이터 수집(스크래핑) 및 일일 보고서 자동 발송 파이프라인',
      '5주차: 실무 실전 캡스톤: 내 업무 1개 완전 자동화 구현 및 시연',
    ],
    image: '/src/assets/images/hero_ai_academy_1792163196717.jpg',
    highlightBadge: '최신 트렌드 과정',
    isPopular: false,
    scheduleInfo: '수·금 오후반 (14:00~16:00) / 기업 단체반 협의',
    feeInfo: '맞춤형 템플릿 및 자동화 시나리오 파일 증정',
  },
  {
    id: 'course-4',
    title: '컴퓨터활용능력 1급·2급 실기 초단기 원패스',
    category: '자격증/취업',
    level: '입문',
    duration: '4주~8주 단기 완성',
    targetAudience: '공기업, 공무원, 대기업 취업 가산점이 절실한 취업준비생 및 대학생',
    description: '오숙경 대표 강사의 10개년 기출 완벽 분석! 스프레드시트(엑셀)와 데이터베이스(액세스)의 취약 유형을 1:1 밀착 첨삭하여 실기 불합격 고리를 끊어냅니다.',
    curriculumList: [
      '기본작업 & 외부데이터 가져오기 완벽 마스터 (감점 0점 전략)',
      '배열수식과 사용자정의 함수 VBA 5대 빈출 유형 패턴 암기',
      '피벗테이블 보고서 작성 및 조건부 서식 오류 완벽 방지',
      '액세스 폼·보고서 컨트롤 속성 및 쿼리 작성 고난도 공략',
      '실전 모의고사 10회분 풀이 및 강사 직접 1:1 실시간 오답 코칭',
    ],
    image: '/src/assets/images/course_office_oa_1792163197850.jpg',
    highlightBadge: '원패스 합격률 92%',
    isPopular: true,
    scheduleInfo: '오전반 (10:00~12:30) / 오후반 / 저녁반 상시 개설',
    feeInfo: '기출문제 해설집 및 최신 모의고사 채점 프로그램 제공',
  },
  {
    id: 'course-5',
    title: '기업 및 공공기관 맞춤형 AI/OA 출강 솔루션',
    category: '기업체맞춤',
    level: '실무마스터',
    duration: '협의 (1일 특강 4시간 ~ 4주 심화과정)',
    targetAudience: '임직원의 디지털 리터러시 강화 및 생성형 AI 도입을 준비 중인 기업·공공기관',
    description: '기관 및 기업의 실제 업무 문서, 취급 데이터, 보안 가이드라인에 맞춘 커스텀 교재와 시나리오로 진행하는 찾아가는 현장 맞춤형 연수 프로그램입니다.',
    curriculumList: [
      '모듈 A: 공공/기업 행정업무를 위한 보안 준수 생성형 AI 활용법',
      '모듈 B: 보고서 품질을 높이는 시각화 차트 및 파워포인트 설득 스킬',
      '모듈 C: 부서별 실무 엑셀 데이터 분석 및 자동화 템플릿 구축 실습',
      '모듈 D: 임직원 AI 리터러시 & 디지털 트랜스포메이션 마인드셋 특강',
    ],
    image: '/src/assets/images/instructor_oh_1792163197271.jpg',
    highlightBadge: '군산·전북권 출강',
    isPopular: false,
    scheduleInfo: '기업 방문 출강 또는 Midam교육 연구소 전용 실습실 대관 진행',
    feeInfo: '기관 규모 및 교육 시간에 따른 제안서 견적 송부',
  },
];

export const initialPosts: Post[] = [
  {
    id: 'post-1',
    title: '[공지] 2026년 상반기 생성형 AI 실무 & 엑셀 마스터 정규과정 수강 안내',
    category: '공지사항',
    author: '대표 오숙경',
    date: '2026.04.10',
    excerpt: 'Midam교육 연구소의 2026년 상반기 정규 커리큘럼이 개강합니다. 선착순 정원제로 운영되며 1:1 실습 좌석이 배정됩니다.',
    content: `안녕하세요, Midam교육 연구소 대표 오숙경입니다.

2026년도 어느덧 따스한 봄을 지나 실질적인 업무 도약이 필요한 시점입니다.
최근 업무 현장에서는 생성형 AI(ChatGPT, Claude)를 다룰 줄 아는 인재와 그렇지 못한 인재의 업무 생산성 격차가 3배 이상 벌어지고 있습니다.

저희 Midam교육 연구소는 단순한 이론 주입이 아닌, 수강생이 실제 자신의 업무 데이터를 가지고 와서 강사와 함께 직접 자동화와 엑셀 시각화를 완성하는 100% 현장 중심 실습형 교육을 지향합니다.

■ 2026 상반기 개강 과정 안내
1. 비즈니스 생성형 AI & 프롬프트 엔지니어링 실무 (주 2회, 4주 완성)
2. 실무 엑셀 데이터 분석 & 피벗테이블 대시보드 (주 2회, 6주 완성)
3. 컴퓨터활용능력 1·2급 실기 집중 원패스반 (오전/저녁 상시)
4. AI 기반 노코드 업무자동화 마스터 과정

■ 교육 장소: 전북 군산시 백토로 144, 3층 Midam교육 연구소 (최신 듀얼모니터 전산 실습실)
■ 교육 문의 및 방문 상담: 063-463-7110 (예약제 진행)

항상 배움의 열정을 응원하며, 실무에서 자신감을 가질 수 있도록 최선을 다해 지도하겠습니다. 감사합니다.`,
    tags: ['공지사항', '수강모집', 'AI실무', '컴퓨터OA', '군산'],
    readTime: '2분',
    views: 342,
    isPinned: true,
  },
  {
    id: 'post-2',
    title: '[칼럼] 직장인을 위한 ChatGPT 4대 프롬프트 황금 공식과 실무 적용법',
    category: 'AI 테크 칼럼',
    author: '오숙경 대표',
    date: '2026.04.05',
    excerpt: '왜 내가 질문하면 뻔한 대답만 나올까? 원하는 퀄리티의 보고서 초안을 뽑아내는 역할(Role)-맥락(Context)-과업(Task)-양식(Format) 프롬프트 구조화 비결.',
    content: `많은 수강생분들이 "선생님, ChatGPT를 써봤는데 인터넷 백과사전에 나오는 내용만 말해주고 쓸모가 없어요"라고 하소연하십니다.

이유는 질문(프롬프트)에 구체적인 맥락과 제약 조건이 빠져있기 때문입니다.
제가 기업 출강과 연구소 수업에서 늘 강조하는 4가지 핵심 원칙을 소개합니다.

1. Role (역할 부여): "너는 15년 차 대기업 기획팀장이야"
2. Context (배경과 맥락): "우리 회사는 군산에 위치한 제조업체이고, 이번 분기 신제품 출시 보고서를 준비 중이야"
3. Task (구체적인 과업): "경쟁사 대비 차별화 포인트 3가지와 예산 배분 방안을 도출해 줘"
4. Format (출력 형식): "마크다운 표 형식으로 항목, 세부내용, 예상 효과 순서로 정리해 줘"

이 4가지를 한 번에 묶어서 입력하면, 10분 걸리던 고민이 10초 만에 전문적인 기획안 초안으로 바뀌게 됩니다.
다음 주 칼럼에서는 실무 엑셀 수식을 ChatGPT로 오류 없이 작성하는 프롬프트 템플릿을 공개하겠습니다.`,
    tags: ['프롬프트엔지니어링', 'ChatGPT', '업무효율화', '기획서작성'],
    readTime: '3분',
    views: 890,
    isPinned: true,
  },
  {
    id: 'post-3',
    title: '[교육소식] 군산시 중소기업 임직원 대상 업무자동화 OA 실무 특강 성료',
    category: '교육 소식',
    author: '연구소 사무국',
    date: '2026.03.28',
    excerpt: '군산 관내 제조 및 유통 기업 임직원 35명을 대상으로 진행된 실무 엑셀 파워쿼리 및 AI 문서작성 특강이 수강 만족도 99%를 기록하며 성황리에 마쳤습니다.',
    content: `지난 3월 26일부터 28일까지, Midam교육 연구소 오숙경 대표 강사가 주관한 '군산시 중소기업 맞춤형 스마트워크 & OA 자동화 특강'이 35명의 임직원 수료와 함께 성공적으로 마무리되었습니다.

참여 기업 임직원들은 매월 반복되던 수백 행의 거래처 발주 데이터 정리 작업을 엑셀 파워쿼리(Power Query)를 통해 '새로고침' 한 번으로 끝내는 기법을 실습하며 큰 호응을 보였습니다.

참여 수강생 인터뷰:
"기존에는 엑셀 VLOOKUP 함수만 근근이 썼는데, 오숙경 강사님의 명쾌하고 실전적인 설명 덕분에 데이터 취합 시간이 2시간에서 5분으로 줄었습니다."

Midam교육 연구소는 앞으로도 군산 및 전북 지역 기업들의 디지털 경쟁력 강화를 위한 산학 연계 프로그램을 확대할 예정입니다.`,
    tags: ['기업출강', '군산시', '파워쿼리', '업무자동화', '후기'],
    readTime: '2분',
    views: 412,
  },
  {
    id: 'post-4',
    title: '[칼럼] 컴활 1급 실기 수험생이 가장 많이 실수하는 계산작업 3대 함정',
    category: 'AI 테크 칼럼',
    author: '오숙경 대표',
    date: '2026.03.15',
    excerpt: '배열수식 괄호 닫기 실수, INDEX-MATCH 범위 절대참조 누락, 조건부서식 달러($) 위치 혼동. 오숙경 강사의 10초 검산 테크닉 전수.',
    content: `컴퓨터활용능력 1급 실기에서 68점, 69점으로 아쉽게 불합격하는 수험생의 90%는 '계산작업(배열수식)'에서 1~2문제 차이로 고배를 마십니다.

합격을 가르는 3대 포인트:
1. 배열수식의 괄호 짝 맞추기: =SUM((조건1)*(조건2)*(계산범위)) 에서 조건 전체를 감싸는 괄호를 빼먹지 마세요.
2. 조건부 서식의 혼합참조: 행 전체에 서식을 적용할 때는 열 고정(\$A1)을 해야 합니다. (\$A\$1은 첫 셀만 고정되므로 전체 행에 적용되지 않습니다!)
3. 사용자 정의 함수(fn)의 if문 끝맺음: If ~ Then ~ Else ~ End If 구조에서 반환 변수명 철자 오류를 반드시 확인하세요.

Midam교육 연구소의 컴활 원패스반에서는 시험장에서 직접 검산할 수 있는 오답 체크리스트를 전수합니다.`,
    tags: ['컴퓨터활용능력', '컴활1급', '자격증꿀팁', '엑셀실기'],
    readTime: '3분',
    views: 1250,
  },
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    studentName: '김*현 님',
    affiliation: '군산 소재 공공기관 주무관',
    courseTaken: '비즈니스 생성형 AI & 프롬프트 엔지니어링 실무',
    rating: 5,
    comment: '보안 문제와 어떻게 써야 할지 막막했던 생성형 AI를 오숙경 대표님께서 행정 실무에 맞게 안전하고 효율적인 프롬프트로 알려주셨습니다. 매주 작성하는 주간 보고서 초안 작성이 정말 수월해졌습니다!',
    date: '2026.04.08',
    outcomeTag: '보고서 작성 시간 70% 단축',
  },
  {
    id: 'rev-2',
    studentName: '박*우 님',
    affiliation: '군산 산단 제조기업 경영지원팀',
    courseTaken: '실무 엑셀 데이터 분석 & 피벗테이블 대시보드',
    rating: 5,
    comment: '매달 마감 때마다 엑셀 파일 열어놓고 야근하던 일상이 완전히 사라졌습니다. 파워쿼리 버튼 한 번으로 12개 부서 데이터가 합쳐지는 걸 보고 소름 돋았습니다. 군산 최고의 실무 강의입니다.',
    date: '2026.03.30',
    outcomeTag: '월말 결산 야근 제로화 달성',
  },
  {
    id: 'rev-3',
    studentName: '이*진 님',
    affiliation: '취업준비생 (군산대 졸업)',
    courseTaken: '컴퓨터활용능력 1급 실기 초단기 원패스',
    rating: 5,
    comment: '독학으로 세 번이나 떨어져서 포기하려다가 백토로 연구소에 등록했습니다. 오숙경 강사님께서 제가 어디서 괄호 실수를 하는지 1:1로 짚어주시니 단 3주 만에 첫 합격 통보 받았습니다!',
    date: '2026.03.18',
    outcomeTag: '3주 만에 컴활 1급 실기 원패스',
  },
  {
    id: 'rev-4',
    studentName: '최*민 님',
    affiliation: '온라인 쇼핑몰 대표',
    courseTaken: 'AI 기반 업무자동화 (RPA & 노코드)',
    rating: 5,
    comment: '1인 기업이라 고객 주문 확인과 송장 번호 이메일 발송이 큰 짐이었는데, 강사님과 함께 자동화 시나리오를 짜서 완전 무인화했습니다. 수강료의 100배 가치가 있는 실전 수업입니다.',
    date: '2026.02.24',
    outcomeTag: '고객 응대 및 송장 업무 100% 자동화',
  },
];
