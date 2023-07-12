---
layout: post
title:  " [Effective Kotlin] componentN 함수는 위치를 기반으로 객체를 해제 시켜준다! (feat. 소괄호) "
categories: Kotlin
author: goodGid
---
* content
{:toc}

## Overview

* ["이펙티브 코틀린 - 아이템 37. 데이터 집합 표현에 data 한정자를 사용하라"](https://bit.ly/3F2kh2t)에 나오는 내용을 정리했습니다.


---

## Goal

* 코틀린에서 제공하는 componentN 함수는 

  위치를 기반으로 객체를 해제시켜 편의성을 제공해 준다.

---

## Content

``` kotlin
val (id, name, pts) = player
```

* 이렇게 객체를 해제하는 코드를 작성하면

  코틀린은 내부적으로 componentN 함수를 사용해서 다음과 같은 코드로 변환시킨다.

``` kotlin
val id: Int = player.component1()
val name: String = player.component2()
val pts: Int = player.component3()
```

---

### Example 1

``` kotlin
data class User(val name: String)
fun main(args: Array<String>) {
    val (name) = User("goodGid")
    println(name)
}
```

* 의도한 대로 "goodGid"가 출력된다.

  그런데 여기서 (name)이 아니라 name으로 하게 되면 어떻게 될까?

``` kotlin
fun main(args: Array<String>) {
    val name = User("goodGid")
    println(name)
}
```

* 객체 자체가 출력된다. 

  그래서 "User(name=goodGid)" 이런 값이 출력된다.

* 즉 componentN 함수를 사용 시

  **소괄호 유무**가 굉장히 중요하다.

---

### Example 2

``` kotlin
data class User(
    val name: String,
    val nickName: String
)

fun main(args: Array<String>) {
    val user = User("goodGid", "기드")

    user.let { it -> println(it) }         // [1]
    user.let { (it) -> println(it) }       // [2]
    user.let { (_, it2) -> println(it2) }  // [3]
    user.let { (it, it2) -> println(it) }  // [4]
    user.let { (it, it2) -> println(it2) } // [5]
}
```

* [1] = User(name=goodGid, nickName=기드)

  [2] = goodGid 출력

  [3] = 기드 출력

  [4] = goodGid 출력

  [5] = 기드 출력

* "componentN 함수 사용 && 람다 표현식"에서

  소괄호를 사용하면 다양하게 객체를 분해할 수 있고

  it과 같은 매개변수에 내가 원하는 값을 바인딩시킬 수 있다.

---

## Summary

* componentN 함수를 사용하는 데 소괄호는 굉장히 중요하다 !

  만약 사용하지 않으면 객체 자체가 출력이 되고

  사용하게 된다면 객체가 분해되어 각 프로퍼티가 바인딩된다.

---

## Reference

* [이펙티브 코틀린 - 아이템 37. 데이터 집합 표현에 data 한정자를 사용하라](https://bit.ly/3F2kh2t)