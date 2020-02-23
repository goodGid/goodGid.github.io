---
layout: post
title:  " URL과 URI, URN "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}


![](/assets/img/posts/url_uri_urn_1.png)

## URI

* 현재 동작하고 있는 Server에서 

* 특정 리소스에 접근하기 위해 사용하는 Path를

* **통합 자원 식별자(Uniform Resource Identifier)** 혹은 URI라고 부른다.

<br>

* URI는 인터넷의 우편물 주소 같은 것으로 

* **정보 리소스를 고유하게 식별하고 위치**를 지정할 수 있다.

<br>

* 그리고 URI에는 

* URL과 URN의 두 가지 형태가 있다.











---

## URL

* **통합 자원 지시자(Uniform Resource Locator, URL)**는 URI의 가장 흔한 형태이다.

* URL은 특정 서버안에서 

* 해당 리소스에 접근할 수 있는 

* **상대적인 위치**를 나타낸다.

> Example

* http://naver.com - 네이버 사이트의 URL

* http://img.naver.net/static/www/dl_qr_naver.png - 네이버 앱 QR 코드의 이미지에 대한 URL


<br>

> 한계

* URL은 해당 리소스에 접근할 수 있는 상대적인 위치를 나타낸다.

* 즉 특정 시점에 어떤 리소스가 

* 어느 곳에 위치한지 알려 줄 뿐이다.

> 한계 - Example

* goodGid가 사는곳은 대한민국이다.

* 만약 goodGid가 현재는 대한민국에 살고 있지만

* 시간이 지나 대한민국이 아닌곳에서 살 수 있다.

* 그런데 계속해서 대한민국에서 goodGid를 찾는다면 

* 원하는 결과를 얻지 못하게 된다.

<br>

* 위의 예시를 URL로 바꿔보면

* 구글 검색에 노출된 http://goodgid.github.io/URL-URI-URN/ 링크가 있다.

* 필자가 주소를 바꾸고 싶어 

* http://goodgid.github.io/web/URL-URI-URN/으로 URL을 바꾸었다.

* 그러면 이전 URL로 접근을 시도하면 페이지를 찾을 수 없게 된다.

<br>

* 즉 리소스가 옮겨지면

* 이전 URL은 더이상 유효하지 않게 된다.

<br>

* 이런 문제를 근본적으로 해결할 수 있는 방법은

* 객체의 위치와 상관없이 

* **객체의 Unique함을 보장할 수 있는 값**을 사용하는 것이다.

* 그렇게 되면 위치와 무관하게 

* 리소스에 접근 할 수 있게 된다.

---

## URN

* URI의 두 번째 형태는 

* **유니폼 리소스 이름(uniform resource name, URN)**이다.

<br>

* URN은 콘텐츠를 이루는 한 리소스에 대해 

* 위치에 영향을 받지 않는 Unique함을 나타내는 키 역할을 한다.


<br>

* URN은 **리소스를 옮기더라도 문제**없이 동작한다.

* 리소스가 그 이름을 변하지 않게 유지하는 한 

* **여러 종류의 네트워크 접속 프로토콜로 접근**해도 문제없다.


<br>

> Example

* 인터넷 표준 문서인 'RFC 2141'의 URN 값이

* *urn:ietf:rfc:2141* 라는 것을 알고 있다.

* 그렇다면 RFC 2141 리소스를 어느곳으로 옮겨도

* 클라이언트는 RFC 2141 리소스를 접근할 수 있다.

<br>

> 한계

* URN은 URL의 한계로 인해 착수되었다.

* 하지만 URN은 아직 채택되지 않아 쉽게 접할 수 없다.


---

## 결론

* URL과 URN은 URI의 종류이다.

* 그렇기 때문에

* 모든 URL은 URI이고 

* 모든 URN 또한 URI이다.

<br>

* 역으로 생각하면

* 모든 URI는 URL이라고 말할 수 없다.

<br>

> Case 1.

* http://img0.gmodules.com/ig/images/korea/logo.gif 

* 이와 같은 형식은 logo.gif 라는 인터넷상의 자원 위치를 의미 한다. 

* 이는 URI이면서도 URL라고 말할 수 있다. 

<br>

> Case 2.

* http://goodgid.github.io?name=gid

* http://goodgid.github.io 서버에서 

* Query String인 name 값에 따라 여러가지 결과를 나타낸다. 

<br>

* 여기서 URL은

* http://goodgid.github.io 까지이다. 

<br>

* 내가 원하는 정보에 도달 하기위해서는 

* **?name=gid**라는 식별자(Identifier)가 필요하다.

<br>

* 결국 위의 http://goodgid.github.io?name=gid Path는 

* URI이긴 하지만 URL은 아니다. 


---

## 참고

* [URI vs URL vs URN :: 마이구미](http://mygumi.tistory.com/139)

* [URI와 URL의 차이](http://lambdaexp.tistory.com/39)