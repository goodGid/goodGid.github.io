---
layout: post
title:  " [만들면서 배우는 클린 아키텍처] 4장. 유스케이스 구현하기 "
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

## 입력 유효성 검증

* Input에 대한 검증은 유스케이스 클래스의 책임 X

  대신 어플리케이션 계층에서 검증을 해야 한다.

* 그러면 어디서 검증해야 할까?

  **생성자**를 활용하면 객체 생성 시점에 검증을 할 수 있고

  자연스럽게 객체 생성과 동시에 검증까지 한방에 해결할 수 있게 된다.

* 추가로 [웹 어댑터에서도 입력 유효성 검증]({{site.url}}/CA-Implementing-a-Web-Adapter/#웹-어댑터의-책임)을 어플리케이션에서 하는 검증과 차이가 있다.

---

## 유스케이스마다 다른 입력/출력 모델

* 각기 다른 유스케이스에서 

  같은 모델을 사용하고 싶어질 때가 있다.

* 이 경우 같이 사용해도 될까? 

  아니면 각각 만들어야 할까?

* 결론은 각각 만드는 것을 추천한다.

  그래야지 서로 다른 유스케이스에서 결합도가 낮아진다.

---

## 비즈니스 규칙 검증하기

* 입력에 대한 검증은 객체의 생성자를 활용한다고 이야기했다.

* 그러면 비즈니스 규칙에 대한 검증은 어디서 해야 할까?

  당연히 유스케이스에서 하면 된다.

* 2개를 정리하자면 다음과 같다.

  입력 유효성을 검증하는 것은 **구문상의(Syntactical)** 유효성을 검증하는 것이고

  비즈니스 규칙은 **의미적인(Semantical** 유효성 검증을 하는 것이다.

* 그렇다면 비즈니스 규칙을 어떻게 구현해야 할까?

---

### 도메인 엔티티 내부

``` java
public class Account {
    ...
    public boolean withdraw(...) {
        if (xxx) {
            return false;
        }
        ...
    }
}
```

* 도메인 엔티티 내부에 비즈니스 규칙을 검증하는 메서드를 작성한다.

---

### 도메인 엔티티 사용 전

``` java
public class XxxxService {
    public boolean sendMoney(...) {
        validateXxx();
        ....
        account.Xxx(); // 도메인 사용 시점
    }
}
```

* 상황에 따라 도메인에 담을 수 없는 검증이라면

  유스케이스 내부에 있는 메서드 안에서 검증을 진행한다.

  = 도메인 엔티티를 사용하기 전에 검증한다.
  
---

## 풍부한 도메인 모델 vs 빈약한 도메인 모델

* 결론적으로 정답은 없다.

  상황에 맞게 도메인 모델을 사용하면 된다.

---

### 풍부한 도메인 모델 

* DDD 철학을 따르는 풍부한 도메인 모델에서는 

  엔티티에 가능한 많은 도메인 로직이 구현되어 있다.

* 그 결과 많은 비즈니스 규칙이 유스케이스 대신 엔티티에 위치하게 된다.

  ex) 엔티티에 상태를 변경하는 메서드 제공

---

### 빈약한 도메인 모델

* 빈약한 도메인 모델은 굉장히 얇다.

  일반적으로 getter/setter 만 포함하고 

  나머지는 유스케이스에서 구현한다.

---

## 유스케이스마다 다른 출력 모델

* 유스케이스가 호출자에게 무엇을 반환해야 할까?

  최대한 구체적이면 좋다.

  그러므로 꼭 필요한 데이터만 응답해야 한다.

---

## 읽기 전용 유스케이스는 어떨까?

* 만약 읽기 전용 유스케이스라면 

  인커밍 전용 포트를 만들고

  이를 **쿼리 서비스(Query Service)**에 구현하도록 구조를 잡는다.

``` java
class XxxService implements XxxQuery {
    ...
}
```

* 이러한 패턴을 **CQRS(Command-Query Responsibility Segregation)**이라 부르고

  이런 패턴을 통해 쓰기가 가능한 경우와 읽기 전용 케이스가

  코드상에서 명확하게 드러나 구분이 쉽게 된다.

---

## Refernece

* [만들면서 배우는 클린 아키텍처](https://shorturl.at/eoKN3)