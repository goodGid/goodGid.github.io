---
layout: post
title:  " [만들면서 배우는 클린 아키텍처] 5장. 웹 어댑터 구현하기 "
categories: CleanArchitecture
author: goodGid
---
* content
{:toc}

> 이 글은 [책](https://shorturl.at/eoKN3) 내용을 토대로 작성하였습니다.

---

## Prologue

* 책 내용을 다 담을 수 없어

  핵심적인 개념 위주로 정리를 하였으니

  자세한 내용은 책을 봅시다 ! 



---

## 웹 어댑터의 책임

* 웹 어댑터의 역할은 다음과 같다.

```
1. HTTP 요청을 자바 객체로 매핑
2. 권한 검사
3. 입력 유효성 검증
4. 입력을 유스케이스의 입력 모델로 매핑
5. 유스케이스 호출
6. 유스케이스의 출력을 HTTP로 매핑
7. HTTP 응답을 반환
```

* 3번을 보면 입력 유효성 검증을 실시한다.

* 그런데 어플리케이션에서도 [유효성 검증]({{site.url}}/CA-Implementing-the-Usecase/#입력-유효성-검증)을 하게 되는데 

  유스케이스의 입력 모델과는 구조나 의미가 완전히 다를 수 있으므로
  
  웹 어댑터의 입력 모델을 유스케이스의 입력 모델로 변환할 수 있는지 검증해야 한다.

* 웹 어댑터의 역할을 보면 상당하다.

  그런데 이 책임들은 어플리케이션 계층에서는 몰라야 하는 것들이다.

* 어플리케이션 계층에 HTTP를 사용하지 않는

  또 다른 인커밍 어댑터의 요청에 대해서도
  
  동일한 도메인 로직을 수행할 수 있어야 하므로

  HTTP와 관련된 것은 어플리케이션 계층에 침투하면 안 된다.

### 굳이 이렇게까지?

* 라는 생각이 들 수도 있다.

* 하지만 클린 아키텍처는 
  
  도메인과 어플리케이션을 중점적으로 생각하기 때문에

  도메인 + 어플리케이션 개발 후 어댑터를 개발하게 된다.

* 즉 HTTP를 사용하는 어댑터를 먼저 생각하고 개발하는 게 아니라

  그런 외적인 요소를 배제하고 도메인과 어플리케이션만 생각해서 개발하므로

  당연히 어플리케이션 계층에서는 HTTP와 관련된 개념이 침투하지 못하게 된다.

* 그 결과 설령 어댑터를 교체해야 할 경우에도 문제없이 교체가 가능하다.

---

## Refernece

* [만들면서 배우는 클린 아키텍처](https://shorturl.at/eoKN3)