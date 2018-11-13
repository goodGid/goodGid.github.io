---
layout: post
title:  " 프로토타입(Prototype) "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

* 총 3가지에 대해 알아보자.

* **prototype**, **constructor**, **___proto___**

![](/assets/img/javascript/js_prototype_1.png)













* 생성자 함수가 있을 때 (=Constructor)

* new 연산자를 써서 인스턴스를 만들면

![](/assets/img/javascript/js_prototype_2.png)

<br>

<br>

* **생성자 함수의 prototype이라고 하는 프로퍼티**가

* **인스턴스의 ___proto___라고하는 프로퍼티**에게 전달이 된다.

* 즉 생성자 함수의 prototype과 인스턴스의 ___proto___는 **같은 객체를 참조**한다.

* 다시말해 **prototype은 객체**이다.

![](/assets/img/javascript/js_prototype_3.png)

<br>

<br>

* 그런데 **___proto___는 내부 프로퍼티에 접근할 때 단어 생략**이 가능하다.

* 즉 이런식으로 연결이 되어 있는거 처럼 동작한다.

![](/assets/img/javascript/js_prototype_4.png)

---

* 구체적인 데이터를 통해 더 알아보자.

![](/assets/img/javascript/js_prototype_5.png)

* Array 생성자에는 from() isAraay() 등등 다양한 메소드와 length, prototype이라는 프로퍼티가 존재한다.

* 그 중 Array 생성자의 prototype에는 배열이 사용하는 메소드가 들어있다.

<br>

* Array의 prototype 프로퍼티는 

* 배열(= [1,2,3])의 ___proto___에 연결이 되어있다.

* 즉 다음과 같은 구조가 성립된다.

![](/assets/img/javascript/js_prototype_6.png)

<br>

* 배열을 크롬 개발자 도구로 살펴보면 

![](/assets/img/javascript/js_prototype_7.png)

* ___proto___에서 **Array 생성자 함수의 prototype이 갖고 있는 메소드**를 확인할 수 있다.

<br>

* 그리고 ***배열.constructor***와 ***배열._____proto_____.constructor***는 똑같은 값을 출력한다.

* 즉 **___proto___는 생략이 가능함**을 알 수 있다.

![](/assets/img/javascript/js_prototype_8.png)

---

* 여기있는 원본(=gomu)과 클론(=Clone)들은 모두 Person의 인스턴스가 된다.

![](/assets/img/javascript/js_prototype_9.png)

* 아래 4가지 변수들은 모두 **동일한 객체**를 가리킨다.

![](/assets/img/javascript/js_prototype_10.png)

* 그로인해 뒤에 있는 부분들도 모두 **동일한 함수**를 가리킨다.

![](/assets/img/javascript/js_prototype_11.png)

<br>

* 즉 4가지 방식에 의해서 **생성자 함수의 prototype**에 접근이 가능하고

![](/assets/img/javascript/js_prototype_12.png)

* 이 5가지 방식으로 **생성자 함수**에 접근이 가능하다.

![](/assets/img/javascript/js_prototype_13.png)

* [Constructor].prototype.constructor는 자기 자신을 가리킨다.

* Object.getPrototypoof([instance])는 [Constructor].prototype과 같다.

* [instance].___proto___역시 [Constructor].prototype를 가리킨다.

* 여기서 ___proto___는 생략이 가능하기 때문에 [instance]는 [instance]._____proto___와 같다.



