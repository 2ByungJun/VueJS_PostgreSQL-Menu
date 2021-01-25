# postgre_vue

![](https://images.velog.io/images/ieed0205/post/fc776293-c969-43b2-adf1-05b02421ff63/%EB%85%B9%ED%99%94_2021_01_22_16_54_50_260.gif)

## 환경
### spring-boot
> - eclipse(2020-06)
> - jdk 1.8

### db
> - postgreSQL

### vueJS
> - vsCode
> - vue 2.x

### dependencies
> - "axios": "^0.21.1",
> - "bootstrap": "^4.5.3",
> - "bootstrap-vue": "^2.21.2",
> - "core-js": "^3.6.5",
> - "lodash": "^4.17.20",
> - "vue": "^2.6.11",
> - "vue-jstree": "^2.1.6",
> - "vue-router": "^3.2.0",
> - "vue-sweetalert2": "^4.1.1",
> - "vue-tree-list": "^1.5.0",
> - "vuex": "^3.4.0"

## 적용

### 2020-01-25
> - 기존 대표 URL에서는 URL을 보내서 맞는 pageSeq를 찾는 방식에서, prevPageSeq를 추가해 이를 보완함

### 2020-01-22
> - 메뉴관련 페이지 추가 기능
> - 페이지 삭제시 메뉴 페이지Seq 변경
> - SweetAlert 사용
> - SweetAlert API를 커스텀하여 모듈로 재구성
> - 기타 에러 보완 및 spring-boot 로직 구현

### 2020-01-21
> - 메뉴 수정기능 추가
> - 아이콘, vue-tree-list 옵션 변경
> - 메뉴관련 페이지 삭제 기능
> - 코드 리펙토링 진행

### 2020-01-20
> - 메뉴&페이지 연결 작업 진행중
> - 메뉴 상위메뉴, 대표URL select 구현
> - 페이지 정보 컴포넌트 추가
> - 페이지 추가 컴포넌트 추가
> - 메뉴 삽입, 삭제 구현

### 2020-01-19
> - 메뉴 계층쿼리 level3 까지 구현
> - 메뉴 트리 형성
> - 메뉴 가공 데이터 삽입
> - 메뉴 상세보기 구현

### 2020-01-18
> - vue-tree-list DOC 공부
> - vue-tree-list 데이터 가공 진행중

### 2020-01-15
> - spring-boot, menu CRUD 로직 구현
> - vue-tree-list API 사용
> - 메뉴 상세보기 구현

### 2020-01-11
> - pageUpdate
> - validation
> - Exception
> - sideBar fixed
> - props, emit

### 2020-01-08
> - router, vuex Create
> - bootstrapVue
> - siderBar
> - pageList
> - pageInsert
> - pageDelete
> - pageSelectedDelete
> - Store(state, actions, mutations)