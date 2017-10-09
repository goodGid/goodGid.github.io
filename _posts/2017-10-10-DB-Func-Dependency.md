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

`X -> Y`로 표기한다. <br/>


{% capture images %}
    /assets/img/posts/funcDepen_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}




* 수강 테이블에서 이름, 학년, 학과는 각각 학번 속성에 `함수적 종속`이다.

---

|    |
|:-------:|
|  학번 -> 이름  |
|  학번 -> 학년  |
|  학번 -> 학과  |
| or |
|  학번 -> 이름, 학년, 학과  |
| |

---


* `X -> Y`의 관계를 갖는 속성 `X`와 `Y`에서 <br/> `X`를 `결정자(Determinant)`라 하고, `Y`를 `종속자(Dependent)`라고 한다. <br/><br/>

---

## 함수적 종속 다이어그램


{% capture images %}
    /assets/img/posts/funcDepen_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---

|    |
|:-------:|
|  학번, 과목번호 -> 성적  |
|  학번 -> 학년  |
| |


---


{% capture images %}
    /assets/img/posts/funcDepen_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}



---

* 수강 테이블의 속성 중 `성적`은 (학번, 과목번호)에 `완전 함수적 종속`이라 한다.

* 수강 테이블의 속성 중 `학년`은 (학번, 과목번호)에 `완전 함수적 종속`이 아니므로 `부분 함수적 종속`이라 한다.
 