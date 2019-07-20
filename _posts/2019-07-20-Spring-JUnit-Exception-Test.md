---
layout: post
title:  " JUnit의 예외(Exception) 테스트 작성하기 "
categories: Spring
tags: Spring
author: goodGid
---
* content
{:toc}

## Exception 발생

* JUnit 테스트에서 Data의 검증을 위해 assertThat() 메소드를 사용한다.

* 하지만 assertThat() 메소드로 Data가 아닌 Exception이 발생했을 경우를 테스트하는 것은 불가능하다.

* 이 경우엔 다른 방법으로 테스트를 진행해야한다.

* 바로 Test 애노테이션의 **expected** 엘리먼트이다.

* **expected**는 테스트 메소드 실행 중에 기대하는 예외 클래스를 넣어주면 된다.


```java
@Test(expected=NullPointerException.class)
public void NPE_Generation_Test() throws Exception {
    // Execute the code that causes the exception
    goodgid.getNumber();
}
```









---

## 참고

* 토비의 스프링 3.1 Vol.1 스프링의 이해와 원리
