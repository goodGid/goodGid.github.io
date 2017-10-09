---
layout: post
title:  "DataBase :: Anomaly"
date:   2017-10-10
excerpt: "Anomaly 개념"
cate : "post"
tag:
- DB
---

## Concept

> Anomaly이란 테이블에서 일부 속성들의 종속으로 인해 데이터의 중복이 발생하고, <br/> 이 중복으로 인해 테이블 조작 시 문제가 생기는 현상을 의미

* 이상의 종류
    1. 삽입 이상 (Insertion Anomaly)
    2. 삭제 이상 (Deletion Anomaly)
    3. 갱신 이상 (Update Anomaly)

---

{% capture images %}
    /assets/img/posts/anomaly_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

---

**삽입 이상 (Insertion Anomaly)**

* 테이블에 데이터를 삽입할 때 의도와는 상관없이 원하지 않은 값들로 인해 삽입할 수 없게 되는 현상


---

**삭제 이상 (Deletion Anomaly)**

* 테이블에서 한 튜플을 삭제할 때 의도와는 상관없는 값들도 함께 삭제되는, 즉 `연쇄 삭제`가 발생하는 현상

---


**갱신 이상 (Update Anomaly)**

* 테이블에서 튜플에 있는 속성 값을 갱신할 때 일부 튜플의 정보만 갱신되어 정보에 `불일치성(Incosistency)`이 생기는 현상