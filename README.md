# 6조 [Promeet](https://promeet-gilt.vercel.app)

## 📂 프로젝트 소개

### 🔑 대학생들의 약속 조율을 돕는 사이트입니다.

&nbsp;

## 🔗 링크

- 배포: https://promeet-gilt.vercel.app
- 백엔드 저장소: https://github.com/duwlsssss/Promeet-Server
- 데모 계정: 이름 `김도담` / 비밀번호 `1234`

&nbsp;

## ✨ 주요 기능

- **약속 생성 / 공유**: 약속 정보·후보 날짜·출발 위치·가능 시간을 입력하면 참여 링크 생성
- **가능 시간 입력**: 15분 단위 드래그 시간표 (09:00 ~ 24:00), 참여자는 생성자가 제안한 범위 안에서 선택
- **중간 지점 추천**: 모든 멤버의 출발역에서 지하철 이동 시간 합이 가장 적은 역을 계산하고, 멤버별 경로와 소요 시간을 지도에 표시
- **장소 탐색 / 좋아요**: 중간역 주변 장소를 카테고리별로 검색하고, 좋아요한 멤버 이름 표시
- **약속 확정**: 모든 멤버가 좋아요를 누르고 공통 가능 시간이 있으면 생성자가 최종 장소를 확정
- **내 약속 관리**: 다가오는 / 미확정 / 지난 약속 목록, 고정 일정 등록

&nbsp;

## 🔧 기술 스택

<div align="center">

|      Type       |                                                                                                                                                                                                                                                                                    Tool                                                                                                                                                                                                                                                                                    |
| :-------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     Bundler     |                                                                                                                                                                                                                                      ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                                                                                                                                                                                                                                       |
|     Library     | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white) ![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) |
|       Map       |                                                                                                                                                                                                                               ![Kakao Map](https://img.shields.io/badge/Kakao_Map_API-FFCD00?style=for-the-badge&logo=kakao&logoColor=black)                                                                                                                                                                                                                               |
|    Language     |                                                                                                                                                                        ![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)                                                                                                                                                                        |
|     Styling     |                                                                                                                                                                                                                  ![styled-components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)                                                                                                                                                                                                                   |
|   Formatting    |                                                                                                                                                                             ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)                                                                                                                                                                             |
| Package Manager |                                                                                                                                                                                                                                        ![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                                                                                                                                                                                        |
| Version Control |                                                                                                                                                                              ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)                                                                                                                                                                              |
|     Backend     |                                                                                                                                                                             ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)                                                                                                                                                                              |
|   Deployment    |                                                                                                               ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white) ![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)                                                                                                                |
|  Collaboration  |                                                                                                                                                                                                                                   ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)                                                                                                                                                                                                                                    |

</div>

&nbsp;

## 🔩 프로젝트 설정 및 실행 방법

### 1. 프로젝트 클론하기

먼저, Git 저장소에서 프로젝트를 로컬로 클론해야 합니다. 터미널(또는 명령 프롬프트)을 열고 아래 명령어를 입력합니다.

```bash
git clone https://github.com/duwlsssss/Promeet.git
```

해당 명령어는 지정된 Git 저장소에서 프로젝트를 로컬 컴퓨터로 복사해옵니다.

### 2. 의존성 설치

프로젝트가 로컬에 클론된 후, 프로젝트 폴더로 이동한 다음, 필요한 패키지들을 설치해야 합니다.
Node.js 기반 프로젝트인 경우, `npm` 명령어를 사용하여 의존성을 설치할 수 있습니다.

```bash
npm install
```

이 명령어는 `package.json` 파일에 정의된 모든 의존성(dependencies)을 자동으로 설치해 줍니다.

### 3. 환경변수 설정

프로젝트 루트에 `.env` 파일을 만들고 아래 값을 채웁니다.

```bash
VITE_SERVER_API_URL=백엔드 서버 주소
VITE_KAKAO_JS_KEY=카카오 JavaScript 키
```

