---
layout: post
title:  " 리플렉션(Reflection) : 클래스 생성자 접근 "
categories: Java
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 클래스 생성자 접근

* 이번 글에서는 

* 클래스에 생성자에 접근하는 방법에 대해 알아본다.

## 생성자 접근

* 클래스를 접근하기 위해서

* 해당 클래스의 생성자를 호출한다.

<br>

1. 생성자의 Parameter가 **있**는 경우

2. 생성자의 Parameter가 **없**는 경우









<br>


> Book.class

* 2가지 생성자를 갖는 Book 클래스를 생성한다.

```java
public class Book {

    private String b;

    public Book() {
    }

    public Book(String b) {
        b = b;
    }
}
```

<br>

### Access constructor with parameters

* String 값을 받는 생성자에 접근해보자.

``` java
public Book(String b) {
    ...
}
```

<br>

``` java
public static void clazz() throws ClassNotFoundException, 
                                NoSuchMethodException, IllegalAccessException,
                                InvocationTargetException, InstantiationException {
Class<?> bookClass = Class.forName("goodgid.gidhub.Book"); // Step 1
Constructor<?> constructors = bookClass.getConstructor(String.class); // Step 2
Book book = (Book) constructors.newInstance("B"); // Step 3
```

<br>

> Step 1.

* Book 클래스에 접근한다.


> Step 2.

* Book 클래스에는 2가지 생성자가 있고

* 우리가 원하는 생성자의 Sginature는

* String Type을 Parameter로 받는 생성자이기 때문에

* .getConstructor()의 Paramter 값으로 **String.class**를 넘겨준다.

``` java
bookClass.getConstructor(String.class);
```

> Step 3

* Step 1~2를 통해 원하는 생성자에 접근하였다.

* 이제 해당 생성자를 이용하여 Instatnce를 생성한다.

``` java
constructors.newInstance();
```

* 이 경우 생성자는 String 값을 필요로 하기 때문에 

* 적절한 String 값을 넘겨준다.

``` java
constructors.newInstance("B");
```

<br>

### Access constructor without parameters

``` java
public static void clazz() throws ClassNotFoundException, 
                                NoSuchMethodException, IllegalAccessException,
                                InvocationTargetException, InstantiationException {
Class<?> bookClass = Class.forName("goodgid.gidhub.Book"); // Step 1
Constructor<?> constructors = bookClass.getConstructor(null); // Step 2
Book book = (Book) constructors.newInstance(); // Step 3
```

<br>

> Step 1.

* Book 클래스에 접근한다.

> Step 2.

* Book 클래스에는 2가지 생성자가 있고

* 우리가 원하는 생성자의 Signature는

* 어떤 값도 필요로 하지 않기 때문에

* .getConstructor()의 Paramter 값으로 **null**을 넘겨준다.

``` java
bookClass.getConstructor(null);
```

> Step 3

* Step 1~2를 통해 원하는 생성자에 접근하였다.

* 이제 해당 생성자를 이용하여 Instatnce를 생성한다.

* 이 경우 생성자는 어떤한 값도 필요하지 않기 때문에 

* Parameter값은 필요없다.

``` java
constructors.newInstance();
```

<br>


## Summary

* 클래스 생성자에 접근하는 방법에 대해 알아봤다.

---

* 이 글과 관련해서 다음 글들도 함께 보길 추천한다.

1. [리플렉션(Reflection) : 클래스 정보 수정]({{site.url}}/Java-Reflection-Modify-Class-Information/)

1. [리플렉션(Reflection) : 클래스 정보 조회]({{site.url}}/Java-Reflection-Class-Info-Query/)

---

## 참고

* [더 자바, 코드를 조작하는 다양한 방법](https://www.inflearn.com/course/the-java-code-manipulation#)
