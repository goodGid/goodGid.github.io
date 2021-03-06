---
layout: post
title:  " Java 자료형 비교 : Doulbe vs Float (Difference between Double and Float) "
categories: Java
author: goodGid
---
* content
{:toc}

## Prologue

* Java에서 소수점을 표현하는 대표적인 자료형으로 Double과 Float가 있다.

  2개의 차이에 대해 알아보자 !





---

## Double

* A double data type is **more precise** than float. 

  float보다 정확할 뿐 100% 정확하다는 건 아니다.

* A double variable can provide precision up to 15 to 16 decimal points 


---

## Float

* By default 

  floating-point numbers are double in Java. 

* If you want to store them into the float variable

  you need to either **cast** them or use a **suffix** 'f' or 'F' as shown in our example.

``` java
public static final float PIE = 3.14; // compile time error

// Use cast
public static final float PIE = (float) 3.14;

// Use suffix 'f' or 'F'
public static final float PIE = 3.14f;
public static final float GRAVITY = 9.8F;
```

* A float variable can provide precision up to 6 to 7 decimal points 



---

## Similarities

* Both double and float are approximate types

  **they are not precise**.

* You should use **logical operator** 

  e.g. > or < to compare both float and double variables
  
  instead of **=** and **!=** because **they are not precise**.




---

## Difference

* Precision Decimal Points

  --> double : 15 ~ 16

  --> float : 6 ~ 7


* Storage Requirement

  --> double is more expensive than float.

```
It takes 8 bytes to store a variable while float just takes 4 bytes.
This means if memory is constraint than its better to use float than double.

By the way, the double type also has a larger range than float
and if your numbers don't fit well in float then you have to use double in Java.
```

* Range 

  --> double has a higher range than float
  
  --> because it got more bits to store data.




---

## When to use double and float in Java?

* Though both are **approximate** types 

  If you need more precise and accurate results then use double.

* Use float if you have memory constraint

  because it takes **almost half** as much space as double. 

* Though be careful with floating-point calculation and representation

  don't use double or float for monetary calculation, instead use BigDecimal.

* = double과 float를 사용하면

  부동 소수점 계산 및 표현을 하는 데 있어서 조심해야 하니
  
  통화 계산에는 **BigDecimal**을 사용하자 !

---


## Summary

* Remember floating-point numbers are double in Java

* double is more accurate then float

  = double is more expensive then float

* 통화 계산에는 double과 float 대신

  **BigDecimal**을 사용하자 !

  ref : [부동소수점 계산이 이상하다. BigDecimal을 써보자.](https://m.blog.naver.com/PostView.nhn?blogId=peap18&logNo=221340157353&proxyReferer=http:%2F%2Fblog.naver.com%2Fpeap18%2F221340157353)


---

## Reference

* [Difference between float and double variable in Java?](https://javarevisited.blogspot.com/2016/05/difference-between-float-and-double-in-java.html#axzz6nkcKrLz4)