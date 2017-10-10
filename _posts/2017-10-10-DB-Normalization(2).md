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

**제 3정규형**

* 테이블 R이 제 2정규형이고, `기본키`가 아닌 `모든 속성`이 기본키에 대해 `이행적 함수적 종속`을 만족하지 않는 정규형


{% capture images %}
    /assets/img/posts/normalization_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


* <주문> 테이블에서 고객번호가 주문번호에 함수적 종속이고, 주소가 고객번호에 함수적 종속이므로 <br/> 주소는 기본키인 주문번호에 대해 이행적 함수적 종속을 만족한다. <br/> 즉 주문번호 -> 고객번호이고, 고객번호 -> 주소이므로 주문번호 -> 주소는 이행적 함수적 종속이 된다.<br/> 따라서 <주문> 테이블은 제 3정규형이 아니다.

---

**BCNF**

