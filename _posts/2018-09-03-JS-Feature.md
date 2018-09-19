---
layout: post
title:  " JavaScript의 특징 "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

## ToDo

* JS의 특징에 대해 공부해보자.








## JS Feature

* JS는 **단일 쓰레드(single-threaded)**이고 **콜백 큐(callback queue)**를 이용한다.

---

## 자바스크립트 엔진

* JS 엔진 중 유명한 것이 구글의 V8엔진이다.

* V8엔진은 크롬과 Node.js에서 사용된다. 


![](/assets/img/javascript/js_feature_1.png)
<center>V8엔진을 간단히 표시한 그림</center>

* V8 엔진은 크게 2가지로 구성된다.
    - **메모리힙(Memory Heap)**: 메모리할당이 이루어지는 곳이다.
    - **콜스택(Call Stack)**: 코드가 실행되면서 스택 프레임이 쌓이는 곳이다.

---

## 런타임

* 브라우저에는 거의 모든 JS 개발자가 사용하는 API가 있다.Ex) setTimeout()

* JS 엔진이 중요하긴 하지만 엔진만으로 모든 것이 이루어지는 것은 아니다. 

* 브라우저가 제공하는 웹 API라는 것도 있어서 DOM, AJAX, setTimeout등이 여기에 포함된다.

![](/assets/img/javascript/js_feature_2.png)

---

## 콜스택

* JS는 **싱글 쓰레드(single-threaded)** 프로그래밍 언어이다. <br> 즉, **콜스택**이 하나이며 한 번에 하나의 일만 할 수 있다.

* 콜스택 각각은 **스택프레임(Stack Frame)**이라고 부른다.

* 콜스택은 기본적으로 우리가 프로그램의 어디에 있는지를 기록하는 자료 구조이다. 

* 우리가 함수 안으로 들어가는 순간 해당 함수를 이 스택의 제일 위에 놓이게 되고 <br> 이 함수에서 돌아오면 스택의 가장 윗 부분의 것이 제거된다.

``` js
function multiply(x, y) {
    return x * y;
}
function printSquare(x) {
    var s = multiply(x, x);
    console.log(s);
}
printSquare(5);
```

![](/assets/img/javascript/js_feature_3.png)



<br>


* **스택 날림(Blowing the stack)**
    - 이는 콜스택이 Full이 되었을 때 발생한다.

``` js
function foo() {
    foo();
}
foo();
```

![](/assets/img/javascript/js_feature_4.png)

* 콜스택이 가득차게 되면 브라우저는 에러를 던진다.

![](/assets/img/javascript/js_feature_5.png)

---

## 동시성과 이벤트 루프


만약 콜스택 내 수행시간이 오래 걸리는 함수가 있으면 어떻게 될까?

예를 들어 브라우저의 JS로 복잡한 이미지를 변형해야할 필요가 있게 되면 

콜스택에 수행할 함수가 있으면 브라우저는 사실 아무것도 할 수 없게 된다.

바로 **블로킹**이 되는 것이다.

브라우저는 렌더링을 할 수도 없고 다른 코드를 수행할 수도 없는 상태가 된다.

또한 콜스택 내의 많은 작업을 수행하면서 오랜 시간 동안 응답이 없을 수 있다.

그러면 대부분의 브라우저에서는 에러를 일으키고 사용자에게 해당 페이지를 닫을지 물어본다.

![](/assets/img/javascript/js_feature_6.png)

그렇다면 이런 문제를 해결하는 방법은 무엇일까?

바로 **비동기 콜백(asynchronous callbacks)**이다.

---

## 정리

* 단일 쓰레드 기반으로 코딩하는 것은 쉬울 수 있다. <br> 예를 들어 **데드락(Deadlock)**과 같이 멀티쓰레드 기반 환경에서 발생할 수 있는 상황을 신경쓰지 않아도 되기 때문이다.

* 하지만 제한점도 많다.

* JS는 콜스택이 하나이다. 

* 그렇다면 특정 코드가 오랫동안 시간을 잡아먹어 비효율적이 될 수 있다.


---

# 참고

* [자바스크립트는 어떻게 작동하는가: 엔진, 런타임, 콜스택 개관](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%97%94%EC%A7%84-%EB%9F%B0%ED%83%80%EC%9E%84-%EC%BD%9C%EC%8A%A4%ED%83%9D-%EA%B0%9C%EA%B4%80-ea47917c8442)