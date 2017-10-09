---
layout: post
title:  "DataBase :: Functional Dependency"
date:   2017-10-10
excerpt: "Functional Dependency 개념"
cate : "post"
tag:
- DB
---

## Concept

어떤 테이블 R에서 `X`와 `Y`를 각각 R의 속성 집합의 부분 집합이라 하자.

속성 `X`의 값 각각에 대해 시간에 관계없이 항상 속성 `Y`의 값이 오직 하나만 연관되어 있을 때

`Y`는 `X`에 `함수적 종속` 또는 `X`가 `Y`를 함수적으로 결정한다고 하고,

`X -> Y`로 표기한다.


{% capture images %}
    /assets/img/posts/funcDepen_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}




* <학생> 테이블에서 이름, 학년, 학과는 각각 학번 속성에 `함수적 종속`이다.

---

|  학번 -> 이름  |
|  학번 -> 학년  |
|  학번 -> 학과  |
|:-------:|
| |
|=====

---

|  학번 -> 이름  |
|  학번 -> 학년  |
|  학번 -> 학과  |
|:-------:|
|=====

---

<center> or </center>

---


|:-------:|
|  학번 -> 이름, 학년, 학과  |
|=====



---

|         |
|:-------:|
|  학번 -> 이름, 학년, 학과  |
|=====

---

|         |
|  학번 -> 이름, 학년, 학과  |
|=====

---

|  학번 -> 이름, 학년, 학과  |
|:-------:|
|=====


---


|  학번 -> 이름, 학년, 학과  |
|=====


---


* `X -> Y`의 관계를 갖는 속성 `X`와 `Y`에서 `X`를 `결정자(Determinant)`라 하고, `Y`를 `종속자(Dependent)`라고 한다.

