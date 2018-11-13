---
layout: post
title:  " 프로토타입(Prototype) 체이닝(Chaining) "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

* Array.prototype은 **객체**이다.

* 그렇기 때문에 Object 생성자 함수에 new 연산자로 생성된 인스턴스라는 말이다.

* 따라서 Object의 prototype을 상속받게 된다.

![](/assets/img/javascript/js_prototype_chaining_1.png)

* 이처럼 빨간선을 따라 연결된 prototype을 **Prototype Chaining**이라고 한다.





---

* 배열에는 toString()이라는 메소드가 없지만

![](/assets/img/javascript/js_prototype_chaining_2.png)

* **Prototype Chaining**에 의해 출력이 된다.

![](/assets/img/javascript/js_prototype_chaining_3.png)


---

* 만약 내용은 다르지만 이름은 같지만 배열에 직접 할당하면 어떻게 될까?

* **직접 할당한 메소드**가 호출된다.

![](/assets/img/javascript/js_prototype_chaining_4.png)

---

* 이번에는 call 메소드를 활용하여 arr을 this로 바인딩 한 후

* 명시적으로 Array 생성자 함수의 prototype에 있는 toString() 함수와

* Object 생성자 함수의 prototype에 있는 toString() 함수를 호출해보자.

![](/assets/img/javascript/js_prototype_chaining_5.png)

---

* 다음처럼 코드를 수정하면 

* arr.toString()과 arr._____proto_____.toString.call(arr)의 결과값은 같게 나온다.

* arr.___proto___은 Array의 prototype을 가리키기 때문이다.

![](/assets/img/javascript/js_prototype_chaining_6.png)

---


* 좀 심화된 예제를 살펴보자.

![](/assets/img/javascript/js_prototype_chaining_7.png)

![](/assets/img/javascript/js_prototype_chaining_8.png)

* 결과값에 대해 고민해보도록 하자 !