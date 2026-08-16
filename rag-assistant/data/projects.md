# 프로젝트 목록

서민주가 진행한 주요 프로젝트들입니다.

## 1. 포트폴리오 웹사이트 (Portfolio Website)

- 기술: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Three.js, Prisma, Neon PostgreSQL, Python, FastAPI, Groq API
- 설명: AI Agent를 활용해 기획, 디자인 설계, 프론트엔드, 백엔드, RAG 기반 AI 검색 기능까지 직접 구현한 인터랙티브 포트폴리오 웹사이트
- 주요 기능: PPT 스타일 섹션 내비게이션, 커스텀 커서, Three.js 3D 배경, RAG AI 검색과 섹션 이동 연동
- 상세 문서: portfolio-site.md

## 2. JooDev Blog (개인 기술 블로그)

- 기술: Next.js, TypeScript, Prisma, PostgreSQL, TipTap, Vercel Blob
- 설명: TipTap 에디터 커스터마이징, Admin CMS, 서버리스 이미지 관리를 포함한 CMS형 블로그 플랫폼
- 주요 기능: SSR 기반 글 목록, 코드 블록/Mermaid 다이어그램 지원, httpOnly 쿠키 기반 인증, 카테고리/태그 시스템
- GitHub: https://github.com/MINJOOOONG/joodev
- 블로그: https://joodev-sandy.vercel.app/

## 3. E-commerce Backend Engineering

- 기술: Java, Spring Boot, Kafka, Redis, PostgreSQL, REST API
- 설명: 이커머스 도메인의 주문, 결제, 이벤트 흐름을 설계하며 백엔드 트랜잭션과 데이터 정합성을 학습한 프로젝트
- 주요 기능: Kafka 기반 이벤트 아키텍처, Redis 대기열, 실시간 랭킹, Outbox 패턴, Idempotency Key
- GitHub: https://github.com/MINJOOOONG

## 4. 아두이노를 이용한 사회적 제품 제작

- 기술: Arduino, Python, OpenCV, Hardware Prototype
- 설명: Arduino 센서와 OpenCV를 연동해 사회 문제를 개선하는 프로토타입을 제작한 팀 프로젝트
- 주요 기능: 센서-소프트웨어 양방향 통신, OpenCV 기반 객체 인식, Flow chart 기반 설계 문서화

## 5. FSM과 BT 구조를 활용한 게임 인공지능 분석 (졸업논문)

- 기술: Unity, C#, FSM, Behavior Tree, Unity Profiler
- 설명: FSM과 Behavior Tree의 실제 성능 차이를 정량적으로 비교한 졸업논문 프로젝트
- 주요 성과: 구조별 선택 기준 도출 (상태 5개 이하 FSM, 복잡한 AI는 BT), 영문 논문 번역

## 6. UNIST 해상 물류 창업 오디션

- 기술: Unity, Arduino, PM, UI/UX, Product Validation
- 설명: VR 기반 해양 사고 예방 교육 시뮬레이션을 기획하고 프로토타입을 개발한 창업 프로젝트
- 주요 성과: UNIST 창업 오디션 최종 선정 및 1,000만 원 창업 지원금 수주

## 7. 2024 K-HTML 대학대항전 해커톤

- 기술: Python, HTML, CSS, JavaScript, Azure OpenAI, AWS
- 설명: 용인시 사회문제 개선을 주제로 48시간 내 Azure OpenAI 연동 서비스 MVP를 완성한 해커톤 프로젝트
- 주요 기능: 사용자 흐름 기반 UI 설계, Azure OpenAI 프롬프트 엔지니어링, AWS EC2 배포

## 8. 미니 산학 연계 캡스톤 프로젝트

- 기술: AWS, Cloud, Azure OpenAI, Generative AI
- 설명: 클라우드 인프라와 생성형 AI를 결합한 서비스 아이디어를 기획하고 구현 실험을 진행한 프로젝트
- 주요 활동: 마이크로소프트/구글 코리아 본사 탐방, AWS Lambda 서버리스 AI API 파이프라인 구축 실험

## 9. 폴가이즈 기반 레고 파티클 게임

- 기술: Unreal Engine 5, C++, UMG, SVN, Git
- 설명: Fall Guys 감각의 멀티플레이 미니게임을 UE5로 구현한 팀 프로젝트
- 주요 기능: C++ + UMG 위젯 기반 게임 UI 시스템, 이벤트 기반 상태 전환, SVN/Git 병행 버전 관리

## 10. AWS DeepRacer 경진 대회 1등

- 기술: AWS DeepRacer, Reinforcement Learning, Python, AWS
- 설명: 강화학습 기반 자율주행 모델을 실험하고 로그 기반으로 개선해 대회 1위를 달성
- 주요 성과: 보상 함수 설계 → 하이퍼파라미터 튜닝 → 로그 분석 사이클로 최종 1위 달성

## 11. QA Minjoo Helper

- 기술: Next.js, TypeScript, Supabase, Zustand, Vercel
- 설명: QA 업무 중 TC 수정 요청 사항을 기록하고 요약하는 AI 기반 업무 보조 도구
- 주요 기능: Supabase 실시간 동기화, 카테고리 자동 분류, 요약 리포트 생성, 팀원 간 이력 공유

## 12. RAG Portfolio AI Assistant

- 기술: Python, FastAPI, httpx, Groq API, pytest
- 설명: 포트폴리오 데이터를 기반으로 질문에 답변하는 RAG AI 어시스턴트. 순수 Python TF-IDF 기반 검색과 Groq LLM을 조합해 비용 0원으로 운영
- 신뢰성 장치: 검색 점수 임계값 미만이면 LLM을 호출하지 않는 no-evidence 라우팅, 평가 데이터셋 기반 회귀 테스트, GitHub Actions 자동 실행
