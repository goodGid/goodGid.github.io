---
layout: post
title:  " ~(틸트)와 ^(캐럿) "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

* Git에서는 특정 참조(일반적으로 브랜치의 HEAD)를 기준으로 **상대적인 위치**에 있는 커밋을 식별하는 매커니즘이 있다.










---

## HEAD

* 가장 최근의 커밋

* 다음 커밋의 부모

---

## ~ (물결기호. 틸트)

* 상위 차수를 선택할 때 사용된다.

---

## ^ (삽입기호. 캐럿)

* 동일 차수 내에서 각기 다른 상위 커밋을 선택할 때 사용된다.

* ^ 현재 부모의 커밋 

* ^2 : 현재 커밋의 두번째 부모

* ^^ = ~2 : 현재 커밋의 할아버지 


---


![](/assets/img/posts/git_tilt_and_Caret_1.png)

![](/assets/img/posts/git_tilt_and_Caret_2.png)



---

## 참고

* [Git ~ 및 ^ (상대적 커밋 이름)](http://donggov.tistory.com/43)
