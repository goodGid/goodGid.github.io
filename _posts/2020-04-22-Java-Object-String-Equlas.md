---
layout: post
title:  " String.class의 equals() 메소드 알아보기 "
categories: Java
author: goodGid
---
* content
{:toc}

## Prologue

* String 비교를 하는데 

  일반적으로 **주소**를 비교하기 위해서 **'=='**

  **값**을 비교하기 위해서 **equals()**를 사용한다.

  이와 관련해서는 ['=='와 equals()의 차이]({{site.url}}/What-is-differenece-between-==andeqiuals/) 포스팅을 참고하자.





## Goal

* 이 글의 목표는 우리가 무심코 사용하는

  String.class의 equals()에 대해 알아보려고 한다.



## String.class

* Java에서 모든 클래스는

  Default로 Object 클래스를 상속한다.



> Controller

``` java
@RestController
@RequestMapping("/string/equals")
public class HealthCheckController {

    @GetMapping
    public void stringEquals() {

        String goodGid = "goodGid";

        Class<? extends String> getClass = goodGid.getClass();
        Class<?> superClass = goodGid.getClass().getSuperclass();

        System.out.println("goodGid.getClass()                 : " + getClass);
        System.out.println("goodGid.getClass().getSuperclass() : " + superClass);
    }

}
```

> Output

```
goodGid.getClass()                 : class java.lang.String
goodGid.getClass().getSuperclass() : class java.lang.Object
```

<br>


* 그렇기 때문에 

  String.class 또한 Object.class를 상속한다.

* 그리고 Object.class에는 equals() 메소드가 존재한다.

  <img src="/assets/img/java/Java-Object-String-Equlas_1.png" alt="" style="max-width: 50%;">

<br>

* 그런데 String.class의 equals() 메소드는 

  Object.class의 equals() 메소드를 **Override**한다.

> String.class의 equals()

<img src="/assets/img/java/Java-Object-String-Equlas_2.png" alt="" style="max-width: 50%;">





---

## equals()

### Objectd.class의 equals()

``` java
public boolean equals(Object obj) {
    return (this == obj);
}
```

---


### String.class의 equals()

``` java
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```

* 2개의 equals() 모두 

  주소값(== 비교)이 같으면 true를 Return 한다.

* 하지만 String.class의 equals() 메소드에는

  추가 Logic으로 인해 Text가 같아도 true를 Return 하게 된다.


---

## Summary

* 다음 개념에 대해 학습하였다.

1. String.class와 Object.class의 관계

2. String.class의 equals()와 Object.class의 equals()의 차이점

* 그리고 equals() 메소드 사용 시 true가 Return 되는 경우는 다음과 같이 정리 할 수 있다.

  - Object.class --> 주소값

  - String.class --> 주소값, Text
