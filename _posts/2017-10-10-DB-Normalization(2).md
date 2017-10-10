---
layout: post
title:  "DataBase :: Normalization (2)"
date:   2017-10-10
excerpt: "Normalization개념 (2)"
cate : "post"
tag:
- DB
---

## Concept

> Normalization는 상호 종속적인 관계를 갖는 특성을 이용하여 무손실 분해하는 과정이다. <br/> 최종 목적은 이상 현상 발생 가능성을 줄이는 것이다.


---

**제 1정규형**

* 모든 속성의 도메인이 `원자 값(Atomic Value)`만으로 되어 있는 정규형

{% capture images %}
    /assets/img/posts/normalization_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


* <주문목록> 테이블에서는 하나의 제품에 여러 개의 주문 관련 정보 (주문번호, 고객번호, 주소, 주문수량)가 발생하고 있다. <br/> 따라서 <주문목록> 테이블은 제 1정규형이 아니다.


* 1차 정규화 과정으로 생성된 <제품주문> 테이블의 기본키는 (주문번호, 제품번호)이고, 다음과 같은 함수적 종속이 존재한다.

---

|    |
|:-------:|
|  주문번호, 제품번호 --> 고객번호, 주소, 주문수량  |
|  주문번호 --> 고객번호, 주소  |
|  고객번호 --> 주소  |
| |

---

**제 2정규형**

* 테이블 R이 제 1정규형이고, `기본키`가 아닌 `모든 속성`이 기본키에 대하여 `완전 함수적 종속`을 만족하는 정규형

{% capture images %}
    /assets/img/posts/normalization_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


* 제 2정규화 과정을 거쳐 생성된 <주문> 테이블의 기본키는 주문번호이다. <br/> 그리고 <주문> 테이블에는 아직도 다음과 같은 함수적 종속들이 존재한다.


---

|    |
|:-------:|
|  주문번호 --> 고객번호, 주소  |
|  고객번호 --> 주소  |
| |

