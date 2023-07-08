---
layout: post
title:  " [Effective Kotlin] 리시버! 리시버! 리시버! : 리시버(Receiver)를 명시적으로 참조하자 "
categories: Kotlin
author: goodGid
---
* content
{:toc}

## Overview

* ["이펙티브 코틀린 - 아이템 15. 리시버를 명시적으로 참조하라"](https://bit.ly/3F2kh2t)에 나오는 내용을 정리했습니다.


---

## Goal

* 리시버를 명시적으로 적는 습관을 들여보자.


---

## Content

``` kotlin
class Node(val name: String) {
    fun makeChild(childName: String) =
        create("$name.$childName")
            .apply { print("Created ${name}") }

    fun create(name: String): Node? = Node(name)
}

fun main(args: Array<String>) {
    val node = Node("parent")
    node.makeChild("child")
}
```

* 위 코드를 실행시키면 어떤 결과가 나올까?

  **Created parent.child** 가 출력된다.

  어렵지 않게 결과를 예측할 수 있다.

* 만약 저 결과에 대해 "응 그렇지"라고 한다면 

  코틀린에 대해 (나처럼) 제대로 알지 못하고

  위험하게 사용할 가능성이 높다.
  
* 실제로는 **Created parent**가 출력 된다.

  이런 혼란을 야기하는 이유는 명시적으로 리시버를 붙이지 않았기 때문이다.

* 그렇다면 **Created parent.child** 를 출력하고 싶다면 어떻게 바꿔야 할까?

  다음과 같이 코드를 수정하면 된다.

``` kotlin
class Node(val name: String) {
    fun makeChild(childName: String) =
        create("$name.$childName")
            .apply { print("Created ${this?.name}") }

    fun create(name: String): Node? = Node(name)
}

fun main(args: Array<String>) {
    val node = Node("parent")
    node.makeChild("child")
}
```

* apply 함수 내부에서 명확하게 어떤 리시버를 사용할 것인지 명시해 주면 된다.

* 그런데 여기서 appy 함수 내부의 this의 타입은 Node? 이므로 언팩(unpack)하고 호출해야 한다.

  = this?.name(o) / this.name(x)

---

## Summary

* 명시적으로 리시버를 사용하는 게

  의도치 않은 사고를 방지할 수 있다.

* 개인적으로 코틀린에 대한 숙련도가 높지 않으므로

  가급적이면 타입을 꼭 명시하는 습관을 들이고 있는데

  타입뿐만 아니라 리시버도 명시해 주는 습관을 들여야겠다.

---

## Reference

* [이펙티브 코틀린 - 아이템 15. 리시버를 명시적으로 참조하라](https://bit.ly/3F2kh2t)