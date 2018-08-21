---
layout: post
title:  " [네트워크 기초 지식] 이더넷과 MAC 주소 "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# 이더넷에서 프레임을 만든다.

* 1,2계층에서 필수불가결한 규격이 `이더넷`이다.

* 유선 네트워크의 경우 거의 대부분이 `이더넷`을 사용하고 있다 생각해도 좋다.

* 컴퓨터가 데이터를 송신할 때는 <br> 자신의 MAC 주소를 `출발지 MAC 주소` <br> 데이터를 보낼 상대방의 MAC 주소를 `목적 MAC 주소`로 하여 <br> 헤더에 넣어 `프레임`을 만든다.

* 이더넷은 3계층으로부터 받은 데이터(패킷)에 <br> 프레임의 처음을 나타내는 `프리앰블(Preamble`과 <br> 목적지(수신자)와 출발지(송신자)를 나타내는 `헤더`, <br> 비트 오류 체크에 사용하는 `FCS(Frame Check Sequence)`를 추가하여 `프레임`을 만든다.


---

# MAC 주소로 컴퓨터를 식별한다.

* 이더넷은 48비트로 된 `MAC 주소`라는 식별자를 사용하여 컴퓨터를 식별

a8:66:7f:04:00:80 / 00-50-56-c0-00-01

위와 같이 8비트마다 하이픈 or 콜론으로구분하여 16진수로 표기

`상위 24비트` : 제조업체별로 할당한 제조업체 코드 = OUI(Organizationally Unique Identifier)

OUI를 통해 기기의 제조업체를 알 수 있다.

`하위 24비트` : 제조업체 내부에서 기기별로 고유한 값으로 할당한 코드

<br>

{% capture images %}
    /assets/img/server/ethernet&mac_address_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

