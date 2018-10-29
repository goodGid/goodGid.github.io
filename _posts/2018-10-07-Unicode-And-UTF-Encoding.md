---
layout: post
title:  " 유니코드와 UTF-8 / UTF-16 "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## 유니코드란?

* 전 세계에서 사용되는 **문자 집합**이다.

* 유니코드는 모든 문자에 Index를 지정하는 것이다. <small>그 이상도 아니고, 그 이하도 아니다.</small>

* 이 Index를 **Code Point** 혹은 **Code Unit**이라고 부르는데 일반적으로 Index라고 생각해도 무방하다.

```
'A'라는 글자는 0x0041 이라는 Index를 가진다.
'a'라는 글자는 0x0061 이라는 Index를 가진다.
'가'라는 글자는 0xac00 이라는 Index를 가진다.
```










* 더 많은 글자와 Index를 보려면 [Code Charts](http://www.unicode.org/charts/)를 참고하자.

* **문자열**을 **숫자**로 **표현**하기 위하여 문자 하나와 숫자 하나를 각각 **매핑(=연결)**한 것이 바로 **유니코드**이다. 

* 예를 들어 A는 U+0041에 매핑되어 있고 '가'는 U+AC00에 매핑되어 있다. 

* 유니코드를 인코딩하는 방법에는 **UTF-8**, **UTF-16** 등등 여러 방법이 존재한다. 


---

## ANSI란?

* ANSI(American National Standard Institute의 약자)는 8bit로 구성되어 있으며 **256개**의 **문자**를 **표현**할 수 있다.

* ANSI는 **ASCII의 확장판**으로 이해하면 된다. 

* 그 이유는 ASCII에서 **1bit**를 더 사용한 것이기 때문이다.

* ANSI의 **앞 7bit**는 **ASCII**와 **동일**하고 **뒤**에 **1bit**를 **이용**하여 **다른 언어**의 **문자**를 **표현**한다.

* 그런데 **새로 추가 된 128개 문자**로는 **모든 언어**의 **문자**를 **표현**할 수 없다.

* 그래서 생긴 개념이 **Code Page**이다.

* 각 **언어별**로 **Code 값**을 주고 **Code마다** **다른 문자열 표**를 **의미**하도록 약속을 했다.

* 쉽게 생각하면 아래와 같이 설명할 수 있다.

* **ANSI = ASCII(7bit) + CodePage(1bit)**

* 이러한 원리를 고려하면 다음과 같이 **정리**할 수 있다.

1. 영어만 사용하거나 ASCII를 사용할 경우 세계 어디에서나 사용에 문제가 없다.

2. 영어 외 다른 언어를 사용할 경우 ANSI는 **Code Page**를 **동일**하게 맞춰야 한다.

* Code Page가 다를 경우 의도와 다른 결과가 나올 수 있다.

---

## UTF란?

* UTF는 몇 **bit 단위**로 사용해서 Index를 표현할 것인가를 뜻한다.

* UTF-8은 **8bit**씩 Index를 표현 <br> UTF-16은 **16bit**씩 Index를 표현 <br> UTF-32는 **32bit**씩 Index를 표현한다는 뜻을 갖고 있다.

---

## UTF-8

* UTF-8은 **Universal Coded Character Set + Transformation Format – 8-bit**의 약자이다. 

* UTF-8은 유니코드를 위한 **가변 길이 문자 인코딩** 방식 중 하나이다. 

* UTF-8의 **코드 단위**는 **8bit**입니다.

* UTF-8 인코딩은 유니코드 한 문자를 나타내기 위해 **1byte ~ 4byte**까지를 사용한다.

* UTF-8은 인터넷에 교환되는 대부분의 파일에 사용된다.

* 영문 byte 수 : 1byte <br> 한글 byte 수 : 3byte

---

## UTF-16

* UTF-16은 유니코드 문자 인코딩 방식의 하나이다. 

* 주로 사용되는 **기본 다국어 평면(BMP, Basic multilingual plane)**에 속하는 문자들은 <br> 그대로 **16bit**값으로 인코딩이 되고 그 이상의 문자는 특별히 정해진 방식으로 32bit로 인코딩이 된다.

* UTF-16의 **코드 단위**는 **16bit**이다.

* UTF-16 인코딩은 유니코드 한 문자를 나타내기 위해 **2byte ~ 4byte**까지를 사용한다.

* UTF-16은 윈도우 응용프로그램, 자바스크립트 등의 작동시 사용된다.

* 영문 byte 수 : 2byte <br> 한글 byte 수 : 2byte

---

## UTF-8 vs UTF-16

* UTF-8과 UTF-16의 기본 차이는 문자 하나를 표현할 때 사용할 최소 byte 크기이다.

* UTF-8로 문자를 표현할 때 1 ~ 4byte가 필요하다. <br> 하지만 UTF-16은 2 ~ 4byte가 필요하다.

* 두 Encoding 방식의 큰 차이는 최소 8bit가 필요하냐 16bit가 필요하냐에 따라 다른 것이다. 

* **최적의 상황(저쟝, 통신 용량을 아껴야할 때)**이 필요하다면 <br> 어떤 CodePoint를 주로 사용하냐에 따라 UTF-8 또는 UTF-16을 선택하는 기준이 달라질 것이다.

![](/assets/img/posts/unicode_and_utf_encoding_1.png)


---

## 참고

* [UTF-8, UTF-16 차이](http://pickykang.tistory.com/13)

* [UTF-16](https://ko.wikipedia.org/wiki/UTF-16)

* [UTF-8](https://ko.wikipedia.org/wiki/UTF-8)

* [[문자인코딩] 유니코드, UTF-8, UTF-16, UTF-32 간단 정리.](http://blog.ggaman.com/896)

* [문자열 인코딩 (유니코드/UTF8, UTF16, ASCII)](http://brownbears.tistory.com/167)

* [문자열 인코딩 개념 정리(ASCII/ANSI/EUC-KR/CP949/UTF-8/UNICODE)](http://onlywis.tistory.com/2)