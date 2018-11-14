---
layout: post
title:  " 클래스(Class) 상속"
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

* 클래스 다중 상속에 대해 알아보자.

![](/assets/img/javascript/js_class_inheritance_1.png)

![](/assets/img/javascript/js_class_inheritance_2.png)










* 겹치는 메소드를 제거하자.

![](/assets/img/javascript/js_class_inheritance_3.png)

* 즉 getName()과 getAge()가 중복된다.

![](/assets/img/javascript/js_class_inheritance_4.png)

---

* 구조를 바꿔 해결해보자.

* gomu 인스턴스는 prototype chaining을 통해 getPosition(), getAge(), getName() 메소드 사용이 가능해진다.

![](/assets/img/javascript/js_class_inheritance_5.png)

---


* 그렇다면 이런 **다중 상속 구조**는 어떻게 만들어야할까?

![](/assets/img/javascript/js_class_inheritance_6.png)

* 즉 Employee prototype에 Person 인스턴스를 할당하면 된다.

---

* 그런데 추가로 한 단계를 더 거쳐야한다.

* 저 코드는 기존의 Employee prototype를 완전히 새로운 객체로 덮어씌운다.

* 본래 갖고있던 기능을 다시 부여해줄 필요가 있다.

![](/assets/img/javascript/js_class_inheritance_7.png)

* 이렇게하면 서로 다른 2개의 Class가 **Super / Sub 관계**를 갖게된다.

<br>

* 코드로 표현하면 다음과 같다.

![](/assets/img/javascript/js_class_inheritance_8.png)

* 주의할점은 getPosition()을 선언하는 위치이다.

* 당연히 Employee.prototype = new Person()보다 먼저 선언을 하면 안된다.

<br>

* 인스턴스를 생성하고 그 값을 살펴보면 다음과 같다.

![](/assets/img/javascript/js_class_inheritance_9.png)

* 좀 더 자세히보자.

![](/assets/img/javascript/js_class_inheritance_10.png)

---

* 하지만 완벽하다 할 수 없다.

* 그 이유는 다음 부분 때문이다.

![](/assets/img/javascript/js_class_inheritance_11.png)

* 만약 Employee의 인스턴스에서 name 프로퍼티를 지운다면 undefined가 호출돼야하지만

* 실제로는 prototype chaining 때문에 "이름 없음"이 출력된다.

![](/assets/img/javascript/js_class_inheritance_12.png)

* 즉 이 그림에서 해당 부분을 지워야 한다.

![](/assets/img/javascript/js_class_inheritance_13.png)

---

* 어떻게 해야할까?

* 우리는 반드시 Person의 인스턴스가 필요한게 아니라 Person.prototype이 필요한 것이다.

* 그렇기 때문에 Person.prototype을 상속받으며 아무런 프로퍼티가 존재하지 않는 인스턴스(=Bridge)를 만든다.

![](/assets/img/javascript/js_class_inheritance_14.png)

* 코드로 나타내면

![](/assets/img/javascript/js_class_inheritance_15.png)

* 객체의 값을 보면 다음과 같다.

![](/assets/img/javascript/js_class_inheritance_16.png)

---

* 좀 더 효율적으로 바꿔보자.

* Bridge() 함수는 매개체 역할을 할 뿐 실제 코드상에 영향을 주지 않는다.

* 그래서 함수화해서 사용하는 코드 스타일을 추천한다.

![](/assets/img/javascript/js_class_inheritance_17.png)

* 이 방식으로 코드를 다시 짜면 보다 간편하게 코딩이 가능하다.

![](/assets/img/javascript/js_class_inheritance_18.png)

* 이런 방식으로인해 다중 상속이 필요한 클래스는 extendClass() 함수를 호출해주기만 하면 된다.

---

* 메소드뿐만 아니라 프로퍼티에 대해서도 상속을 시킬 수 있다.

* 중복되는 프로퍼티를 

![](/assets/img/javascript/js_class_inheritance_19.png)

* Child.prototype.superClass = Parent 코드를 통해 

* Parent의 프로퍼티를 상속받아 사용할 수 있게 된다.

![](/assets/img/javascript/js_class_inheritance_20.png)

---

* 최종 코드이다.

![](/assets/img/javascript/js_class_inheritance_21.png)

* 그런데 ES6에서는 굳이 extendClass()를 만들필요가 없어졌다.

![](/assets/img/javascript/js_class_inheritance_22.png)

