---
layout: post
title:  " 클로저(Closer)로 프라이빗(Private) 멤버 만들기 "
categories: JavaScript
tags: JavaScript
author: goodGid
---
* content
{:toc}

## 클로저(Closer)활용

* 자바 등의 여러 언어에서는

* 메소드는 프로퍼티를 **Private하게 선언**할 수 있는 기능을 제공하는데

* JS에서는 제공하지 않는다.

* 그래서 **클로저**를 통해 흉내낼 수 있게 된다.





---

* 간단한 예를 통해 알아보자.

![](/assets/img/javascript/js_closer_make_private_member_1.png)

* 위와 같은 게임을 만든다고 가정하자.

![](/assets/img/javascript/js_closer_make_private_member_2.png)

* 이런식으로 코딩을 하게 되면 *fuel*, *power*, *total* 과 같은 값을 직접 변경이 가능하다.

![](/assets/img/javascript/js_closer_make_private_member_3.png)

* 우리는 이런 값들을 직접 변경할 수 없게 해야한다.

* 즉 **Scope를 활용**하면 된다.

<br>

* *fuel*, *power*, *total* 은 내부 변수로 감추고

* (= var를 선언하여 내부 변수로 감춘다.)

![](/assets/img/javascript/js_closer_make_private_member_4.png)

* 외부에는 오직 run() 메소드만 노출시킨다.

![](/assets/img/javascript/js_closer_make_private_member_8.png)

* 이제 사용자는 직접 변경을 하려해도 소용이 없어진다.

![](/assets/img/javascript/js_closer_make_private_member_5.png)

* 사용자는 오직 run()이라는 메소드만 사용이 가능하다.

* 전체 코드는 다음과 같다.

![](/assets/img/javascript/js_closer_make_private_member_7.png)


<br>


* 클로저를 이용해 **Private / Public을 구분**하는 방법은 다음과 같다.

![](/assets/img/javascript/js_closer_make_private_member_6.png)


