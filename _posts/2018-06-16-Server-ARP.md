---
layout: post
title:  " [네트워크 기초 지식] ARP "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# ARP

* MAC 주소는 컴퓨터의 NIC(Network Interface Card)에 새겨져 있는 <b>물리적 주소</b>

* NIC란 컴퓨터를 네트워크에 연결하기 위해 꼭 필요한 확장 보드이다.

* NIC에는 LAN 케이블을 연결하기 위한 잭이 마련되어 있으며, <br> 컴퓨터의 데이터를 전기적인 신호로 변환하여 이 잭으로 송출한다.<br> 받는 수신도 여기서 일어나며, 그 경에우는 수신한 전자 신호를 원래 데이터로 복원하여 컴퓨터에게 전달한다.

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


![](/assets/img/server/arp_6.png) 



---

# ARP의 처리 흐름

* 데이터를 송신하는 컴퓨터가 제 3계층으로부터 `패킷`을 받으면 패킷의 목적지 IP 주소를 본다.

* 그것이 동일한 네트워크에 있는 컴퓨터의 것이라면 <br> 그 IP 주소를 ARP에서 조회하여 응답 결과를 `ARP 테이블`이라는 메모리상의 테이블에 등록 후 <br> 그 정보를 바탕으로 **프레임**을 만든다.

* 만약 다른 네트워크에 있는 컴퓨터의 것이라면 <br> 기본 **게이트웨이**의 **MAC 주소**를 **ARP**에서 **조회**하여 똑같은 처리를 수행한다.

* **기본 게이트웨이**란 자신 이외의 네트워크로 갈 때 사용하는 출구가 되는 IP주소로, <br> 방화벽이나 라우터의 IP 주소가 기본 게이트웨이가 되는 경우가 많다.

* **자신이 모르는 네트워크의 목적지 IP 주소로 가는 패킷인 경우**는 일단 **기본 게이트 웨이의 MAC 주소**로 **송신**한다.


![](/assets/img/server/arp_1.png) 


---


* *ARP와 RARP*

![](/assets/img/server/arp_2.png) 

![](/assets/img/server/arp_5.png) 

---

* *TCP/IP 프로토콜에서 ARP의 위치*

![](/assets/img/server/arp_3.png)


---

* *ARP 동작*

![](/assets/img/server/arp_4.png)


---

# 참고 

* [주소 변환 프로토콜(ARP)](http://elearning.kocw.net/document/lec/2012/AnDong/ChungJoongSoo/3-1.pdf)

* [[데통] ARP protocol 에 대해서](http://blockdmask.tistory.com/189)