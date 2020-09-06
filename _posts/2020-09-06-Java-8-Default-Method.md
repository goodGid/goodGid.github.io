---
layout: post
title:  " Java 8 디폴트 메서드(Default Method) : 다이아몬드 문제(=다중 상속) 해결하기 "
categories: Java
author: goodGid
---
* content
{:toc}

## Prologue

* Default Method에 대한 자세한 개념은 다른 글을 참고하자.

* 이 글에서는 Default Method로 인해 발생할 수 있는

  다이아몬드 문제(=다중 상속) 발생 시 어떻게 해결되는지에 대해 알아본다.




---

## Default Method

* Java 8에 추가된 문법이다.

* Interface에서 Method 구현이 가능해졌다.

  그 결과 기존 Interface를 구현하는 

  클래스는 코드 변경 없이
  
  자동으로 Interface에 추가된 Default Method를 상속받게 된다.





---


## Problem

* Java 8에서 Default Method가 추가되면서

  Interface를 구현하는 클래스에서

  동일한 Signature를 갖는  n개의 Default Method를 상속받는 상황이 발생할 수 있다.


---

### Example

![](/assets/img/java/Java-8-Default-Method_1.png)

``` java
public interface A {
    default void hello() {
        System.out.println("Hello From A");
    }
}
public interface B extends A {
    default void hello() {
        System.out.println("Hello From B");
    }
}
public class C implements A, B {
    public static void main(String[] args) {
        new C().hello(); // 출력 : Hello From B
    }
}
```


---

## Solution

* Java 8에서는 이 문제에 대한 Solution을 제공한다.

  해당 Solution은 **3가지 규칙**을 따른다.

<blockquote>
  <p>1. 클래스가 항상 이긴다.</p>
</blockquote>

* 클래스나 슈퍼클래스에서 정의한 Method가 

  Default Method보다 우선권을 가진다.


![](/assets/img/java/Java-8-Default-Method_2.png)

``` java
public class D implements A {
    public void hello() {
        System.out.println("Hello From D");
    }
}
public class C extends D implements A, B {
    public static void main(String[] args) {
        new C().hello(); // 출력 : Hello From D
    }
}
```

---


<blockquote>
  <p>2. 1번 규칙 이외의 상황에서는 Sub Interface가 이긴다.</p>
</blockquote>

* 상속관계를 갖는 Interface에서 

  같은 Signature를 갖는 Method가 정의될 경우 
  
  Sub Interface가 이긴다.

  즉 B가 A를 상속받는다면 B가 A를 이긴다.


![](/assets/img/java/Java-8-Default-Method_3.png)

``` java
public class D implements A {
}
public class C extends D implements A, B {
    public static void main(String[] args) {
        new C().hello(); // 출력 : Hello From B
    }
}
```

* 1번 규칙은 클래스의 Method 구현이 이긴다고 설명했다.

  하지만 D는 hello( )를 Override 하지 않고

  단순히 Interface A를 구현했다.

  따라서 D는 Interface A의 Default Method 구현을 상속받게 되며 1번 규칙은 적용되지 않는다.

* 그다음으로 2번 규칙을 보면 

  Sub Interface인 B는 hell( )를 Override 하였기 때문에 

  최종적으로 컴파일러는 Interface A의 hello( )가 아닌

  2번 규칙으로 해석된 B의 hello( )를 선택한다.



---

<blockquote>
  <p>3. 그밖에는 명시적 호출을 한다.</p>
</blockquote>
  
* 여전히 Default Method의 우선순위가 결정되지 않았다면 

  여러 Interface를 상속받는 클래스가 

  명시적으로 Default Method를 Override하고 호출한다.
  

![](/assets/img/java/Java-8-Default-Method_4.png)


``` java
public interface A {
    default void hello() {
        System.out.println("Hello From A");
    }
}
public interface B {
    default void hello() {
        System.out.println("Hello From B");
    }
}
public class C implements A, B {
    public static void main(String[] args) {
        new C().hello();
    }
}

// 출력
// java: class C inherits unrelated defaults for hello() from types A and B
```

``` java
public class C implements A, B {
    public void hello(){
        // 명시적으로 Interface B의 Method를 선택한다.
        B.super.hello(); // 출력 : Hello From B
    }
    public static void main(String[] args) {
        new C().hello();
    }
}
```

* Java 8에서는 X.super.method(...) 형태의 **새로운 문법**을 제공한다.

  // X : Super Interface


---

## Summary

* Java 8에서 제공하는 Default Method로 인해

  다중 상속 문제가 발생 시 

  3가지 규칙으로 다중 상속 문제를 해결하는 방법에 대해 알아봤다.

* 동작 원리를 제대로 알고 있어야지 

  나중에 문제가 발생하면 

  빠르고 정확하게 해결할 수 있겠다는 생각이 든다.

--- 

## Reference

* [모던 자바 인 액션 : 13장](https://book.naver.com/bookdb/book_detail.nhn?bid=15261103)