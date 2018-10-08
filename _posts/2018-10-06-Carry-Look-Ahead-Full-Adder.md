---
layout: post
title:  " 자리올림수 예측 가산기(Carry look Ahead Full Adder) "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## 자리올림수 예측 가산기(carry-lookahead adder, CLA)

* 디지털 논리에서 사용되는 가산기의 한 종류이다. 

* **CLA**는 간단하면서도 속도가 느린 **리플 자리올림수 가산기**와 비교할 수 있다. 

* **리플 자리올림수 가산기**에서 가산기의 각 비트는 아래 비트로부터 **자리올림수** 출력을 기다려야 하지만 <br> CLA에서는 모든 자리올림수 출력은 특별한 예측 논리에 따라 한 번에 계산된다. 











* 그 결과 최상위 비트로 올라가는 **리플** 출력을 기다려야 하는 대신에, 전체 결과는 현저하게 적은 지연으로 계산할 수 있다.

> Q. Carry Look Ahead Adder를 이용하여 덧셈 연산의 속도를 높일 수 있다. (O / X) <br> A. O

![](/assets/img/posts/carry_look_ahead_full_adder_1.png)

---

## 참고

* [자리올림수 예측 가산기](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%A6%AC%EC%98%AC%EB%A6%BC%EC%88%98_%EC%98%88%EC%B8%A1_%EA%B0%80%EC%82%B0%EA%B8%B0)