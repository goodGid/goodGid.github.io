---
layout: post
title:  " [만들면서 배우는 클린 아키텍처] 8장. 경계 간 매핑하기 "
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

## 모델 매핑

* 계층 간 매핑에 대해 이렇게 생각해 볼 수 있다.

> 매핑에 찬성하는 개발자

* 두 계층 간에 매핑을 하지 않으면

  양 계층에서 같은 모델을 사용해야 하는데

  이렇게 하면 두 계층이 강하게 결합된다.

---

> 매핑에 반대하는 개발자

* 두 계층 간에 매핑을 하게 되면

  중복 코드가 너무 많아진다.

* 많은 유스케이스들이 CRUD만 수행하고

  계층에 걸쳐 같은 모델을 사용하므로 계층 사이의 매핑은 과하다.

---

## 매핑하지 않기 전략

![](/assets/img/ca/CA-Mapping-between-Boundaries_1.png)

* 웹 계층, 어플리케이션 계층, 영속성 계층 

  모두 Account 클래스에 접근한다.

  = 같은 모델을 사용한다.

---

### 예측 가능한 상황

* 이렇게 했을 때 다음과 같은 상황을 예상해 볼 수 있다.

---

#### 기술적적인 요구 사항

* 웹/영속성 계층은 모델에 대해 기술적인 요구사항이 있을 수 있다.
  
  그런데 특정 기술과 베타적인 
  
  도메인과 어플리케이션은 이러한 요구사항에 관심이 없지만

  같은 모델을 사용하므로 알아야만 한다.

  ex) JSON 직렬화를 위한 어노테이션 추가, DB 매핑을 위한 ORM 관련 어노테이션

---

#### 비즈니스적 요구 사항

* 혹은 비즈니스적 요구 사항 때문에 

  한 계층에서만 필요한 필드를 추가해야할 수도 있다.

* 즉 Account 클래스는 웹/어플리케이션/영속성과 관련된 이유로 인해

  변경되어야 하기 때문에 **단일 책임 원칙**을 위반한다.

---

### 무조건 나쁘다?

* 상황에 따라 다르다.

* 간단한 CRUD 유스케이스에서

  같은 필드를 가진 웹 모델 -> 도메인 모델 -> 영속성 모델로 매핑할 경우엔 

  계층 별 매핑하지 않는 전략이 오히려 좋을 수 있다.

* 그리고 처음부터 정하기보다는

  시간이 지남에 따라 수정하는 것도 좋은 방안이다.

---

## 양방향 매핑 전략

![](/assets/img/ca/CA-Mapping-between-Boundaries_2.png)

* 각 계층은 전용 모델을 가진다.

  그러므로 각 계층별로 최적으로 표현할 수 있는 구조를 가질 수 있다.

  ex) 웹 모델에 JSON 어노테이션 사용, 영속성 모델에 ORM 관련 어노테이션 사용

* 도메인과 어플리케이션은 기술적인 환경으로부터 독립할 수 있게 되고

  단일 책임 원칙을 만족하게 된다.

* 웹 <-> 도메인, 도메인 <-> 영속성 간의 

  모델을 매핑하고

  이 흐름이 양방향으로 매핑하므로 **양방향 매핑**이라 부른다.

---

### 단점

* 너무 많은 중복 코드가 발생한다.

* 또한 도메인 모델이 계층 경계를 넘어서 사용된다.

  인/아웃 포트가 도메인 객체를 입력 파라미터/반환값으로 사용한다.

* 즉 도메인 객체가 외부로 노출되는 것이고

  또한 외부 환경의 요구에 따라서 변경될 가능성도 높아진다.

  ex) 도메인에 필요 없는데 외부 환경의 요구로 인해 필드 추가

---

## 완전 매핑 전략

![](/assets/img/ca/CA-Mapping-between-Boundaries_3.png)

* 각 계층이 아니라 각 연산마다 별도의 모델을 가진다.

* 딱 봐도 너무 비효율적이다.

  그러므로 사실 추천하지 않는 전략이다.

---

## 단방향 매핑 전략

![](/assets/img/ca/CA-Mapping-between-Boundaries_4.png)

* 모든 계층의 모델들이 **같은 인터페이스**를 구현한다.

  그리고 인터페이스는 특정 필드들에 대해서만 
  
  Getter를 제공함으로써 캡슐화를 한다.

  Setter는 제공 X, 제공하면 도메인이 외부 영향으로 인해 더럽혀질 수 있다.

* 계층 간 인터페이스로 통신을 함으로

  도메인 객체 자체가 외부 계층에 노출되지 않는다.

---

### 가장 빛이 나는 순간

* 계층 간의 모델이 비슷할 때 효과적이다.

* 읽기 전용 연산의 경우 
  
  상태 인터페이스가 필요한 모든 정보를 제공하기 때문에

  웹 계층에서 웹 계층 전용 모델로 매핑할 필요가 전혀 없다.

---

## 결론

* 상황에 맞게 동료와 함께 가이드라인을 정해서 매핑 전략을 가져가자.

* 경험상 "양방향 매핑 전략"이 가장 무난하지 않나 싶다.

---

## Refernece

* [만들면서 배우는 클린 아키텍처](https://shorturl.at/eoKN3)