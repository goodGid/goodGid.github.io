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


* <주문> 테이블에서 고객번호가 주문번호에 함수적 종속이고, 주소가 고객번호에 함수적 종속이므로 <br/> 주소는 기본키인 주문번호에 대해 이행적 함수적 종속을 만족한다. <br/> 즉 [주문번호 -> 고객번호]이고, [고객번호 -> 주소]이므로 [주문번호 -> 주소]는 이행적 함수적 종속이 된다.<br/> 따라서 <주문> 테이블은 제 3정규형이 아니다.

---

**BCNF**

* 테이블 R에서 모든 결정자가 `후보키(Candidate Key)`인 정규형

* 일반적으로 제 3정규형에 후보키가 여러 개 존재하고, 이러한 후보키들이 서로 중첩되어 나타나는 경우에 적용 가능하다.


{% capture images %}
    /assets/img/posts/normalization_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


* <수강_교수> 테이블은 함수적 종속 <br/> [ (학번, 과목명) --> 담당교수, (학번, 담당교수) --> 과목명, (담당교수 --> 과목명)]을 만족하고 있다. <br/> <수강_교수> 테이블의 후보키는 (학번, 과목명)과 (학번, 담당교수)이다.

* <수강_교수> 테이블에서 결정자 중 후보키가 아닌 속성이 존재한다. <br/> 즉 함수적 종속 [담당교수 --> 과목명]이 존재하는데, <br/> 담당교수가 <수강_교수> 테이블에서 후보키가 아니기 때문에 <수강_교수> 테이블은 BCNF가 아니다.


---

**제 4정규형**


---

**제 5정규형**

