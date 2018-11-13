---
layout: post
title:  " 1급 객체(First Class Object)란? "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

## 1급 객체란?

1. 변수나 데이터에 할당 할 수 있어야 한다.

2. 파라미터로 넘길 수 있어야 한다.

3. 반환 값(return value)으로 사용할 수 있다.

4. 할당에 사용된 이름과 관계없이 고유한 구별이 가능하다.

5. 동적으로 프로퍼티 할당이 가능하다.

* JS에서의 함수는 1급 객체이다.



---

## 조건 예시

> 변수나 데이터에 할당 할 수 있어야 한다.

``` js
var foo = function(){
  console.log("익명함수를 foo 변수에 담을 수 있다.");
}
foo();
```

---


> 파라미터로 넘길 수 있어야 한다.

``` js
var foo = function(){
  let x = 10;
  return x;
}
 
var goo = function(value){
  console.log(value)
}
 
// 인자로 함수를 전달할 수 있다.
goo(foo());
```

---

> 반환 값(return value)으로 사용할 수 있다.

``` js
var foo = function(){
  return function(){
    var x = 10;
    return x;
  }
}
 
console.log(foo())   // 익명함수를 반환한다.
console.log(foo()()) // 익명함수가 반환하는 값을 반환한다.
```

---

> 할당에 사용된 이름과 관계없이 고유한 구별이 가능하다.


``` js
var foo = function goo(){
  console.log("goo라는 함수로 선언했지만 foo라는 변수로 고유 구별이 가능하다.")
}
foo();
```

* goo라는 함수로 선언을 했지만 foo라는 변수에 할당하여 <br> foo()를 호출함으로써 goo()함수를 구별할 수 있다.

![](/assets/img/javascript/js_what_is_first_class_object_1.png)


---

> 동적으로 프로퍼티 할당이 가능하다.

``` js
function foo(){
  console.log("foo()함수는 비어 있습니다.")
}
 
foo.property1 = "첫 번째 프로퍼티 추가";
foo.property2 = "두 번째 프로퍼티 추가";
 
console.log(foo.property1);
console.log(foo.property2);
```











---

## 참고

* [1급 객체(First-class citizen) 란? with Kotlin](https://medium.com/@lazysoul/functional-programming-%EC%97%90%EC%84%9C-1%EA%B8%89-%EA%B0%9D%EC%B2%B4%EB%9E%80-ba1aeb048059)

* [1급 객체 (first class object)](http://supercoding.tistory.com/19)

* [일급 객체( First Class Object )](http://victorydntmd.tistory.com/46)

* []()

* []()

