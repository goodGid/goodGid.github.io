---
layout: post
title:  " 리플렉션(Reflection) : 클래스 정보 조회 "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 리플렉션 (Reflection)

* 리플렉션의 핵심은 Class<T> API를 사용하는 것이다.


## 접근 방법

### Type

* 클래스 로더 시점에

* 모든 Class를 로딩 한 후

* Class<T>의 인스턴스를 생성하여 

* **힙 영역**에 저장한다.

* ref : [로딩 (Loading)]({{site.url}}/Java-Class-Loader/#로딩-loading)


``` java
// Type 사용
Class<Book> bookClass = Book.class;
```


<br>

> Access

* Code Level에서는 

* "타입.class"로 접근이 가능하다.

### Instance

* 모든 인스턴스는 getlass() 메소드를 가지고 있다. 


``` java
// 인스턴스 사용
Book book = new Book();
```


<br>

> Access

* Code Level에서는 

* "인스턴스.getClass()"로 접근이 가능하다.



### FQCN

* FQCN Path로 클래스를 읽어올 수 있다.

* 클래스 패스에 해당 클래스가 없으면 ClassNotFoundException 발생

* ref : [FQCN 개념]({{site.url}}/Java-Class-Loader/#로딩-loading)

``` java
// FQCN 방법
Class<?> FQCN = Class.forName("goodgid.gidhub.클래스명");
```

<br>

> Access

* Code Level에서는 

* Class.forName("FQCN")로 접근이 가능하다.




## Example

### Domain

> Book

``` java
public class Book {

    private static String A = "A";

    private static final String B = "B";

    private String c;

    public String d;

    protected String e;

    public Book() {

    }

    public Book(String c, String d, String e) {
        this.c = c;
        this.d = d;
        this.e = e;
    }

    private void f() {
        System.out.println("F");
    }

    public void g() {
        System.out.println("g");
    }

    public int h() {
        return 100;
    }
}
```

> MyBook

``` java
public class MyBook extends Book implements MyInterface{
}
```

> MyInterface

``` java
public interface MyInterface {
}
```





### Sample


> getFields()

``` java
Arrays.stream(bookClass.getFields()).forEach(System.out::println);
// Output
public java.lang.String goodgid.gidhub.Book.d
```

* 출력이 1개만 되었다.

* 그 이유는 다음과 같다.

* getFields()의 Docs Comment를 보면 

* public fields만 접근이 가능하기 때문이다.

```
/**
* Returns an array containing {@code Field} objects reflecting all
* the accessible public fields of the class or interface represented by
* this {@code Class} object.
*/
```

* 모든 field를 보고 싶다면

* getDeclaredFields() Method를 사용해야한다.


<br>

> getDeclaredFields()

``` java
Arrays.stream(bookClass.getDeclaredFields()).forEach(System.out::println);
// Output
private static java.lang.String goodgid.gidhub.Book.A
private static final java.lang.String goodgid.gidhub.Book.B
private java.lang.String goodgid.gidhub.Book.c
public java.lang.String goodgid.gidhub.Book.d
protected java.lang.String goodgid.gidhub.Book.e
```

<br>

> getDeclaredFields() -> setAccessible()

``` java
Class<? extends Book> aClass = book.getClass();
Arrays.stream(bookClass.getDeclaredFields()).forEach(f -> {
    try {
        f.setAccessible(true);
        System.out.printf("%s : %s\n", f, f.get(book));
    } catch (IllegalAccessException e) {
        e.printStackTrace();
    }
});

// Output
private static java.lang.String goodgid.gidhub.Book.A : A
private static final java.lang.String goodgid.gidhub.Book.B : B
private java.lang.String goodgid.gidhub.Book.c : null
public java.lang.String goodgid.gidhub.Book.d : null
protected java.lang.String goodgid.gidhub.Book.e : null
```

* setAccessible(true) 설정이 없으면 

* private에 접근을 할 수 없어 Error가 발생한다.

``` 
java.lang.IllegalAccessException: 
Class goodgid.gidhub.GidhubApplication can not access a member of class goodgid.gidhub.Book with modifiers "private static"
```

<br>

> getDeclaredMethods()

``` java
Arrays.stream(bookClass.getDeclaredMethods()).forEach(System.out::println);
// Output
private void goodgid.gidhub.Book.f()
public void goodgid.gidhub.Book.g()
public int goodgid.gidhub.Book.h()
```

<br>

> getMethods()

``` java
Arrays.stream(bookClass.getMethods()).forEach(System.out::println);

// Output
public void goodgid.gidhub.Book.g()
public int goodgid.gidhub.Book.h()

// Output : Methods of Object.class
public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
public final void java.lang.Object.wait() throws java.lang.InterruptedException
public boolean java.lang.Object.equals(java.lang.Object)
public java.lang.String java.lang.Object.toString()
public native int java.lang.Object.hashCode()
public final native java.lang.Class java.lang.Object.getClass()
public final native void java.lang.Object.notify()
public final native void java.lang.Object.notifyAll()
```

* 모든 Class가 Default로 Extend하는 

* Object의 Method들을 확인할 수 있다.

<br>

> getConstructors()

``` java
Arrays.stream(bookClass.getConstructors()).forEach(System.out::println);
// Output
public goodgid.gidhub.Book()
public goodgid.gidhub.Book(java.lang.String,java.lang.String,java.lang.String)
```

## Summary


---

## 참고

* [더 자바, 코드를 조작하는 다양한 방법](https://www.inflearn.com/course/the-java-code-manipulation#)
