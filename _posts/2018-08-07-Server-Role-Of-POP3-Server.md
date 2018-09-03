---
layout: post
title:  " [사내 서버의 기본] POP3 서버의 역할"
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}

# POP3 서버의 역할

* `메일 박스`라는 사서함에 들어 있는 메일 데이터를 <b>상대방 사용자에게 전달하는 서버가 POP3 서버이다.</b>

* 최종적으로 사용자에게 메일을 전달하는 것은 SMTP 서버가 아니라 `POP3 서버`의 역할이다.

* POP3 서버는 사용자로부터 '내 메일을 달라'는 요청을 받으면 `POP3(Post Office Protocol version 3)`라는 프로토콜을 이용하여 메일 데이터를 전송한다.

* 가장 마지막에만 POP3을 사용하는 데는 이유가 있다.

* <b>SMTP는 데이터를 송신하고 싶을 때에 송신하는 `푸시형`프로토콜이다.</b>
    - 푸시형 프로토콜은 항상 전원이 켜져 있는 서버에 대한 통신 or 서버 간 통신인 경우에는 <br> 실시간으로 데이터를 전송할 수 있어 무척 편리하다.
    - 하지만 메일 SW를 작동시키는 컴퓨터의 전원이 항상 들어있냐고 하면 반드시 그렇다고는 할 수 없다.

* 그래서 <b>전원이 켜져 있고 원할 때만 메일 상자에서 메일 데이터를 다운로드할 수 있는 `풀형` 프로토콜인 POP3을 사용한다.</b>

<br>

* 메일 SW는 수동 or 자동으로 POP3 서버에게 '내 메일을 달라'는 요청을 한다.

* POP3 서버는 메일 SW로부터 받은 사용자 ID/PW를 인증하고 성공하면 `메일 상자`에서 메일 데이터를 꺼내 전송한다.

---

SMTP
{% capture images %}
    /assets/img/server/role_of_pop3_server_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

