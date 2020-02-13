---
layout: post
title:  " [Clean Code] 의미 있는 이름 (Meaningful name) : 의미 있는 맥락을 추가하라 "
categories: CleanCode
tags: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 의미 있는 맥락 추가

* 대다수의 이름은 분명하지 못하다.

* 그럴 경우엔 **접두어**를 붙혀보자.







## Example

* 예를 들어보자.

``` java
firstName, lastName, street, houseNumber, city, state, zipcode
```

* 위와 같은 변수가 선언이 되어 있다면

* 위 변수들의 사용처는 

* 주소와 관계 되어 있음을 쉽게 파악할 수 있다.

> But

* state 변수 1개만 본다면

* 해당 변수가 

* 주소를 의미하는 변수들 중 하나라는 것을

* 파악하는건 쉽지 않다.



### Refactoring

* 주소를 나타내는 **addr**라는 접두어를 추가해보자.

* state -> addrState로 변경하면

* 맥락이 좀 더 분명해진다.

<br>

> One More Step

* 접두어를 사용하는 방법도 좋지만

* 가능하다면 Address라는 클래스를 생성하면 

* 보다 맥락이 분명해진다.


---

## 참고

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)