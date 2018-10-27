---
layout: post
title:  " Blocking/Non-Blocking & Sync/Async "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## Blocking/Sync & Non-Blocking/Async

* 일반적으로 Blocking은 Sync와 관련이 있고 <br> Non-Blocking은 Async와 관련이 있다고 알고있다.

* 맞는 개념이다.

![](/assets/img/posts/blocking_non_blocking_synchronous_asynchronous_2.png)












![](/assets/img/posts/blocking_non_blocking_synchronous_asynchronous_3.png)

* 그런데 다음처럼 Non-Blocking과 Sync, Blocking과 Async과 관련이 있는 경우도 있다.

> IBM DeveloperWorks 2x2 매트릭스

![](/assets/img/posts/blocking_non_blocking_synchronous_asynchronous_1.png)

* Non-Blocking과 Sync, Blocking과 Async의 경우를 알아보기전에 <br> **Blocking Non-Blocking의 차이** <br> **Sync와 Async의 차이**에 대해 알아보자.

---

## Blocking & Non-Blocking

> 함수 호출 시 제어권 리턴 유무

* A가 B를 호출한다고 가정하자. <br> 그러면 A는 B를 호출한 함수가 되고 <br> B는 호출된 함수가 된다.

* B가 바로 제어권을 A에게 넘겨 <br> A가 다른 일을 할 수 있게 하면 **Non Blocking**이다.

* B가 자신의 작업을 모두 완료 후 <br> A에게 제어권을 넘겨준다면(= A를 대기하게 만든다면) **Blocking**이다.


---

## Synchronous & Asynchronous

> 함수 호출 시 작업 완료 여부 신경 유무

* A가 B를 호출한다고 가정하자. <br> 그러면 A는 B를 호출한 함수가 되고 <br> B는 호출된 함수가 된다. <br> 추가적으로 A는 B에게 요청한 작업(=b)이 끝나면 C작업을 수행하길 요구했다.

* A는 B에게 call back(=C)을 전달한다.

* B는 b(=자신에게 요구한 작업)을 완료 후 C작업을 수행한다.

* 이 때 A는 B의 **b작업 완료 여부**를 신경쓰지 않으면 **Asynchronous**다.

<br>

* *Sync와 Blocking인 상황* <br> A는 B의 b작업 완료 후 제어권 리턴을 기다리는 상황이다. <br> 그렇기 때문에 A는 작업 완료 여부를 신경쓰며 대기상태로 제어권을 기다린다. <br> 이 경우 **Synchronous**다.

* *Sync와 Non Blocking인 상황* <br> A는 B를 호출하자마자 제어권을 돌려 받는다. <br> 제어권이 있는 A는 다른일을 할 수 있게 된다.

* 그렇지만 이 때 A가 B의 **b작업 완료 여부**를 **지속적으로 체크**한다면 <br> 이 또한 **Synchronous**다.


---

## Sync + Non Blocking 상황

* Sync + Non Blocking는 B(=호출되는 함수)는 제어권을 바로 리턴하고 <br> A(=호출하는 함수)는 작업 완료 여부를 신경쓰는 것이다. 

* 신경쓰는 방법에는 Wait와 Question **2가지 방법**이 있다.

* 그런데 Non Blocking 함수를 호출했다면 <br> 사실 기다릴 필요 없고 물어보는 일만 하면 된다.

* 즉 Non Blocking 메서드 호출 후 바로 제어권을 반환 받아서 다른 작업을 할 수 있게 됐지만 <br> 메서드 호출에 의해 수행되는 작업이 완료된 것은 아니며, 호출하는 메서드가 호출되는 메서드 쪽에 작업 완료 여부를 계속 문의한다.


![](/assets/img/posts/blocking_non_blocking_synchronous_asynchronous_4.png)


> Ex : future.isDone()

``` java
Future ft = asyncFileChannel.read(~~~);

while(!ft.isDone()) {
    // isDone()은 asyncChannle.read() 작업이 완료되지 않았다면 false를 바로 리턴해준다.
    // isDone()은 물어보면 대답을 해줄 뿐 작업 완료를 스스로 신경쓰지 않고,
    // isDone()을 호출하는 쪽에서 계속 isDone()을 호출하면서 작업 완료를 신경쓴다.
    // asyncChannle.read()이 완료되지 않아도 여기에서 다른 작업 수행 가능 
}
// 작업이 완료되면 작업 결과에 따른 다른 작업 처리
```

*참고로 위 코드는 NonBlocking-Sync라는 특성을 이해하기 쉽도록 간략화한 예제이다.*

---

## Async + Blocking 상황

* Async + Blocking는 B(=호출되는 함수)가 바로 제어권을 리턴하지 않고 <br> A(=호출하는 함수)는 작업 완료 여부를 신경쓰지 않는 것이다.

![](/assets/img/posts/blocking_non_blocking_synchronous_asynchronous_5.png)

> Ex : Node.js + MySQL

* Async + Blocking는 어차피 Sync + Blocking랑 다를게 없다느 느낌이 있다.

* 어차피 제어권을 자신에게 없고 대기하는 입장이기 때문이다.

* 실제로 Sync + Blocking은 별로 이점이 없어서 굳이 이 방식을 사용할 필요가 없다고 한다.

* 그런데 **의도치 않게 Async + Blocking로 동작**하는 경우가 있다.

* 원래는 Sync + Blocking을 원했지만 실제로는 Async + Blocking로 동작하는 것이다.

* 그 대표적인 케이스가 바로 **Node.js + MySQL** 조합이다.

* Node.js쪽에서 Async로 MySQL과 통신을 요청하지만 <br> 그 과정에서 MySQL에서 제공하는 드라이버가 Blocking 방식이라고 한다.

* 또다른 예로는 Java의 JDBC도 마찬가지다. 

> Blocking-Async는 별다른 장점이 없어서 일부러 사용할 필요는 없지만 <br> Async + Non Blocking 방식을 쓰는데 <br> 그 과정 중에 하나라도 Blocking으로 동작한다면 <br> 의도하지 않게 Async + Blocking-Async로 동작할 수 있다.


---

## 참고

* [Blocking-NonBlocking-Synchronous-Asynchronous](https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/)
