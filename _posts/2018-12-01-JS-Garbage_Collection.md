---
layout: post
title:  " Javascript Garbage Collection "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

* 자바스크립트의 메모리 관리는 우리에게는 보이지 않게 자동으로 실행된다. 

* 우리가 원시타입의 변수나 혹은 객체, 함수를 선언할때도 모두 메모리를 사용한다. 

* 만약에 이러한 것들이 더이상 필요없게 된다면? 

* 자바스크립트 엔진은 어떻게 이것들을 찾아내어 삭제할까?

* 그전에 [JavaScript의 데이터 타입]({{site.url}}/JS-Data-Types)에 대해 학습하고 가자.













---

## 접근 가능성(Reachability)

* 자바스크립트 메모리 관리의 주요 개념은 **접근 가능성**이다. 

* 간단하게 말하면 *접근 가능한* 값은 어떻게든 엑세스가 가능하거나 사용할 수 있는 값임을 뜻한다.

* 그렇기 때문에 이들은 **메모리에 유지**되는 것을 보장 받는다.

* 자바스크립트 엔진에는 백그라운드 프로세스로 동작하는 **가비지 콜렉션**가 있다.

* 이것은 모든 객체들을 모니터링 하며 그것들이 접근 불가능하게 되었을 때 삭제하는 작업을 수행한다.



---


## 예제

``` js
// user는 객체에 대한 참조를 가지고 있습니다.
let user = {
  name: "John"
};
```

![](/assets/img/javascript/js_garbage_collection_1.png)


* 여기에 표시된 화살표는 객체 참조를 나타냅니다. 

* 그런데 여기서 만약 user의 값을 덮어쓰게 되면 참조를 잃게 된다.

``` js
user = null;
```

![](/assets/img/javascript/js_garbage_collection_2.png)

* 이제 헤당 Object에는 접근이 불가능하게 되었다.

* 여기에 접근할 방법은 없으며 아무도 참조하지 않기 때문에 가비지 콜렉터는 데이터를 회수하고 메모리를 비우게 된다.


---


## 두개의 참조

* 이번에는 user가 가리키는 객체를 admin도 동시에 가리키도록 해보자.


``` js
let user = {
  name: "John"
};
 
let admin = user;
```

![](/assets/img/javascript/js_garbage_collection_3.png)


* 그리고 객체를 가리키던 user 변수의 값을 덮어쓴다.

``` js
user = null;
```

* 하지만 여전히 admin 변수가 객체를 참조하고 있기 때문에 메모리에 유지된다.

* 만약 admin 변수도 초기화 한다면 객체는 그 때 메모리 회수를 당할 것이다.

---

## 상호 연결된 객체

* 좀 더 복잡한 예제를 살펴보자.


``` js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;
 
  return {
    father: man,
    mother: woman
  }
}
 
let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

* marry는 두개의 객체를 서로 참조하게 하고 이 둘을 참조하고 있는 새로운 객체를 반환하는 함수이다.

* 메모리 구조의 결과는 다음과 같다.


![](/assets/img/javascript/js_garbage_collection_4.png)

* 모든 객체는 서로 접근 가능하게 되었다. 

* 이제 두개의 참조를 삭제보자.


``` js
delete family.father;
delete family.mother.husband;
```


![](/assets/img/javascript/js_garbage_collection_5.png)

* 이 두개의 참조 중 하나만 삭제할 경우에는 여전히 모든 객체가 접근 가능하므로 객체가 삭제되기에 충분하지 않다. 

* 하지만 두개의 참조 모두를 삭제할 경우 John이라는 프로퍼티를 갖는 객체는 메모리 회수가 된다.


![](/assets/img/javascript/js_garbage_collection_6.png)

* John 객체가 가리키는 바깥을 향하는 참조는 상관없다. 

* GC의 관심은 안으로 들어오는 참조의 유무이다.

* 가비지 콜렉션이 동작한 이후에는 다음과 같이 됩니다.


![](/assets/img/javascript/js_garbage_collection_7.png)


---

## 접근 불가능한 객체 집합

* 외부에서 접근 불가능한 자기들끼리만 상호 참조하여 만들어진 완벽한 형태의 객체 집합도 메모리에서 삭제 가능하다. 

* 소스코드는 위와 동일하다고 가정하고 다음의 코드를 실행해보면 다음과 같다.

![](/assets/img/javascript/js_garbage_collection_8.png)

* 이 예제는 **접근 가능성**에 대한 매우 중요한 개념을 보여주는 데모이다. 

* John과 Ann은 연결되어 있다. 

* 그 둘은 안/밖으로 연결되는 링크들 모두를 가지고 있지만 family라는 루트(Root)와의 연결이 끊어진 상태이다.

* 그러므로 이 객체 집합은 **접근 불가능**하며 메모리 회수가 될 것이다.



---

## 내부 알고리즘

* 기본적인 가비지 콜렉션의 알고리즘은 **[마크 앤 스윕(Mark-and-sweep)]({{site.url}}/Java-Garbage-Collection-(1)/#포인터-추적-방식)**이라고 불린다.

* 일반적으로 가비지 콜렉션은 다음의 과정을 거친다.

  - 가비지 콜렉터는 루트를 획득하여 그들을 마크(기억)한다.

  - 그리고 그들이 참조하고 있는 모든 것들에 방문하여 마크한다.

  - 그리고 마크한 모든 객체에 방문하여 그들의 참조 역시 마크한다. 
  - 모든 객체들을 기억하고 나면 미래에는 같은 객체를 두번 방문하지 않는다.

  - 루트로부터 접근 가능한 방문하지 않은 참조가 있다면 계속해서 반복한다.

  - 마크되지 않은 모든 객체는 삭제된다.

* 예를 들어 다음과 같은 객체의 구조가 있다고 해보자.

![](/assets/img/javascript/js_garbage_collection_9.png)

* 우리는 오른편에 **접근 불가능한 객체들**을 발견할 수 있다.

* 이제 가비지 콜렉터가 진행하는 마크 앤 스윕 과정이 이것을 어떻게 다루는지 보자. 

* 다음은 루트로부터 첫번째 과정을 거친 결과이다.

![](/assets/img/javascript/js_garbage_collection_10.png)


* 이후에 그들의 참조들도 마크한다.


![](/assets/img/javascript/js_garbage_collection_11.png)

* 그리고 그들의 참조도 반복한다.


![](/assets/img/javascript/js_garbage_collection_12.png)


* 이제 방문할 수 없는 객체들은 접근 불가능한것으로 간주되어 삭제된다.


![](/assets/img/javascript/js_garbage_collection_13.png)


* 이것이 가비지 콜렉터가 동작하는 개념이다.

* 자바스크립트 엔진은 어플리케이션의 실행에 영향을 주지 않고 빠르게 수행되도록 하기 위해 많은 최적화 옵션을 적용하고 있다.





---

## 참고

* [Javascript – Garbage Collection](http://theeye.pe.kr/archives/2872)