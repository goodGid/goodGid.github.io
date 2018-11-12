---
layout: post
title:  " 함수 스코프(Function Scope)와 실행 컨텍스트(Excution Context)"
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

![](/assets/img/javascript/js_function_scope_and_excution_context_1.png)









* 둘의 **가장 큰 차이**는 각각 **발생하는 시점**에 있다.

![](/assets/img/javascript/js_function_scope_and_excution_context_2.png)

![](/assets/img/javascript/js_function_scope_and_excution_context_3.png)


<br>

* 코드를 통해 두 개념을 알아보자.

* 다음 코드의 결과값을 예측해보자.

![](/assets/img/javascript/js_function_scope_and_excution_context_4.png)

.

.

.

.

.

.

.

.

.

![](/assets/img/javascript/js_function_scope_and_excution_context_5.png)


<br>

* 자세하게 알아보자.

![](/assets/img/javascript/js_function_scope_and_excution_context_6.png)

* 우선 함수 전역 컨테스트에서 호이스팅이 이뤄진다.

* 호이스팅 작업(1,2번)이 끝난 후 할당 작업(3번)이 진행된다.

* 그리고 outer()함수를 호출하게 된다.(4번)

* outer 컨텍스트에서 또 호이스팅 작업(5번)이 이뤄진다.

* 그리고 inner()함수를 호출하게 된다.(7번)

* inner 컨텍스트에서 또 호이스팅 작업(8번)이 이뤄진다.

* 그리고 마지막 줄에서는 global scope에서 a를 탐색해 1을 출력한다.



