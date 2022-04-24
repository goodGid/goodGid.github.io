---
layout: post
title:  " 개발하면서 맞이했던 이슈(Issue)들 기록해두기 "
categories: Technology
author: goodGid
---
* content
{:toc}

## Prologue

* 개발하다 보면

  "이거 이전에 겪었던 이슈인데..."

  "이거 어떻게 해결했지?"라는 질문을 지속해서 하는 나를 발견했다.

* 대충 키워드라도 알면 빠르게 문제를 해결할 텐데

  기록해둔건 없고 기억조차 나지 않다 보니 항상 반복된 삽집을 하게 된다.

  그래서 이참에 개발하면서 맞이했던 이슈(Issue)들을 기록해두려고 한다.


---

## Issue's

### Log 파일 && 권한 (Permission)

* Log 파일이 생성되지 않는다면 권한(Permission) 문제는 아닌지 확인해보자.

``` java
// 220420 (수)
logback 설정을 했는데 원격 서버에서 파일이 생성되지 않았다.
실제 서버에 들어가서 서버를 띄우는 계정과 
파일 생성 경로에 그 계정이 권한이 있는지 체크를 해보자.
```

---

### Log 파일 && 도커 (Docker)

* 도커 환경에서 서버를 배포할 경우 온프레미스(On-Premise)와는 Log 파일 생성 경로가 다를 수 있다.

``` java
// 220420 (수)
신규 프로젝트 생성 시
온프레미스 환경의 프로젝트 코드를 가져다 쓰면
DevOps 쪽에서 도커 환경의 서버 로그 파일을 관리하는 룰이 다를 수 있다.
(= 온프레미스 로그 파일 경로 != 도커 환경 로그 파일 경로)
```

---

### Multi Module + Gradle + Bean 주입 문제

* Multi Module에서 Bean 주입이 안 되는 에러가 발생하면 Gradle 구조를 의심해보자.

``` java
// 220420 (수)
sub moudle에 Bean 주입이 안 됐다.
implementation, api, compileOnly 등등 옵션을 꼭 확인해보자.
```

> Gradle Option

```
- implementation: 의존 라이브러리 수정 시 본 모듈까지만 재빌드
- api: 의존 라이브러리 수정 시 본 모듈을 의존하는 모듈들도 재빌드
- compileOnly: compile 시에만 빌드하고 빌드 결과물에는 포함하지 않음
- runtime 시 필요 없는 라이브러리인 경우 (runtime 환경에 이미 라이브러리가 제공되고 있는가 하는 등의 경우)
// ref : https://blog.gradle.org/introducing-compile-only-dependencies
```

---

### Json Naming Strategy - Snake 사용

* Snake 문법으로 통신 시

  언더바(_)뒤에 문자가 소문자가 아니면 값 매핑이 안된다.


``` java
// 220420 (수)
ex) user_Info (X)
ex) user_info (O)
```
