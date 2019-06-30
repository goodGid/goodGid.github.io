---
layout: post
title:  " 템플릿 메소드(Template Method) 패턴이란? "
categories: Java
tags: Java
author: goodGid
---
* content
{:toc}

## 템플릿 메소드 패턴

* 상속을 통해 슈퍼클래스의 기능을 확장할 때 사용하는 가장 대표적인 방법이다.

* 변하지 않는 기능은 슈퍼클래스에 만들어두고 <br> 자주 변경되며 확장할 기능은 서브클래스에서 만들도록 한다.

* 슈퍼클래스에서는 미리 **추상 메소드** 또는 **오버라이드 가능한 메소드**를 정의해두고 <br> 이를 활용해 코드의 기본 알고리즘을 담고 있는 **템플릿 메소드**를 만든다.

* 슈퍼클래스에서 **디폴트 기능**을 정의해두거나 비워뒀다가 <br> 서브클래스에서 **선택적**으로 오버라이드 할 수 있도록 만들어둔 메소드를 **훅(hook) 메소드**라고 한다.

* 서브클래스에서는 추상 메소드를 구현하거나, <br> 훅 메소드를 오버라이드하는 방법을 이용해 기능의 일부를 확장한다.


---

``` java
package com.navercorp.linepay.centralapi.controller.v3.pay;

public abstract class Super {
    public void templateMethod() {
        /*
        기본 알고리즘 골격을 담은 메소드를 템플릿 메소드라 부른다.
        템플릿 메소드는 서브 클래스에서 오버라이드하거나 구현할 메소드를 사용한다.
         */
        // Default Algorithm
        hookMethod();
        abstractMethod();
    }
    protected void hookMethod() { } // 선택적으로 오버라이드 가능한 훅 메소드
    public abstract void abstractMethod(); // 서브 클래스에서 반드시 구현해야하 하는 추상 메소드
}
```

``` java
public class Sub1 extends Super {
    /*
    슈퍼클래스의 메소드를 오버라이드하거나 구현해서 기능을 확장한다.
    다양한 확장 클래스를 만들 수 있다.
     */
    protected void hookMethod() {

    }

    public void abstractMethod() {

    }
}
```