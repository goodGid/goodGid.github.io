---
layout: post
title:  " [네트워크 기초 지식] ARP "
date:   2018-06-16
excerpt: " ARP "
cate : "posts"
tag:
- Server
---

# ARP

* MAC 주소는 컴퓨터의 NIC(Network Interface Card)에 새겨져 있는 <b>물리적 주소</b>

* IP 주소는 OS에서 설정하는 <b>논리적 주소</b>

* 두 주소는 서로 협조하면서 사용

* 이 두 주소를 협조하면서 이용할 수 있도록 <br> 물리와 논리의 다리 역할을 하고 있는 것이 `ARP(Address Resolution Protocol)`

* 실질적으로 <b>IP 주소와 MAC 주소를 대응</b>시키는 일을 한다.

```
컴퓨터는 제 3계층으로부터 받은 패킷을 프레임으로 만들어 케이블로 흘려 보낸다.

하지만 받은 패킷만으로는 프레임을 만들기 위한 정보가 부족

Why? 

출발지 MAC 주소는 자기 자신의 NIC에 있어 알 수 있지만

목적지 MAC 주소는 모르기 때문이다.

이 때 ARP를 이용하여 IP 주소로부터 MAC 주소를 구한다.
```

---

# ARP의 처리 흐름

데이터를 송신하는 컴퓨터가 

제 3계층으로부터 `패킷`을 받으면 

패킷의 목적지 IP 주소를 본다.

그것이 동일한 네트워크에 있는 컴퓨터의 것이라면 

그 IP 주소를 ARP에서 조회하여 응답 결과를 

`ARP 테이블`이라는 메모리상의 테이블에 등록 후 

그 정보를 바탕으로 프레임을 만든다.

만약 다른 네트워크에 있는 컴퓨터의 것이라면 

기본 게이트웨이의 MAC 주소를 ARP에서 조회하여 똑같은 처리를 수행

<br>

`기본 게이트웨이`란 자신 이외의 네트워크로 갈 때

사용하는 출구가 되는 IP주소로,

방화벽이나 라우터의 IP 주소가 기본 게이트웨이가 되는 경우가 많다.

<b> 자신이 모르는 네트워크의 목적지 IP 주소로 가는 패킷인 경우는</b> 

<b> 일단 기본 게이트 웨이의 MAC 주소로 송신한다.</b>


<br>

{% capture images %}
    /assets/img/server/arp_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

