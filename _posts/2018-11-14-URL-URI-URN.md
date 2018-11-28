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

* 서버 리소스 이름은 **통합 자원 식별자(uniform resource identifier)** 혹은 URI라고 불린다.

* URI는 인터넷의 우편물 주소 같은 것으로 **정보 리소스를 고유하게 식별하고 위치**를 지정할 수 있다.

* 그리고 URI에는 URL과 URN의 두 가지 형태가 있다.











---

## URL

* **통합 자원 지시자(uniform resource locator, URL)**는 URI의 가장 흔한 형태이다.

* URL은 **특정 서버의 한 리소스에 대한 구체적인 위치**를 서술한다.

* URL은 **리소스가 정확히 어디에 있고 어떻게 접근할 수 있는지** 분명히 알려준다.

* 예를 들자면 아래와 같다.

    - http://naver.com - 네이버 사이트의 URL

    - http://img.naver.net/static/www/dl_qr_naver.png - 네이버 앱 QR 코드의 이미지에 대한 URL


---

## URN

* URI의 두 번째 형태는 **유니폼 리소스 이름(uniform resource name, URN)**이다.

* URN은 콘텐츠를 이루는 한 리소스에 대해 **그 리소스의 위치에 영향 받지 않는 유일무이한 이름 역할**을 한다.

* 이 위치 독립적인 URN은 **리소스를 옮기더라도 문제**없이 동작한다.

* 리소스가 그 이름을 변하지 않게 유지하는 한 **여러 종류의 네트워크 접속 프로토콜로 접근**해도 문제없다.

* 예를 들어 다음의 URN은 인터넷 표준 문서 'RFC 2141'가 어디에 있거나 상관없이 그것을 지칭하기 위해 사용할 수 있다.

* ex) urn:ietf:rfc:2141 - 'RFC 2141' 문서

<br>

* URN은 아직 채택되지 않아 접할 기회가 없었을 것이다.

* URN은 URL의 한계로 인해 착수되었다.

* **URL의 한계**란 URL은 주소이지 실제 이름이 아니다.

* 이 뜻은 특정 시점에 어떤 것이 위치한 곳을 알려준다는 것이다.

<br>

* 예를 들어 구글 검색에 노출된 http://mygumi.tistory.com/19 링크가 있다.

* 본인은 주소를 바꾸고 싶어 http://mygumi.tistory.com/test/19 로 URL을 바꾸었다.

* 다른 사람이 노출된 검색 콘텐츠에 접근 시 노출된 페이지는 찾을 수 없게 된다.

* 이러한 단점으로 리소스가 옮겨지면 해당 URL을 더는 사용할 수 없다는 것이다.

* 그리고 그 시점 기존 URL이 가지고 있던 객체를 찾을 방법이 없어진다.

<br>

* 이런 문제를 예방할 수 있는 이상적인 방법은 

* 객체의 위치와 상관없이 **그 객체를 가리키는 실제 객체의 이름**을 사용하는 것이다.

* 그렇게 되면 위치가 바뀌더라도 리소스의 위치를 찾을 수 있게 된다.


---

## 결론

* URL과 URN은 URI의 종류이다.

* 그렇기에 모든 URL은 URI이고 또한 모든 URN은 URI이다.

* 즉 모든 URI는 URL이라고 말할 수 없다.

* 그리고 URL과 URN은 다르다.

---

* http://img0.gmodules.com/ig/images/korea/logo.gif 

* 이와 같은 형식은 logo.gif 라는 인터넷상의 자원 위치를 의미 한다. 

* 이는 URI이면서도 URL라고 말할 수 있다. 

<br>

* http://endic.naver.com/endic.nhn?docid=1232950 

* http://endic.naver.com/란 서버에 위치한 endic.nhn파일은 

* query string인 docid의 값에 따라 여러가지 결과를 나타낸다. 

* 여기서 URL은 endic.nhn의 위치를 표기한 http://endic.naver.com/endic.nhn 까지이다. 

* 내가 원하는 정보에 도달 하기위해서는 ?docid=1232950라는 식별자(Identifier)가 필요한 것이다. 

* 결국 위의 http://endic.naver.com/endic.nhn?docid=1232950 주소는 URI이긴 하지만 URL은 아니다. 

<br>

* http://endic.naver.com/endic.nhn?docid=1232950  <br> http://endic.naver.com/endic.nhn?docid=1232690 

* 위 두 주소는 같은 URL이고 다른 URI라고 할 수 있다. 























---

## 참고

* [URI vs URL vs URN :: 마이구미](http://mygumi.tistory.com/139)

* [URI와 URL의 차이](http://lambdaexp.tistory.com/39)