카카오 개발자 콘솔의 **JavaScript SDK 도메인**에 `http://localhost:5173`이 등록되어 있어야 지도가 로드됩니다.

### 4. 개발 서버 실행

모든 의존성이 설치되면, 개발 서버를 실행하여 프로젝트를 로컬에서 테스트할 수 있습니다.

```bash
npm run dev
```

이 명령어를 통해 개발 모드에서 서버를 시작하며, 변경 사항이 있을 때 자동으로 갱신됩니다.
이후, 브라우저에서 `http://localhost:5173` 주소로 접속하여 애플리케이션을 확인할 수 있습니다.

&nbsp;

## 📄 폴더 구조

```
src
├── apis          # axios 인스턴스, HTTP 메서드별 API 함수
├── assets        # 이미지, 아이콘
├── components    # 공통·도메인 컴포넌트 (auth, calendar, modal, promise, timeTable, ui)
├── constants     # 라우트, 쿼리 키 등 상수
├── hooks         # 커스텀 훅 (kakao, queries, mutations, stores)
├── layouts       # 레이아웃, 네비게이션 바
├── lib           # 라이브러리 설정 (tanstack-query)
├── pages         # 라우트별 페이지
├── routes        # 라우터, 페이지 접근 권한 래퍼
├── schemas       # zod 폼 검증 스키마
├── stores        # zustand 전역 상태
├── styles        # 전역 스타일
├── types         # PropTypes 정의, 타입 선언(d.ts)
└── utils         # 유틸 함수
```

&nbsp;

## 🏗 아키텍처

```
[Browser] ── Vercel (React SPA, vercel.json rewrites)
    │ axios
    ▼
Nginx (blue/green) ── Express (Docker, EC2) ── MongoDB Atlas
    ▲
GitHub Actions: push → 이미지 빌드 → ECR → SSM으로 EC2 배포
```

&nbsp;

## 🧩 기술적 구현 포인트

- **서버 상태 / 클라이언트 상태 분리**: 서버 데이터는 TanStack Query, 약속 작성 중 입력값과 UI 상태는 Zustand로 관리
- **좋아요 낙관적 업데이트**: `onMutate`에서 즉시 반영하고 실패 시 이전 상태로 롤백, 완료 후 서버 데이터 재검증
- **리렌더링 최소화**: Zustand 셀렉터와 `useShallow`로 필요한 값만 구독하고, 좋아요 버튼과 좋아요 멤버를 별도 컴포넌트로 분리해 장소 카드 전체가 다시 그려지지 않도록 함
- **페이지 접근 제어**: 로그인·생성자·참여자·멤버 여부에 따라 라우트를 감싸는 래퍼 컴포넌트 (`routes/PageWrappers.jsx`)
- **폼 검증**: react-hook-form + zod 스키마
- **에러 처리**: react-error-boundary로 렌더링 에러를 격리하고, API 에러는 공통 핸들러에서 처리
- **카카오맵**: SDK 동적 로드, 카테고리별 마커와 커스텀 오버레이로 멤버 경로·소요 시간 표시, framer-motion 드래그 바텀시트
- **중간역 계산 (백엔드)**: 지하철 노선 그래프에 다익스트라를 적용해 모든 멤버의 이동 시간 합이 최소인 역 선택, 환승 시 5분 가산
- **공통 가능 시간 (백엔드)**: 같은 날짜의 시간 구간끼리 `max(시작) ~ min(종료)`로 교집합을 계산해 일부만 겹치는 시간도 인식

&nbsp;

## 🔥 트러블슈팅

### 배포 환경에서 새로고침 시 404 → MIME type 오류

- **문제**: `/promise/:id/finalize` 등에서 새로고침하면 Vercel 404, rewrites 추가 후에는 `Failed to load module script ... MIME type of "text/html"` 발생
- **원인**: SPA라 서버에 해당 경로의 파일이 없음. 또 Vite `base: './'`로 스크립트가 상대 경로라 중첩 경로에서 `/promise/:id/assets/...`를 요청했고, rewrites가 이를 `index.html`로 응답
- **해결**: `vercel.json`에 모든 경로를 `index.html`로 보내는 rewrites 추가, `base`를 `'/'`로 변경

