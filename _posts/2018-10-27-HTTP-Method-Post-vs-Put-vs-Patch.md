---
layout: post
title:  " HTTP 함수 - Post vs Put vs Patch"
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## Idempotent

* PUT과 POST를 이해하려면 **Idempotent**라는 개념의 이해가 필요하다.

> f(x) = f(f(x))

* 다시 말해 몇 번이고 **같은 연산을 반복**해도 같은 값이 나온다는 것이다. 

* 예를 들어 클라이언트가 POST /dogs를 요청하였다.

* 그런데 Time Out(408)발생했다.

* 이 상황에서 클라이언트는 요청이 전달되었으나 네트워크가 끊어졌는지 <br> 아니면 요청조차 전달이 되지 않았는지 알 수 없다.

* 이 때 클라이언트가 사용한 HTTP 함수가 Idempotent하다면 다시 요청해도 상관 없다. 

* Whty? 항상 같은 결과를 만들기 때문이다. 

* 그러나 POST는 Idempotent 하지 않다.










---

## Post

* POST는 클라이언트가 **리소스의 위치를 지정하지 않았을때 리소스를 생성**하기 위해 사용하는 연산이다.

```
POST /dogs HTTP/1.1

{ "name": "blue", "age": 5 }

HTTP/1.1 201 Created
```

* 만약 위 HTTP 함수가 파일을 생성하기 위함이였다면  <br> /dogs/1이 생기고, 다시 요청을하면 /dogs/2가 생기게 된다.

* 그러므로 **POST 함수**는 Idempotent하지 않다.


---

## Put

* PUT은 **리소스의 위치를 명확히 지정**한 후 요청을 한다.

```
PUT /dogs/3 HTTP/1.1

{ "name": "blue", "age": 5 }
```

* /dogs의 프로퍼티가 name과 age 뿐이라면 <br> 이건 몇 번을 수행하더라도 같은 결과를 보장한다. 

* 즉 PUT 함수는 Idempotent하다.

* 또한 PUT 함수는 **생성** 또는 **업데이트**를 위해 사용할 수 있다.



---

## Patch

* PUT이 **리소스의 모든 프로퍼티**를 업데이트 하기 위해 사용한다면 <br> PATCH는 **부분만**을 업데이트하기 위해 사용한다. 

* PUT과 마찬가지로 **리소스의 위치를 클라이언트가 알고 있을 때** 사용한다.

---

## 정리


* [PUT vs. POST in REST](https://stackoverflow.com/questions/630453/put-vs-post-in-rest)에서 발췌했다.

1. POST to a URL creates a child resouce at a server defiend URL

2. PUT to a URL create/replaces the resource in is entirely at the client defined URL

3. PATCH to a URL updates part of the resource at that client defined URL


```
POST creates a child resource, so POST to /items creates a resources that lives under the /items resource. Eg. /items/1. Sending the same post packet twice will create two resources.

PUT is for creating or replacing a resource at a URL known by the client.

Therefore: PUT is only a candidate for CREATE where the client already knows the url before the resource is created. Eg. /blogs/nigel/entry/when_to_use_post_vs_put as the title is used as the resource key

PUT replaces the resource at the known url if it already exists, so sending the same request twice has no effect. In other words, calls to PUT are idempotent.
```

<small>[번역](https://translate.google.co.kr/?hl=ko&#en/ko/POST%20creates%20a%20child%20resource%2C%20so%20POST%20to%20%2Fitems%20creates%20a%20resources%20that%20lives%20under%20the%20%2Fitems%20resource.%20Eg.%20%2Fitems%2F1.%20Sending%20the%20same%20post%20packet%20twice%20will%20create%20two%20resources.%0A%0APUT%20is%20for%20creating%20or%20replacing%20a%20resource%20at%20a%20URL%20known%20by%20the%20client.%0A%0ATherefore%3A%20PUT%20is%20only%20a%20candidate%20for%20CREATE%20where%20the%20client%20already%20knows%20the%20url%20before%20the%20resource%20is%20created.%20%0A%0APUT%20replaces%20the%20resource%20at%20the%20known%20url%20if%20it%20already%20exists%2C%20so%20sending%20the%20same%20request%20twice%20has%20no%20effect.%20In%20other%20words%2C%20calls%20to%20PUT%20are%20idempotent.)</small>


---

## 참고

* [PUT vs. POST in REST](https://stackoverflow.com/questions/630453/put-vs-post-in-rest)

* [REST API: PUT VS POST](https://1ambda.github.io/javascripts/rest-api-put-vs-post/)
