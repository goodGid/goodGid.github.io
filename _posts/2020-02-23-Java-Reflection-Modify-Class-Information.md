---
layout: post
title:  " 리플렉션(Reflection) : 클래스 정보 수정 "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 클래스 정보 수정

* 이번 글에서는 

* 클래스에 접근하여 정보를 **수정**하는 방법에 대해 알아본다.











> Book

```java
public class Book {

    // Case 1
    public static String A = "A";

    // Case 2
    private String b;

    // Case 3
    private void c() {
        System.out.println("C");
    }

    // Case 4
    public int sum(int left, int right) {
        return left + right;
    }

    public Book() {

    }
}
```

## Example

### Case 1 : public static String A = "A"

``` java
public static void a() throws ClassNotFoundException, 
                                NoSuchMethodException, IllegalAccessException,
                                InvocationTargetException, InstantiationException, 
                                NoSuchFieldException {
    // Access Constructor
    Class<?> bookClass = Class.forName("goodgid.gidhub.Book");
    Constructor<?> constructors = bookClass.getConstructor(null);
    Book book = (Book) constructors.newInstance();

    // Before Modify Class Information
    Field staticField = Book.class.getDeclaredField("A");
    Object o = staticField.get(null);
    System.out.println(o);

    // After Modify Class Information
    staticField.set(null, "A by Reflection");
    o = staticField.get(null);
    System.out.println(o);
}

---

// Output
A
A by Reflection
```

<br>

> Comment

* A 필드는 static하기 때문에 

* 특정 Instance에 종속적이지 않다. 

---

* 그렇기 때문에 .get() 메소드에

* Instance를 넘겨줄 필요가 없다.

``` java
staticField.get(null);
```

---

* 만약 static 하지 않다면

* instatnce를 넘겨줘야한다.

``` java
staticField.get(book);
```

---

* 값을 변경하는 방법은

* set 메서드를 사용한다.

* set 메서드의 Signature는 다음과 같다.

```
- 1st Parameter에는 Instatnce를 넘긴다.
- 2st 이후 Parameter에는 변경할 값을 넘긴다.
```

``` java
// 1st Parrameter : null 
// --> A필드는 static 하기 때문에 instatnce가 필요없다.
staticField.set(null, "A by Reflection");
```


<br>


### Case 2 : private String b

``` java
public static void b() throws ClassNotFoundException, 
                                NoSuchMethodException, IllegalAccessException,
                                InvocationTargetException, InstantiationException, 
                                NoSuchFieldException {
    // Access Constructor                    
    Class<?> bookClass = Class.forName("goodgid.gidhub.Book");
    Constructor<?> constructors = bookClass.getConstructor(null);
    Book book = (Book) constructors.newInstance();

    // Access private field
    Field instanceField = Book.class.getDeclaredField("b");
    instanceField.setAccessible(true);

    // Before Modify Class Information
    Object o1 = instanceField.get(book);
    System.out.println(o1);

    // After Modify Class Information
    instanceField.set(book, "B by Reflection");
    o1 = instanceField.get(book);
    System.out.println(o1);
}

---

// Output
B
B by Reflection
```

<br>

> Comment

* private 필드에 접근하는 것이기 때문에

* Accessible을 true 해줘야한다.

``` java
instanceField.setAccessible(true);
```

---

* 'b' 변수는 static 하지 않기 때문에

* 특정 Instance에 종속적이다.

* 그렇기 때문에 

* 필드 정보를 가져오기 위해서는

* Instance가 필요하다.

``` java
instanceField.get(book);
```

---

* 'b' 변수는 static 하지 않기 때문에

* **.set()** 메소드를 사용하여 값을 변경해주기 위해선

* 1st Parameter에 Instance를 반드시 넘겨줘야한다.

* 2st Parameter로는 변경할 값을 넘겨준다.

``` java
instanceField.set(book, "B by Reflection");
```




<br>


### Case 3 : private void c()


``` java
public static void c() throws ClassNotFoundException, 
                                NoSuchMethodException, IllegalAccessException,
                                InvocationTargetException, InstantiationException, NoSuchFieldException {
    // Access Constructor                    
    Class<?> bookClass = Class.forName("goodgid.gidhub.Book");
    Constructor<?> constructors = bookClass.getConstructor(null);
    Book book = (Book) constructors.newInstance();

    // Access private Method
    Method m = Book.class.getDeclaredMethod("c");
    m.setAccessible(true);

    // Method Invoke
    m.invoke(book);
}

---

// Output
C
```

<br>

> Comment

* 'c' 메서드의 접근 제어자는 private이기 때문에 

* Accessible 값을 true로 설정해줘야한다.

---

* 'c' 메서드는 static 하지 않기 때문에

* 메서드를 호출하기 위해서 

* Instance를 넘겨준다.

``` java
m.invoke(book);
```

<br>

### Case 4 : public int sum(int left, int right)


``` java
public static void sum() throws NoSuchMethodException, 
                                ClassNotFoundException, IllegalAccessException,
                                InvocationTargetException, InstantiationException {
    // Access Constructor
    Class<?> bookClass = Class.forName("goodgid.gidhub.Book");
    Constructor<?> constructors = bookClass.getConstructor(null);
    Book book = (Book) constructors.newInstance();

    // Access Method
    Method d = Book.class.getDeclaredMethod("sum", int.class, int.class);

    // Method Invoke
    int sum = (int) d.invoke(book, 1, 2);
    System.out.println(sum);
}

---

// Output
3
```

<br>

> Comment

* 'sum' 메서드의 접근 제어자는

* public이기 때문에

* Accessible의 값을 따로 설정해줄 필요가 없다.

---

* Book 클래스에서 sum 메서드를 갖고온다.

* 이 때 sum 메서드의 Signature는 2개의 int를 받기 때문에

* 해당 Type까지 정확하게 명시를 해줘야한다.

``` java
// Method Name
// Method Signature Type
Book.class.getDeclaredMethod("sum", int.class, int.class);
```


## Summary

* 다양한 Type의 필드 & 메소드에 접근하여 

* 값을 변경하는 방법에 대해 알아봤다.

---

* 이 글과 관련해서 다음 글들도 함께 보길 추천한다.

1. [리플렉션(Reflection) : 클래스 정보 조회]({{site.url}}/Java-Reflection-Class-Info-Query/)

1. [리플렉션(Reflection) : 클래스 생성자 접근]({{site.url}}/Java-Reflection-Access-Class-Constructor/)



## 참고

* [더 자바, 코드를 조작하는 다양한 방법](https://www.inflearn.com/course/the-java-code-manipulation#)
