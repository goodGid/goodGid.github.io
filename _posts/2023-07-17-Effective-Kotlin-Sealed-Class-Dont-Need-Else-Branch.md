---
layout: post
title:  " [Effective Kotlin] sealed 한정자는 when 사용 시 else가 필요 없다. (feat. Example Code) "
categories: Kotlin
author: goodGid
---
* content
{:toc}

## Overview

* ["이펙티브 코틀린 - 아이템 39. 태그 클래스보다는 계층을 사용하라"](https://bit.ly/3F2kh2t)에 나오는 내용을 정리했습니다.


---

## Goal

* sealed 키워드 개념과 어떤 장점이 있는지 알아본다.

---

## Content

* seale 키워드는 다음과 같이 정리할 수 있다.

### 같은 파일에서만 생성 가능

* sealed 한정자는 **외부 파일**에서 서브클래스를 만드는 행위를 제한한다.

  = **같은 파일 안에서만** 서브클래스를 가질 수 있다.

  = sealed 클래스와 그 서브클래스들은 같은 파일 내에서 논리적으로 **모여있게** 된다.

  = 서브클래스는 동일한 파일에서 선언되지 않으면 **컴파일 오류**가 발생한다.

  = 외부에서 추가적인 서브클래스를 만들 수 없다.

  = 타입이 추가되지 않을 거라는 게 보장된다.

  = 그러므로 when 사용 시 else 브랜치가 필요 없다.

``` kotlin
sealed class Shape

class Circle(val radius: Double) : Shape()
class Rectangle(val width: Double, val height: Double) : Shape()
class Triangle(val base: Double, val height: Double) : Shape()

fun calculateArea(shape: Shape): Double = when (shape) {
    is Circle -> Math.PI * shape.radius * shape.radius
    is Rectangle -> shape.width * shape.height
    is Triangle -> 0.5 * shape.base * shape.height
}
```

> 정상

![](/assets/img/kotlin/Effective-Kotlin-Sealed-Class-Dont-Need-Else-Branch_1.png)

> 컴파일 에러

![](/assets/img/kotlin/Effective-Kotlin-Sealed-Class-Dont-Need-Else-Branch_2.png)

* 'when' expression must be exhaustive, add necessary 'is Rhombus' branch or 'else' branch instead

---

### abstract 클래스

* sealed로 선언된 클래스는 abstract 클래스여야 한다.

  즉 직접 인스턴스화할 수 없으며 반드시 하위 클래스에서 상속받아 사용해야 한다.

``` kotlin
sealed class Shape {
    abstract fun calculateArea(): Double
}

class Circle(val radius: Double) : Shape() {
    override fun calculateArea(): Double {
        return Math.PI * radius * radius
    }
}

class Rectangle(val width: Double, val height: Double) : Shape() {
    override fun calculateArea(): Double {
        return width * height
    }
}

class Triangle(val base: Double, val height: Double) : Shape() {
    override fun calculateArea(): Double {
        return 0.5 * base * height
    }
}

fun sumAreas(vararg shapes: Shape): Double {
    var totalArea = 0.0
    for (shape in shapes) {
        totalArea += shape.calculateArea()
    }
    return totalArea
}

fun main() {
    val circle = Circle(5.0)
    val rectangle = Rectangle(4.0, 6.0)
    val triangle = Triangle(3.0, 7.0)

    val totalArea = sumAreas(circle, rectangle, triangle)
    println("Total area: $totalArea")
}
```
  

---

## Summary

* sealed 클래스에 대해 알아봤다.

* sealed 클래스는 abstract 클래스와 비슷하지만

  서브 클래스를 같은 파일 내에서만 정의할 수 있다는 특징이 있다.

* 실제 회사에서는 많은 사람들이 협업하기에

  강제성이 없으면 언젠가는 경계가 무너진다.

* 그런 관점에서 

  같은 파일 내에서만 정의해야 한다는 강제성은

  신규 기능 개발 시 사이드이펙에 대한 쉬운 파악과
  
  코드를 유지보수하는 측면에서 굉장히 좋다고 생각한다.

---

## Reference

* [이펙티브 코틀린 - 아이템 39. 태그 클래스보다는 계층을 사용하라](https://bit.ly/3F2kh2t)