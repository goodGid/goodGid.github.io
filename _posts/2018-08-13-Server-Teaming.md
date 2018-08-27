---
layout: post
title:  " [서버를 장애로부터 보호하기] 티밍"
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# 티밍

* 여러 개의 물리 NIC를 하나의 논리 NIC로 모으는 기술을 <b>티밍(Teaming)</b>이라 한다.

* 티밍에는 몇 가지 모드가 있는데 자주 사용하는 것은 <b>폴트 톨러런스</b>와 <b>로드 밸런싱</b> 두 가지이다.

---

# 폴트 톨러런스로 다중화

* 폴트 톨러런스(Fault Tolerence)는 물리 NIC를 다중화하는 모드이다.

* 폴트 톨러런스는 '장애에 내성이 있다'는 뜻이다.

* 폴트 톨러런스는 액티브/스탠바이로 작동하며 평소에는 액티브 NIC만을 사용한다.

* 액티브 NIC에 과부하가 걸리면 다른 한쪽의 물리 NIC(=스탠바이)로 통신을 한다.

* 장점 : 트러블 슈팅이 편하고 운용관리가 쉽다.

---

# 로드 밸런싱으로 대역 확장

* 로드 밸런싱(Load Balancing)은 물리 NIC를 다중화하면서 <b>대역 확장</b>을 도모하는 모드이다.

* 로드 밸런싱은 '부하의 균형을 잡는다'는 뜻이다.

* 평소에는 액티브/액티브로 작동하며 둘 다 사용하여 통신을 한다.

* 로드 밸런싱은 평소에 양쪽 물리 NIC를 사용하기 때문에 폴트 톨러런스에 비해 많은 통신 처리가 가능하다.

* 단점 : 패킷이 어느 쪽 물리 NIC를 사용하는지 파악이 어렵고, 트러블 슈팅도 하기 어렵다.

---

{% capture images %}
    /assets/img/server/teaming_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

