---
layout: post
title:  " 메소드(Method) 상속 및 동작 원리  "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

* 메소드 상속과 관련된 개념을 학습해보자.

* 다음처럼 Person 생성자 프로토타입에 함수를 생성하자.

![](/assets/img/javascript/js_method_inheritance_and_how_it_works_1.png)












<br>

* 그리고 gomu 인스턴스를 생성 한 후

![](/assets/img/javascript/js_method_inheritance_and_how_it_works_2.png)

* gomu_.____proto______.getAge()를 호출하게 되면 NaN(=Not a Number)가 뜬다.

* 그 이유는 getAge() 메소드를 호출할 때의 this는 생성자 자신이 되기 때문이다.

![](/assets/img/javascript/js_method_inheritance_and_how_it_works_3.png)

<br>

* 그런데 ___proto___는 생략이 가능하기 때문에 gomu.getAge()처럼 사용이 가능하다.

* 마치 자신의 메소드인 것처럼 호출이 가능하다.

* 이러면 this는 gomu를 가리킨다.

* 그래서 정상적으로 출력이 가능하다.

![](/assets/img/javascript/js_method_inheritance_and_how_it_works_4.png)

<br>

* 그런데 생성자 함수의 프로토타입에 age라는 프로퍼티가 있었다면 결과는 달라진다.

![](/assets/img/javascript/js_method_inheritance_and_how_it_works_5.png)

* 즉 메소드 호출시 **this가 어떻게 바인딩되느냐**에 따라 결과값이 달라진다.
