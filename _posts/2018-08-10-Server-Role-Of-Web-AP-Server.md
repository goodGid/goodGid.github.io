---
layout: post
title:  " [공개 서버의 기본] 웹 애플리케이션 서버의 역할 "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# 웹 애플리케이션 서버의 역할

* 대대분의 웹 시스템은 <b>웹 서버</b>, <b>웹 애플리케이션 서버</b>, <b>DB 서버</b>라는 3층 구조로 되어 있다.

* 웹 브라우저로부터 받은 요청을 처리하는 <b>웹 서버</b>

* 데이터를 저장하는 <b>DB 서버</b>

* 그 사이에 다리 역할을 제공하는 서버가 <b>웹 애플리케이션 서버(AP 서버)</b>이다.

---

# 웹 애플리케이션 서버의 기능

* 대표적인 것으로는 <b>DB 연결 기능</b>이다.

---

* 정적 콘텐츠 요청 시 <br> 웹 서버에서 정적 콘텐츠를 반환

* 동적 콘텐츠 요청 시 <br> 웹 서버가 웹 AP 서버로 요청 --> 웹 AP 서버는 DB에서 W/R하여 동적 콘텐츠 생성 후 웹 서버에게 반환

---

{% capture images %}
    /assets/img/server/role_of_web_ap_server_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

