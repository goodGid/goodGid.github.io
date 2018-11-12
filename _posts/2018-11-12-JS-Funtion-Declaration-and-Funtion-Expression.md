---
layout: post
title:  " 함수 선언(Declaration)과 함수 표현(Expression) "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

## 함수 선언(Declaration)과 함수 표현(Expression)

![](/assets/img/javascript/js_fn_delareation_and_fn_expression_1.png)





---

* 익명 함수가 선언되고 정의되는 방식을 순서대로 살펴보자

![](/assets/img/javascript/js_fn_delareation_and_fn_expression_2.png)

* *선언한 함수를 변수 c에 할당한다.*

* 이게 **함수 표현**식의 개념이다.

* 함수 선언과 함수 표현의 차이는 **할당 여부**에 있다.

* 할당을 하지 않으면 전체가 호이스팅의 대상이 되고 <br> 그냥 function a(){} 형태

* 할당하면 함수는 그자리에 있고 **변수만** 호이스팅된다. <br> a = function a(){} 형태

<br>

* 호이스팅 여부는 실무에서 굉장히 중요한 이슈이다.

* 협업을 하는 도중 함수가 호이스팅이 된다면 의도치 않은 함수를 사용할 가능성이 높아진다.

![](/assets/img/javascript/js_fn_delareation_and_fn_expression_3.png)

* 그렇기 때문에 안전하고 *함수 선언* 대신 **함수 표현**을 사용하여 **예측 가능한 코딩**을 지향하자.

![](/assets/img/javascript/js_fn_delareation_and_fn_expression_4.png)

