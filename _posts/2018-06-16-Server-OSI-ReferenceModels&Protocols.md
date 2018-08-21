---
layout: post
title:  " [네트워크 기초 지식] OSI 참조 모델과 프로토콜 "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# 프로토콜 = 통신할 때의 규칙

* OSI 참조 모델은 `통신할 때의 규칙의 모음` 

* 네트워크에서는 그러한 규칙을 `프로토콜`이라 부름 <br> http://www.abc.co.kr에서 처음에 입력하는 'http'가 프로토콜

* HTTP : HyperText Transfer Protocol <br> 웹 서버와 웹 클라이언트에서 데이터를 송수신할 때 사용하는 통신 규칙

---

# 사용하는 프로토클은 극히 일부

1. 물리 계층 (제 1계층)

2. 데이터링크 계층 (제 2계층)

3. 네트워크 계층

4. 전송 계층

5. 세션 계층

6. 표현 계층

7. 응용 계층

<br>

* 각 계층은 서로 영향을 받지 않는다.

* 실제 네트워크에서 사용하는 프로토콜은 극히 일부
    - 1,2계층 : `이더넷`
    - 3계층 : `IP, ICMP, ARP`
    - 4계층 : `TCP, UDP`
    - 5~7계층 :  애플리케이션 프로토콜



{% capture images %}
    /assets/img/server/os_reference_models_protocols_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

