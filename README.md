# 6조 [Promeet](https://promeet-gilt.vercel.app)

## 📂 프로젝트 소개

### 🔑 대학생들의 약속 조율을 돕는 사이트입니다.

&nbsp;

## 🔗 링크

- 배포: https://promeet-gilt.vercel.app
- 백엔드 저장소: https://github.com/duwlsssss/Promeet-Server

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
|   Deployment    |                                                                                                                                                                                                                                   ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white)                                                                                                                                                                                                                                    |
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
