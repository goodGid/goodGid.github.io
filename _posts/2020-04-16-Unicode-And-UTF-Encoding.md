---
layout: post
title:  " 유니코드와 UTF-8 / UTF-16 "
categories: Technology
author: goodGid
---
* content
{:toc}

## 유니코드란?

* 컴퓨터는 0, 1 숫자만 이해한다.

* 사람은 매우 다양한 언어를 사용한다.

* 그러므로 컴퓨터와 사람이 대화하기 위해선 중개자가 필요하다.

  그 중개자 역할을 하는 게 **유니코드**이다.

---

* 유니코드는 다음과 같이 중개를 한다.

  사람이 사용하는 모든 언어를 bit로 표현된 숫자로 매핑 해놓는다.

  그 방법으로 모든 문자에 Index를 지정시킨다.

  참고로 Index를 **Code Point** 혹은 **Code Unit**라 부르기도 한다.

```
'A'라는 글자는 0x0041이라는 Index를 가진다.
'a'라는 글자는 0x0061이라는 Index를 가진다.
'가 '라는 글자는 0xac00이라는 Index를 가진다.
```

* 더 많은 글자와 Index를 보려면 [Code Charts](http://www.unicode.org/charts/)를 참고하자.




---

* 여기서 말하는 언어는 

  한글이라면 가, 나, 다, 라 처럼

  영어라면 a, b, c, d, e 처럼

  언어를 구성하는 가장 작은 단위들을 뜻한다. 

---

* 하나의 단어를 표현하기 위해선

  작은 단위들을 조합하면 된다.

```
기 : 1
드 : 2
```

* 위와 같이 매핑이 되어있는 상황에서

  '기드'라는 단어를 표현하고 싶다면

  '12'로 작성하여 컴퓨터에 전달하면 된다.


---


## 인코딩

* 유니코드라는 개념을 통해 

  사람과 컴퓨터 간의 대화를 위한 준비가 되었음을 알았다.

* 하지만 누군가가 사람의 언어를 컴퓨터의 언어로 변경을 해줘야 하지 않을까?

  그런 역할을 하는 게 바로 UTF 방식이다.

* 좀 더 정확히 말하자면 

  유니코드라는 문자 집합을

  UTF라는 문자열 인코딩 규칙으로
  
  문자를 코드로 표현한다고 말할 수 있다.

* 즉 UTF는 유니코드가 매핑해놓은 표를 보면서

  사람의 언어 <-> 기계어로 변경을 해주는 것이다.

  그리고 이 과정을 **인코딩**한다고 표현한다.

---

## UTF란?

* UTF는 유니코드 문자를 인코딩하는 방식을 나타낸다.

* UTF는 몇 **bit**를 사용하여 Index를 표현할 것인가를 뜻한다.

* UTF-8은 **8bit**를 사용하여 1개의 Index를 표현한다.

* UTF-16은 **16bit**를 사용하여 1개의 Index를 표현한다.
  
* UTF-32는 **32bit**를 사용하여 1개의 Index를 표현한다.

---

## UTF-8

* UTF-8의 **코드 단위**는 **8bit**이다.

* UTF-8은 인터넷에 대부분에서 기본적으로 사용되는 인코딩 방식이다.

* UTF-8은 유니코드를 위한 **가변 길이 문자 인코딩** 방식 중 하나이다. 

* UTF-8 인코딩은 

  유니코드 한 문자를 나타내기 위해 **1byte~4byte**까지를 사용한다.

  사실은 6byte까지 사용하지만

  일반적인 문자는 3byte 내로 처리되며
  
  4byte 영역에는 이모티콘 같은 문자가 존재한다.

  사실상 4byte 이상의 문자를 사용하는 경우가 없다 보니

  1 ~ 4byte를 사용한다고 말한다.

* 영문 byte 수 : 1byte

  한글 byte 수 : 3byte

* 실제 예시는 나무 위키에 UTF-8 설명이 잘되어 있어서 [링크](https://namu.wiki/w/UTF-8#s-3)로 대체한다.

> Q. 한글 byte는 왜 3byte를 사용할까?

* 위에서 유니코드는
  
  사람이 사용하는 모든 언어를 bit로 표현된 숫자로 매핑 해놓는다. 라고 말했다.

  여기서 한글을 3byte로 대응해놓았기 때문에 3byte를 사용하는 것이다.



---

## UTF-16

* UTF-16의 **코드 단위**는 **16bit**이다.

* 주로 사용되는 **기본 다국어 평면(BMP, Basic multilingual plane)**에 속하는 문자들은 

  그대로 **16bit**값으로 인코딩되고 
  
  그 이상의 문자는 특별히 정해진 방식으로 32bit로 인코딩된다.

* UTF-16 인코딩은 유니코드 한 문자를 나타내기 위해 **2byte~4byte**까지를 사용한다.

* 영문 byte 수 : 2byte

  한글 byte 수 : 2byte

---

## UTF-8 vs UTF-16

* UTF-8과 UTF-16 인코딩의 차이는 다음과 같다.

> 문자 하나를 표현하기 위한 필요 bit의 크기

* UTF-8 : 8bit 필요

  UTF-16 : 16bit 필요

> 문자 하나를 표현하기 위한 byte 범위의 차이

* UTF-8 : 1byte~4byte 필요

  UTF-16 : 2byte~4byte 필요


---

## Reference

* [UTF-8, UTF-16 차이](http://pickykang.tistory.com/13)

* [UTF-16](https://ko.wikipedia.org/wiki/UTF-16)

* [UTF-8](https://ko.wikipedia.org/wiki/UTF-8)

* [[문자인코딩] 유니코드, UTF-8, UTF-16, UTF-32 간단 정리.](http://blog.ggaman.com/896)

* [문자열 인코딩 (유니코드/UTF8, UTF16, ASCII)](http://brownbears.tistory.com/167)

* [문자열 인코딩 개념 정리(ASCII/ANSI/EUC-KR/CP949/UTF-8/UNICODE)](http://onlywis.tistory.com/2)

* [UTF-8](https://namu.wiki/w/UTF-8)