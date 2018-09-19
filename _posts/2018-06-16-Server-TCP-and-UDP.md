---
layout: post
title:  " [네트워크 기초 지식] TCP와 UDP"
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# TCP와 UDP

## 신뢰성 vs 신속성

* 제 4계층은 `통신 제어`와 서비스의 식별을 수행하는 계층

* 제 4계층은 Application이 요구하는 통신 요건을 `신뢰성`과 `신속성`으로 분류하여 각각에 대해 다른 프로토콜을 마련

* TCP : 데이터를 중요하게 주고 받고 싶을 경우

* UDP : 신뢰성보다는 빨리 보내고 싶을 경우 <br> ex) VoIP, 시간 동기, [이름 해결]({{site.url}}/Server-DNS/#dns-서버는-2종류) 등

---

## 포트 번호로 서비스를 식별

* 포트 번호를 이용하여 컴퓨터 안의 어떤 서비스에게 데이터를 전달하면 좋은지 식별

```
0 ~ 1023 : 잘 알려진 포트(Well-know-Port)
1024 ~ 49151 : 등록된 포트(Registered Port)
49152 ~ 65535 : 동적 포트(Dynamic Port)
```

---


{% capture images %}
    /assets/img/server/tcp&udp_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

