---
layout: post
title:  " [공개 서버의 기본] 웹 서버의 역할"
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# 웹 서버의 역할

* 인터넷은 정보 발신, 채팅, 파일 전송 등 각종 웹 서비스로 넘쳐나고 있다.

* 웹 서비스를 제공할 때 사용하는 프로토콜이 `HTTP`이다.

* 웹 서비스를 제공하는 서버 SW로는 오픈소스인 <b>Apache</b>와 Windows Server에 표준으로 내장되어 있는 <b>IIS</b>가 있다.

* Apache는 모든 플랫폼을 지원 / IIS는 Windows Server만 지원

* <b>웹 클라이언트</b>가 되는 SW는 웹 브라우저가 일반적

* 웹 브라우저는 웹 서버에 액세스할 때 `메서드` + `URL`의 일부를 포함시켜 전송

* 'http://www.exmaple.kr/news/index.html' <br> `http`를 스킴명이라하는데, 웹 브라우저는 이 스킴명을 보고 통신에 사용할 프로토콜을 결정



---

{% capture images %}
    /assets/img/server/role_of_web_server_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