### 카카오맵 SDK 업데이트로 좌표가 사라짐

- **문제**: 출발 위치를 선택해도 가까운 역이 입력되지 않고, 장소 마커와 지도 이동이 동작하지 않음
- **원인**: 버전을 고정하지 않은 SDK가 4.5.29로 업데이트되며 `LatLng` 객체의 난독화된 내부 필드(`Ma`, `La`) 이름이 바뀜
- **해결**: SDK 객체 내부 필드를 읽지 않도록 좌표를 일반 객체 `{ Ma, La }`로 저장하고, 지도 API를 호출할 때만 `LatLng` 생성

### 좋아요를 누를 때마다 목록 순서가 바뀜

- **문제**: 좋아요 탭에서 좋아요를 누르면 응답 후 장소 순서가 섞임
- **원인**: 백엔드에서 MongoDB `$group`으로 장소별 좋아요를 집계하는데, `$group`은 결과 순서를 보장하지 않음
- **해결**: 장소별 첫 좋아요 시각 순으로 `$sort`해 프론트 낙관적 업데이트와 같은 순서로 고정

&nbsp;

## 📌 우리의 컨벤션

### 네이밍 컨벤션

- 폴더명: `kebab-case` → e.g. navigation-bar, server-actions
- 파일명:

  - 기본 파일: `camelCase` → e.g. calculate.ts, apiClient.ts
  - 컴포넌트 파일: `PascalCase` → e.g. Button.tsx, ProductList.tsx

- 변수 및 함수

  - 함수명: `camelCase` → e.g. fetchProducts(), handleSubmit()
  - 변수명: `camelCase` → e.g. userName, itemCount
  - 상수명: UPPER_SNAKE_CASE
  - 화살표 함수

    - 컴포넌트: 하단에 default export

      ```js
      const ProductList = () => {
        return <div>상품 리스트</div>;
      };
      ```

    - 여러 가지 함수: 각 함수를 named export
      ```js
      export const fetchItems = () => {
        /* ... */
      };
      export const updateUser = () => {
        /* ... */
      };
      ```

  - 컴포넌트
    컴포넌트명: `PascalCase` → e.g. Header, LoginForm
    페이지 컴포넌트: `Page 접미사 사용` → e.g. MainPage, CartPage

### 커밋 컨벤션

e.g. style: 홈페이지 스타일링

- `feat`: 새로운 기능 추가
- `style`: css 수정 및 코드의 의미에 영향을 미치지 않는 변경사항
- `fix`: 버그 수정
- `refactor`: 리팩토링, 기능 변화 없이 코드 구조 개선
- `chore`: 코드 수정 외 잡다한 작업 (빌드 과정이나 설정 변경 등)
- `docs`: 문서 변경
- `test`: 테스트 코드 추가 또는 수정
- `rename`: 파일, 폴더, 변수 등 이름 변경
- `remove`: 파일, 폴더, 변수 등 삭제
- `comment`: 주석 추가, 삭제, 수정

**정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.** <br/>
**코드 품질 관리는 `eslint`로, 코드 포맷팅은 `prettier`로, 스타일 코드 포맷팅은 `stylelint`로, 커밋 메시지 관리는 `commitlint`로 했습니다. 팀원들과 소통하여 코딩 컨벤션을 구축했습니다.** <br/>
**그리고 `husky`를 사용해 규칙에 맞지 않으면 커밋을 제한했습니다.** <br/>

### 브랜치 전략

**main, develop** 브랜치와 **feat** 보조 브랜치를 사용했습니다.

- **main**: 배포 가능한 안정적인 상태의 코드를 유지
- **develop**: 기능 개발이 완료된 코드가 머지되는 브랜치
- **feat**: 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제 / issue 하나 당-branch 하나, PR 하나
  - feat 브랜치 이름 규칙: `feat/기능명-이슈번호` e.g. feat/admin-login-12
