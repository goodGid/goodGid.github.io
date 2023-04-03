---
layout: post
title:  " [Kotlin] 메서드 인자로 n개의 람다(Lambda)를 받는 경우 :: 예제 코드를 보고 출력 값을 맞춰보자. "
categories: Kotlin
author: goodGid
---
* content
{:toc}

## Overview

* [이펙티브 코틀린 - 아이템 17. 이름 있는 아규먼트를 사용하라](https://bit.ly/3F2kh2t)를 보다 이해가 되지 않은 코드가 있어서

  필자처럼 코틀린을 찍먹 한 사람들에게 경각심을 불러일으키기 위해 글을 작성하고자 한다.

  (사실은 스스로를 위해 정리를 하는 글이다.)


---

## Example Code

``` kotlin
fun call(
    before: () -> Unit = {},
    middle: () -> Unit = {},
    after: () -> Unit = {}
) {
    before()
    println("- - -")
    middle()
    println("- - -")
    after()
}
```

* call( )이라는 메서드가 있고

  인자로는 다양한 람다 메서드를 받는다.

``` kotlin
fun main(args: Array<String>) {
  call({ println("CALL1") }, { println("CALL2") }) {
      println("CALL3")
  }
}
```

* 여기서 call( ) 메서드를 호출하면 어떤 결과가 출력될까?

  *~~센스가 있다면 쉽게 추론할 수 있다.~~*

``` kotlin
CALL1
- - -
CALL2
- - -
CALL3
```

* 그렇다면 다음과 같이 호출을 하게 되면 어떤 결과가 출력될까?

  (이 부분이 이 글을 작성하게 된 이유이다.)

``` kotlin
fun main(args: Array<String>) {
  call { print("CALL") }
}
```

* 출력 결과는 다음과 같다.

``` kotlin
- - -
- - -
CALL
```

* 결과를 보면 알 수 있듯이

  call( ) 메서드를 호출하면서 따로 아규먼트를 지정해주지 않았고

  그 결과 가장 마지막 인자인 after에 *print("CALL")*가 매핑이 되었음을 알 수 있다.

---

## Summary

* 코틀린에서 람다 형식으로 메서드에 인자를 넘기면

  메서드에서 가장 마지막 람다 형식의 인자에 매핑이 된다.

* 다른 사람의 코드를 보면서 

  "이게 뭐지?" 라는 생각이 들지 않게 

  코틀린을 잘 공부해 두자!

---

## Reference

* [이펙티브 코틀린 - 아이템 17. 이름 있는 아규먼트를 사용하라](https://bit.ly/3F2kh2t)