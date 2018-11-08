---
layout: post
title:  "Normalization (1)"
categories: Database
tags: Database
author: goodGid
---

* content
{:toc}


## Concept

> Normalization는 상호 종속적인 관계를 갖는 특성을 이용하여 무손실 분해하는 과정이다. <br> 최종 목적은 이상 현상 발생 가능성을 줄이는 것이다.


---

**제 1정규형**

* 모든 속성의 도메인이 `원자 값(Atomic Value)`만으로 되어 있는 정규형

{% capture images %}
    /assets/img/posts/normalization_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


* <주문목록> 테이블에서는 하나의 제품에 여러 개의 주문 관련 정보 (주문번호, 고객번호, 주소, 주문수량)가 발생하고 있다. 

* 따라서 <주문목록> 테이블은 제 1정규형이 아니다.

* 1차 정규화 과정으로 생성된 <제품주문> 테이블의 기본키는 (주문번호, 제품번호)이고, 다음과 같은 함수적 종속이 존재한다.

---

* 주문번호, 제품번호 --> 고객번호, 주소, 주문수량

* 주문번호 --> 고객번호, 주소

* 고객번호 --> 주소 


---

**제 2정규형**

* 테이블 R이 제 1정규형이고, `기본키`가 아닌 `모든 속성`이 기본키에 대하여 [`완전 함수적 종속`]({{site.url}}/DB-Func-Dependency/)을 만족하는 정규형

{% capture images %}
    /assets/img/posts/normalization_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


* 제 2정규화 과정을 거쳐 생성된 <주문> 테이블의 기본키는 주문번호이다. <br> 그리고 <주문> 테이블에는 아직도 다음과 같은 함수적 종속들이 존재한다.


---

* 주문번호 --> 고객번호, 주소

* 고객번호 --> 주소 

---

## Example

> Q. <제품납품> 테이블을 정규화 과정을 수행하여 무손실 분해하고 그 이유를 서술하시오.

{% capture images %}
    /assets/img/posts/normalization_5.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

```    
<제품납품> 테이블에는 다음과 같은 함수적 종속이 존재한다.

납품번호, 제품번호 --> 업체번호, 업체명, 납품수량
납품번호 --> 업체번호, 업체명

<제품납품> 테이블에는 기본키인 (납품번호, 제품번호)에 [완전 함수적 종속]이 되지 않는 속성이 존재한다.
업체번호와 업체명은 납품번호에 의해서도 결정될 수 있으므로 기본키에 대해 [완전 함수적 종속]이 아닌 {부분 함수적 종속}이다.
따라서 <제품납품> 테이블은 제 2정규형이 아니다.

정규화 결과

<제품납품> 테이블에서 기본키의 일부인 납품번호에 함수적 종속되는 부분 함수적 종속을 제거하기 위해
속성들을 분리하여 제 2정규형을 만들면 된다.
```    

{% capture images %}
    /assets/img/posts/normalization_6.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}
