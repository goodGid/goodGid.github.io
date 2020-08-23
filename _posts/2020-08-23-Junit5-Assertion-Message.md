---
layout: post
title:  " Junit5 : Assertion - 문자열 연산 비용을 고려하자 "
categories: Junit5
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 강의를 들으며 정리한 내용을 토대로 작성하였습니다.

## Goal

* 이 글에서는 Error 메시지 생성 시

  **문자열 연산 비용**을 고려한 방법에 대해 알아본다.

---

## JUnit 5 Assertion

* JUnit에서는 Assertion을 사용하여

  작성한 Test Code가 실패하면 Error 메시지를 출력시킬 수 있다.

* 그리고 여기서 *Error 메시지의 Type* 은 일반적으로 String이다.

  그러므로 Error 메시지를 만들기 위해선 **문자열 연산**이 필요하다.

  즉 **문자열 연산 비용**이 들게 된다.




---

## Usage

* Error 메시지 생성 시

  일반적으로(Common)으로 생성하는 방식과

  효율적이게 생성하는 Lambda 생성 방법에 대해 알아보자.


---

### Common

> Test Class


``` java
@Test
public void test_string(){
    int a = 1;
    assertEquals(a, 2, "Test" + "" + "Fail");
}
```

---

> Assertions

``` java
package org.junit.jupiter.api;

public static void assertEquals(int expected, int actual, String message) {
        AssertEquals.assertEquals(expected, actual, message);
}
```


* 테스트 성공 여부 상관없이 

  문자열 연산을 미리 하여 생성하여 
  
  assertEquals( )를 호출한다.

  그러므로 테스트가 성공하여도 불필요한 메시지 연산 작업이 이뤄진다.

---

### Lambda

> Test Class

``` java
@Test
public void test_lambda(){
    int a = 1;
    assertEquals(a, 2, () -> "Test" + "" + "Fail");
}
```

---

> Assertions

``` java
package org.junit.jupiter.api;

public static void assertEquals(int expected, int actual, 
                                Supplier<String> messageSupplier) {
        AssertEquals.assertEquals(expected, actual, messageSupplier);
}
```

---


> AssertEquals

``` java
static void assertEquals(int expected, int actual, 
                         Supplier<String> messageSupplier) {
    if (expected != actual) {
        AssertionUtils.failNotEqual(expected, actual, messageSupplier);
    }
}
```


---

> AssertionUtils

``` java
static void failNotEqual(Object expected, Object actual, 
                         Supplier<String> messageSupplier) {
      fail(format(expected, actual, 
                  nullSafeGet(messageSupplier)), expected, actual); // nullSafeGet() 호출
}

static String nullSafeGet(Supplier<String> messageSupplier) {
      return messageSupplier != null ? (String)messageSupplier.get() : null;
}
```



* Method 호출 순서는 다음과 같다.

```
Assertions.assertEquals( )
-> AssertEquals.assertEquals( ) 
-> AssertionUtils.failNotEqual( )
-> AssertionUtils.nullSafeGet( )
```

* lambda 방식으로 하게 되면

  문자열 연산을 **필요한 시점**에 한다.

  = nullSafeGet( )에서 생성한다.

  즉 테스트가 실패할 때만 문자열 생성 작업이 발생한다.

* 그러므로 문자열 연산 비용이 크다면 Lambda 방식을 사용하는 게 좋다.



---

## Summary

* 문자열 생성이 Application 성능에 Critical 하진 않겠지만

  그래도 개발이라는 게 효율성을 추구하는 일이기 때문에 

  조금이라도 효율적인 방법으로 Coding을 하면 좋지 않을까? 라는 생각이 든다.

---

## Reference

* [더 자바, 애플리케이션을 테스트하는 다양한 방법 : JUnit 5 Assertion](https://www.inflearn.com/course/the-java-application-test)