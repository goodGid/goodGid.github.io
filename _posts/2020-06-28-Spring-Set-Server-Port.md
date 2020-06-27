---
layout: post
title:  " SpringBoot 서버 랜덤으로 포트 설정하기 : ${random.int} vs 0 "
categories: Spring
author: goodGid
---
* content
{:toc}

## 서버 포트

* 서버 포트를 설정해야 해당 값으로 클라이언트가 요청을 할 수 있다.

* 일반적으로 Default로 8080을 사용하는데

  상황에 따라 임의로 지정한 포트를 사용해야할 경우가 있다.

  혹은 랜덤한 포트를 사용할 경우가 필요할 경우도 있다.

* 이 글에서는 랜덤한 포트를 사용하려고 하는 경우

  올바르게 포트를 설정하는 방법에 대해 알아본다.



---


## 랜덤 포트 설정하기

* 랜덤한 포트값을 뽑아내기 위해 2가지 방법을 알아보자.

---

### ${random.int}

> application.properties

``` java
server.port=${random.int}
```

* random 한 int값을 뽑아낸다.

* 하지만 서버 포트로 사용하는 건 추천하지 않는다.

  왜냐하면 Fix 되어 있는 포트를 낮은 확률로 선택할 수도 있다.

  그렇기 때문에 의도치 않게 포트가 중복되어

  웹 서버를 띄울 때 에러가 발생할 수 있다.

---

### 0

> application.properties

``` java
server.port=0
```

* 서버 포트값으로 **0**을 주면

  **사용 가능한 포트** 중 선택을 한다.

  그렇기 때문에 Fix 된 값을 선택하지 않게 되고 안전하게 포트 설정이 가능해진다.

* 하지만 ${random.int}는 그걸 고려하지 않는다.


> Console

```
// 실행 시마다 포트값이 변경된다.
Tomcat started on port(s): 53115 (http) with context path ''
Tomcat started on port(s): 53121 (http) with context path ''
Tomcat started on port(s): 53127 (http) with context path ''
```




---


## Summary

* 랜덤 포트를 사용할 계획이라면

  위에서 말했듯이 ${random.int}가 아닌 0을 사용해야 한다.




---

## Reference

* [스프링 부트 개념과 활용](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)