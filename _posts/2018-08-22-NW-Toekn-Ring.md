---
layout: post
title:  " [로컬 영역 네트워크편] Token Ring "
categories: Network
tags: Network
author: goodGid
---
* content
{:toc}


# Token Ring(토큰 링)

* 토큰 패키징 방식이란 네트워크상에 통신 권리를 나타내는 <b>Token</b>이라는 이름의 데이터를 흘려보내는 방식으로 <br> Token에 의해 송수신을 관리한다.

* 각 컴퓨터는 Token을 수신하여 거기에 아무 데이터가 존재하지 않으면 그대로 다음 컴퓨터로 전송한다. <br> 이와 같이 한 방향을 향해 Token만이 릴레이로 전달되어 가는 것이 부하가 없을 때의 상태이다.

* 송신하고 싶은 데이터가 발생한 컴퓨터는 Token이 수중에 들어오는 것을 기다렸다가 Token을 잡고 <br> 그 뒤에 송신 데이터를 붙여서 다시 릴레이를 계속한다.

* Token을 받은 컴퓨터는 그 데이터가 자기 앞으로 온 것인지를 체크하고 아닐 경우 다음으로 전송 <br> 맞을 경우 데이터를 꺼내고 Token만을 다시 전송

* 이와 같은 구조에 의해 충돌이라는 개념은 원칙적으로 발생하지 않는다.



---

{% capture images %}
    /assets/img/network/token_ring_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

