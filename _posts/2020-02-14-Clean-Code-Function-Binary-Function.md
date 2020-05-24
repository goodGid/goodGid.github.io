---
layout: post
title:  " [Clean Code] 함수 (Function) : 이항 함수 "
categories: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 이항 함수

* 이항 함수란 인수가 2개인 함수이다.








## Disadvantages

### 이해도

* 인수가 2개인 함수는 

* 인수가 1개인 함수보다 이해하기 어렵다.

<br>

* writeField(name)은 

* writeField(outputStream, name)보다 이해하기 쉽다.

<br>

* 후자는 outputStream의 용도에 대해 

* 생각해야할 시간이 필요하기 때문이다. 

<br>

#### Refacotring

* 3가지 방법으로 Refactoring을 시도해본다.

> 1st

* writeField 메서드를 

* outputStream 클래스 구성원으로 만들어 

* outputStream.writeField(name)으로 호출한다.

<br>

> 2st

* ouputStream을 

* 현재 클래스 구성원 변수로 만들어

* 인수로 넘기지 않는다.

<br>

> 3st

* FieldWriter라는 새 클래스를 만들어

* 구성자에서 outputStream을 받고

* write 메서드를 구현한다.


### 인위적 인지

* assertEquals(expected, actual)를 예로 들어보자.

* expected가 어느 위치에 있어야하는지 헷갈릴 수 있다.

<br>

* 그로인해 

* expected 자리에 actual을 집어넣는 실수를 할 수 있다.

<br>

* 그렇기 때문에 

* **인위적**으로 expected 다음에 actual이 온다는 순서를 인지해야한다.

#### Refacotring

* 만약 메소드명을 다음과 같이 수정한다면 

* 인수의 순서를 기억할 필요는 없어진다.

* assertExpectedEqualsActual(expected, actual)


---

## 참고

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)