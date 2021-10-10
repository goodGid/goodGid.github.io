---
layout: post
title:  " Java 초기화 블록(Initialization Block) 동작 순서 알아보기 (feat. Static, Instance) "
categories: Java
author: goodGid
---
* content
{:toc}

## Prologue

* Java에서 클래스 변수 혹은 인스턴스 변수를 초기화하는 방법은 다양하다.

  그 중 Static Initializer Block와 Instance Initializer Block의 동작 순서를 코드로 알아보자.



---

## Initializer Block

### Static 

* 클래스를 로딩하는 시점에 호출된다.

  = 1번만 호출된다.

* 인스턴스 변수나 인스턴스 메소드에 접근하지 못한다.

---

### Instance

* 객체가 생성될 때마다 호출된다.

* Super 생성자보다 먼저 호출된다.

  해당 클래스의 생성자보다 먼저 호출된다.

  => 호출 순서 :: Super -> Instance -> Sub
  

---

### Code

``` java
public class Main {
    public static void main(String[] args) {
        System.out.println("## Static 변수 접근 시 Static Initializer Block이 호출된다.");
        SubClass.b = "Class Value"; // static initializer block 호출
        System.out.println("SubClass.b를 'Class Value'로 변경 후 값 : " + SubClass.b);
        System.out.println();

        System.out.println("----- [Start] 1st Instance 생성 ----- ==> 호출 순서 :: Super -> Instance -> Sub");
        new SubClass();
        System.out.println("----- [End] 1st Instance 생성 -----");
        System.out.println();

        System.out.println("----- [Start] 2nd Instance 생성 ----- ==> 호출 순서 :: Super -> Instance -> Sub");
        new SubClass();
        System.out.println("----- [End] 2nd Instance 생성 -----");
    }
}

class SubClass extends SuperClass {

    private String a;
    public static String b;

    {
        System.out.println("----- [Start] Instance Initializer Block -----");
        a = "Instance Value";
        System.out.println("[Instance Field] a = " + a);
        System.out.println("[Class Field] b = " + b);
        System.out.println("----- [End] Instance Initializer Block -----");
    }

    static {
//        a = "aaa";  // error
        System.out.println("----- [Call] Class Initialization Block -----");
    }

    SubClass() {
        super();
        System.out.println("----- [Call] Sub Constructor -----");
    }
}

class SuperClass {
    SuperClass() {
        System.out.println("----- [Call] Super Constructor -----");
    }
}
```

> Output

``` java
## Static 변수 접근 시 Static Initializer Block이 호출된다.
----- [Call] Class Initialization Block -----
SubClass.b를 'Class Value'로 변경 후 값 : Class Value

----- [Start] 1st Instance 생성 ----- ==> 호출 순서 :: Super -> Instance -> Sub
----- [Call] Super Constructor -----
----- [Start] Instance Initializer Block -----
[Instance Field] a = Instance Value
[Class Field] b = Class Value
----- [End] Instance Initializer Block -----
----- [Call] Sub Constructor -----
----- [End] 1st Instance 생성 -----

----- [Start] 2nd Instance 생성 ----- ==> 호출 순서 :: Super -> Instance -> Sub
----- [Call] Super Constructor -----
----- [Start] Instance Initializer Block -----
[Instance Field] a = Instance Value
[Class Field] b = Class Value
----- [End] Instance Initializer Block -----
----- [Call] Sub Constructor -----
----- [End] 2nd Instance 생성 -----
```

* Static은 클래스 로딩 시 **1번만** 호출되는 것을 확인할 수 있다.

* Instance와 관련된 호출 순서는 **Super -> Instance -> Sub** 임을 확인할 수 있다.

---

## Summary

* 상황에 맞게 적절한 초기화 블록(Initialization Block)을 사용해보자 ! 

---

## Reference

* [java -- initialization block ( 초기화 블록 )](https://freeprog.tistory.com/198)