---
layout: post
title:  " 'var' vs 'let' vs 'const' "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}


# ToDo

* JS에 타입을 선언하는데 사용되는 **var**, **let**, **const** 의 차이를 알아보자.









---

# let과 var의 재선언

* let은 **재선언시** 에러가 발생한다. 

* 하지만 var는 **재선언**을 하여도 에러가 발생하지 않는다.

![](/assets/img/javascript/js_type_1.png)


---

# let의 선언과 할당
* let은 const와 다르게 선언과 할당이 **독립적**으로 이루어져도 된다.

* 또한 초기에 Number 타입을 할당 후 String 타입을 **재할당**하여도 할당이 된다.

![](/assets/img/javascript/js_type_2.png)



---

# const의 선언과 할당

* const는 선언과 동시에 값 할당이 이루어져야한다.

* 또한 let과는 다르게 Number 타입 할당 후 String 타입을 재 할당을 하려고 할 때 에러가 발생한다.

![](/assets/img/javascript/js_type_3.png)

