# Modules

## 디렉토리 구조

```bash
.
├── assets
│   ├── css
│   │   ├── components
│   │   │   └── ui
│   │   ├── mixins
│   │   └── pages
│   │       └── subpages
│   └── icons
├── components
│   ├── modals
│   └── ui
├── dist
│   ├── _nuxt
│   │   └── img
│   ├── access
│   ├── create
│   ├── faucet
│   ├── showcase
│   ├── subpages
│   │   ├── CreateAccountStep1
│   │   ├── CreateAccountStep3
│   │   └── SignIn
│   └── transfer
├── docs
├── layouts
├── lib
├── middleware
├── pages
│   └── subpages
├── plugins
├── static
├── store
│   └── modules
└── types
```

- assets : CSS 파일 및 컴포넌트 속성 정의
- components : Vuejs에서 사용되는 컴포넌트의 정의
- dist : 배표용 폴더 (빌드시 생김)
- docs : 도큐멘트 폴더
- layouts : 라우팅 관련 레이아웃
- lib : axios 관련 설정
- middleware : 이전 express 프레임워크 파트 (Vue-cli/nuxt 자동 생성)
- pages : 웹 페이지 Vue 파일
- plugins : vue-cli / popover 관련 플로그인 설정
- static : 파피콘
- store : vuex 데이터 저장 관련 부분
- types : typescript 관련한 타입 정의 (.d.ts 파일)

## 전체 구조

```
.
├── Dockerfile
├── HEAD
├── Procfile
├── README.md
├── assets
│   ├── css
│   │   ├── App.scss
│   │   ├── components
│   │   │   └── ui
│   │   │       ├── Button.scss
│   │   │       ├── Checkbox.scss
│   │   │       ├── DropDownBox.scss
│   │   │       ├── Field.scss
│   │   │       └── ProgressBar.scss
│   │   ├── main.scss
│   │   ├── mixins
│   │   │   ├── const.scss
│   │   │   └── fonts.scss
│   │   └── pages
│   │       ├── CreateAccount.scss
│   │       ├── YeedFaucet.scss
│   │       └── subpages
│   │           ├── CreateAccountSteps.scss
│   │           ├── SendYeedStep1.scss
│   │           ├── SendYeedStep2.scss
│   │           └── SendYeedStep3.scss
│   └── icons
│       ├── check1_normal.svg
│       ├── check2_normal.svg
│       ├── check_bold.svg
│       ├── clear_icon.svg
│       ├── loading-animation.svg
│       ├── medium_logo.svg
│       ├── net_icon.svg
│       ├── password_eye_icon.svg
│       ├── password_eye_icon_2.svg
│       ├── question_mark.svg
│       ├── sidebar_account_info_icon.svg
│       ├── sidebar_create_account_icon.svg
│       ├── sidebar_more_icon.svg
│       ├── sidebar_send_yeed_icon.svg
│       ├── sidebar_yeed_faucet_icon.svg
│       ├── sidebar_yggdrash_wallet_logo.svg
│       ├── twitter_logo.svg
│       ├── warning_icon.svg
│       └── yggdrash_logo.svg
├── components
│   ├── Card.vue
│   ├── ContentWrapper.vue
│   ├── ModalsContainer.vue
│   ├── TopNav.vue
│   ├── modals
│   │   ├── ClearPKModal.vue
│   │   ├── EmptyModal.vue
│   │   ├── FaucetModal.vue
│   │   ├── LoadingModal.vue
│   │   ├── Modal.vue
│   │   └── SimpleModal.vue
│   └── ui
│       ├── Button.vue
│       ├── Checkbox.vue
│       ├── CopyOnlyField.vue
│       ├── DropDownBox.vue
│       ├── Field.vue
│       ├── NumberField.vue
│       ├── PasswordField.vue
│       ├── ProgressBar.Vue
│       ├── Tab.vue
│       ├── Tabs.vue
│       ├── TextField.vue
│       └── UploadField.vue
├── docker-compose.yml
├── docs
│   ├── features.md
│   ├── install.md
│   └── modules.md
├── favicon.ico
├── layouts
│   └── default.vue
├── lib
│   ├── axios.ts
│   └── event-bus.ts
├── middleware
│   └── README.md
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── pages
│   ├── access.vue
│   ├── create.vue
│   ├── faucet.vue
│   ├── index.vue
│   ├── showcase.vue
│   ├── subpages
│   │   ├── CreateAccountStep1.vue
│   │   ├── CreateAccountStep2.vue
│   │   ├── CreateAccountStep3.vue
│   │   ├── MyAccountInfo.vue
│   │   ├── SendYeedStep1.vue
│   │   ├── SendYeedStep2.vue
│   │   ├── SendYeedStep3.vue
│   │   └── SignIn.vue
│   └── transfer.vue
├── plugins
│   ├── vue-clipboard2.ts
│   └── vue-popover.ts
├── static
│   └── favicon.ico
├── store
│   ├── index.ts
│   └── modules
│       └── yggdrash.ts
├── tsconfig.json
└── types
    ├── transaction.d.ts
    └── wallet.d.ts
```

- assets : CSS 파일 및 컴포넌트 속성 정의
  - SCSS 파일들의 집합 및 Icon용 svg 파일의 집합
- components : Vuejs에서 사용되는 컴포넌트의 정의
  - 카드, 컨텐츠 래퍼, 네비게이션, 모달 등에 대한 정의. 여기서 컴포넌트를 가져와 Pages에 임포트하여 사용을 할 수 있다. 이 부분은 Pages에서 임포트하면서 확인할 것
- dist : 배표용 폴더 (빌드시 생김)
  - 실 사용용 distribution용 툴
- docs : 도큐멘트 폴더
  - 현 서비스에 대한 설명이 적혀있음
- layouts : 라우팅 관련 레이아웃
  - vue-router와 비슷하게 작동하도록 구성. 라우팅 매칭에 관한 부분이 있음
- lib : axios 관련 설정
  - axios로 데이터 fetch 관련한 부분이 필요하여 설정
- middleware : 이전 express 프레임워크 파트 (Vue-cli/nuxt 자동 생성)
  - 현재 README만 존재
- pages : 웹 페이지 Vue 파일
  - 웹 사이트의 핵심적인 기능들에 대한 정의. subpages는 page의 하부 페이지로 정의 됨. 일종의 컴포넌트와 같으나 재사용을 목적으로 만들어진 것은 아님.
- plugins : vue-cli / popover 관련 플러그인 설정
- static : 파피콘
- store : vuex 데이터 저장 관련 부분
  - 데이터의 전송 및 받음을 위한 전역 상태 설정이 필요한데, 이 부분을 위해서 만들어 놓음 부분. Vuex 사용법을 확인 해 볼 것
- types : typescript 관련한 타입 정의 (.d.ts 파일)
  - 외부 임포트 및 재사용을 위한 .d.ts 파일 덩어리