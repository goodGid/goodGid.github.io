---
layout: post
title:  " [Clean Code] 함수 (Function) : 동사와 키워드 "
categories: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 동사와 키워드

* 함수의 의도나 

* 인수의 순서와 의도를 제대로 표현하려면

* **함수 이름**을 좋게 Naming할 필요가 있다.






## 단항 함수

* 단항 함수는 함수와 인수가 

* **동사/명사** 쌍을 이뤄야 한다.

<br>

* 예를 들어

* write(name)은 누구나 바로 이해한다.

* ==> name을 write한다.

<br>

* 좀 더 명확하게 수정도 가능하다.

* write(name) -> writeField(name)

* ==> Field에 name을 write한다.



## 이항 함수

* 함수 이름에 키워드를 추가한다.

<br>

* 예를 들어 

* 함수에서 인수의 순서가 중요하다면

* 함수 이름에 인수 이름을 넣는다.

<br>

* assertEquals(expected, actual) 보다

* assertExpectedEqualsActual(expected, actual)이 더 좋다.

<br>

* 함수명으로 인해

* 인수의 순서를 기억할 필요는가 없어진다.

---

## 참고

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)