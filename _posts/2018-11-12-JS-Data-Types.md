---
layout: post
title:  " JavaScript의 데이터 타입 "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

## JavaScript의 2가지 데이터 타입

* 크게 **Primitive Type**과 **Reference Type**이 있다.

* 2가지의 가장 큰 차이점은 다음과 같다.
    - Primitive Type : 값을 그대로 할당
    - Reference Type : 값이 저장된 주소값을 할당 (참조)

![](/assets/img/javascript/js_data_types_1.png)








---


## Primitive Type

* 실제로 메모리에 어떻게 올라가는지 알아보자.

![](/assets/img/javascript/js_data_types_2.png)

* 이 상황에서 <br> b = false; 코드를 추가하게 되면 다음과 같이 바뀌게 된다.

![](/assets/img/javascript/js_data_types_3.png)

* 다음으로 var c = b 코드를 추가해보자.

![](/assets/img/javascript/js_data_types_4.png)

* 메모리에 저장된 값을 통해 값을 비교할 수 있다. 

* 그렇기 때문에 b === c 는 True임을 알 수 있다.

![](/assets/img/javascript/js_data_types_5.png)

* 이제 c = 20으로 재할당을 한 후 b와 c의 값을 비교해보자.

![](/assets/img/javascript/js_data_types_6.png)

* 메모리 공간의 값이 달라졌기 때문에 b === c 는 False가 된다.

![](/assets/img/javascript/js_data_types_7.png)

---


## Reference Type

* Reference Type은 메모리에 어떻게 할당되는지 알아보자.

* 참조형 데이터는 기본형 데이터의 집합이라 볼 수 있다.

* 메모리 할당되는 과정은 기본형 데이터가 할당되는 과정과 비슷하다.

![](/assets/img/javascript/js_data_types_8.png)

* obj2 = obj를 할당하면 어떻게 될까? 

* 굉장히 단순하다.

* obj 객체가 아닌 obj 객체가 저장된 주소를 복사해온다.

![](/assets/img/javascript/js_data_types_9.png)

* 여기서 obj2.a 값을 바꿔보자.

* 우선은 obj2와 매칭된 414번 주소로 이동 --> 다시 1011주소로 이동 <br> 1011번 안에서 a 프로퍼티의 주소인 1012로 이동 <br> 1 대신 10을 대입한다.

* 이 후 obj.a 와 obj2.a의 값을 출력하면 obj2.a의 값을 바꿨지만 obj.a의 값도 바뀌는 것을 확인 할 수 있다.

![](/assets/img/javascript/js_data_types_10.png)

* 즉 obj === obj2는 True가 된다.

![](/assets/img/javascript/js_data_types_11.png)


---

* 또 다른 예를 보자.

![](/assets/img/javascript/js_data_types_12.png)

* 1185번 주소의 데이터를 보면 Array 형태로 구성되어 있다. 

<br>

* obj3.a = 'new'를 할당하면 어떻게 될까?

* 1185 주소의 데이터를 new로 변경을 하고 기존에 1326 ~ 1328를 참고하고 있던 링크가 사라지게 된다.

![](/assets/img/javascript/js_data_types_13.png)

* 그러면 주소값 1326 ~ 1328은 GC의 대상이 되어 메모리 회수가 이뤄진다.

