---
layout: post
title:  "DataBase :: Normalization"
date:   2017-10-10
excerpt: "Normalization개념"
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
    /assets/img/posts/normal_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

--> <주문목록> 테이블에서는 하나의 제품에 여러 개의 주문 관련 정보 (주문번호, 고객번호, 주소, 주문수량)가 발생하고 있다. 

따라서 <주문목록> 테이블은 제 1정규형이 아니다.

{% capture images %}
    /assets/img/posts/normal_0.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

{% capture images %}
    /assets/img/posts/normal_2.png
    /assets/img/posts/normal_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}


---

|    |
|:-------:|
|  주문번호, 제품번호 --> 고객번호, 주소, 주문수량  |
|  주문번호 --> 고객번호, 주소  |
|  고객번호 --> 주소  |
| |

---



---
