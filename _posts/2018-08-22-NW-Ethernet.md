---
layout: post
title:  " [로컬 영역 네트워크편] Ethernet "
categories: Network
tags: Network
author: goodGid
---
* content
{:toc}


# Ethernet(이더넷)

* 현재 LAN 환경에서는 특수한 경우를 제외하고 모두 Ethernet을 사용한다.

* Ethernet에서는 네트워크상의 통신을 하는 사람이 없는 경우에 한해 데이터 송신을 시작하는 <b>캐리어 센스</b>라는 장치와 <br> 동시에 송신을 해버리는 경우에 발생하는 충돌을 검출하는 장치를 사용하여 통신을 제어한다. <br> 이 제어 방식을 <b>CSMA/CD(Carrier Sense Multiple Access/Collision Detection</b>방식이라고 부른다.


---

{% capture images %}
    /assets/img/network/ethernet_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

