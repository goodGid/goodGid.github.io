---
layout: post
title:  " 리다이렉트(Redirect) vs 포워딩(Forwarding) "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## 리다이렉트(Redirect) 

* Web Container는 Redirect 명령이 들어오면 웹 브라우저에게 다른 페이지로 이동하라고 명령을 내린다.

* 그러면 웹 브라우저는 URL을 지시된 주소로 바꾸고 그 주소로 이동한다. 

* 다른 웹 컨테이너에있는 주소로 이동이 가능하다. 

* 새로운 페이지에서는 **request**와 **response** 객체가 새롭게 생성된다.  











![](/assets/img/posts/redirect-vs-forwarding_1.png)

---

## 포워딩(Forwarding) 

* Web Container 차원에서 페이지 이동만 있다. 

* 실제로 웹 브라우저는 다른 페이지로 이동했음을 알 수 없다. 

* 그렇기 때문에 웹 브라우저에는 최초에 호출한 URL이 표시되고 이동한 페이지의 URL 정보는 볼 수 없다. 

* 동일한 웹 컨테이너에 있는 페이지로만 이동할 수 있다. 

* 현재 실행중인 페이지와 Forwad에 의해 호출될 페이지는 **request**와 **response** 객체를 공유한다.

* Forward 방식은 다음 이동할 URL로 요청 정보를 그대로 전달한다. 

* 말 그대로 Forward(건네주기) 하는 것이다. 

* 그렇기 때문에 사용자가 **최초로 요청한 요청 정보**는 **다음 URL**에서도 **유효**하다.


![](/assets/img/posts/redirect-vs-forwarding_2.png)


---

## 참고

* [forward와 redirect의 차이](http://ysssb.tistory.com/entry/forward와-redirect의-차이)

* [포워딩(Forwarding)과 리다이렉트(Redirect)](http://blog.daum.net/redmu/11960892)