---
layout: post
title:  " JUnit 예외(Exception) 테스트 작성하기 "
categories: Spring
author: goodGid
---
* content
{:toc}

## assertThat()의 한계

* JUnit 테스트에서 Data의 검증을 위해 assertThat() 메소드를 사용한다.

* 하지만 assertThat() 메소드는 Exception을 테스트하기에 적절하지 않다. 

  이 경우엔 다른 방법으로 테스트를 진행해야한다.

---

## Exception Test

* Exception을 테스트하기 좋은 방법 중 하나는

  Test 애노테이션의 **expected** 필드를 사용하는 것이다.

  사용법은 **expected**에 기대하는 예외 클래스를 넣어주기만 하면 된다.


> Example

```java
@Test(expected=NullPointerException.class)
public void NPE_Generation_Test() throws Exception {
    // Execute the code that causes the exception
    goodgid.getNumber();
}
```

---

## Reference

* 토비의 스프링 3.1 Vol.1 스프링의 이해와 원리
