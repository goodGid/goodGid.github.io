---
layout: post
title:  " [Clean Code] 의미 있는 이름 (Meaningful name) : 클래스 이름 & 메소드 이름 & 생성자 중복 정의 "
categories: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 클래스 이름

* 클래스 이름과 객체 이름은

* **명사**나 **명사구**가 적합하다.

* 동사는 사용하지 않는다.

<br>

* 좋은 예 

* ex) Customer, WikiPage, Account, AddressParser 

* 나쁜 예

* ex) Manager, Processor, Data, Info









## 메소드 이름

* 메소드 이름은 

* **동사**나 **동사구**가 적합하다.

<br>

* 좋은 예

* ex) postPayment, deletePage, save

<br>

* 접근자, 변경자, 조건자는 javabean 표준에 따라 

* 값 앞에 get, set, is를 붙힌다.

``` java
string name = employee.getName();
customer.setName("goodGid");
if (paycheck.isPosted) 
```

## 생성자 중복 정의 

* 생서자를 중복정의할 때는

* **정적 팩토리 메소드**를 사용한다.

* 메소드는 인수를 설명하는 이름을 사용한다.

<br>

* 좋은 예

``` java
Complex fulcrumPoint = Complex.FromRealNumber(23.0);
```

* 나쁜 예

``` java
Complex fulcrumPoint = new Complex(23.0);
```


---

## Reference

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)