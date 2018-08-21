---
layout: post
title:  " [공개 서버의 기본] 웹 서버에서 하는 처리"
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# 웹 서버에서 하는 처리

* 웹 서버는 웹 브라우저로부터 요청을 받으면 그에 따른 처리를 수행

* 웹 서버의 처리는 요청한 URL에 지정된 파일이 `정적`/`동적`인지에 따라 달라진다.

---

# 정적 웹 콘텐츠의 처리

* 정적 웹 콘텐츠란 누군가가 변경하지 않는 한 똑같은 표시 내용을 반환하는 웹 콘텐츠

* 웹 서버는 정적 웹 콘텐츠에 대한 요청을 받으면 미리 저장되어 있는 파일을 반환

* 정적 웹 콘텐츠의 처리는 가지고 있는 파일을 반환하는 것이기 때문에 빠름

* 하지만 웹 콘텐츠에 정보가 바뀔 때마다 대상 파일을 갱신할 필요가 있어 관리의 번거로움 존재

---

# 동적 웹 콘텐츠의 처리

* 동적 웹 콘텐츠란 클라이언트로부터 받은 정보에 따라 표시 내용이 달라지는 웹 콘텐츠

* 웹 서버는 동적 웹 콘텐츠에 대한 요청을 받으면 필요한 처리를 수행 후 그 결과를 반환

* 동적 콘텐츠를 생성하기 위한 대표적 수단으로는 `CGI(Common Gateway Interface)`와 `Web API(Application Programming Interface)`가 있다.

* 예전에는 CGI가 많았지만 최근에는 Web API가 대세

* 웹 서버는 Web API에 대한 요청을 XML or JSON 형식으로 받아 처리 후 같은 형식으로 반환

* 웹 브라우저는 받은 결과를 바탕으로 동적 웹 콘텐츠를 구성하여 표시

---

# 차이점 

* 정적은 받은 걸 그냥 보여주는 역할 

* 동적은 필요한 데이터를 주고 서버로부터 데이터를 받아 콘텐츠를 생성 !

---

{% capture images %}
    /assets/img/server/what_the_web_server_does_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

