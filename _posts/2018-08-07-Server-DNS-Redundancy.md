---
layout: post
title:  " [사내 서버의 기본] DNS 서버의 이중화"
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}

# DNS 서버의 이중화

* DNS 서버는 인터넷을 보이지 않는 곳에서 지지해 주는 중요한 서버이다.

* DNS 서버에서 도메인명을 **[이름 해결]({{site.url}}/Server-DNS/#dns-서버는-2종류)**할 수 없으면 목적하는 웹 서버에 Access할 수 없다.

* 그래서 DNS 서버는 단독 구성이 아니라 `프라이머리 DNS 서버`와 `세컨더리 DNS 서버`와 같이 `이중 구성`으로 구축하는 것이 기본이다.











---

# 캐시 서버의 이중화

* LAN에 배치하는 캐시 서버는 클라이언트가 조회한 이름 해결 정보를 캐시할 뿐이다.

* 따라서 프라이머리 DNS 서버와 세컨더리 DNS 서버에서 특별한 이중화 설정을 할 필요가 없다.

* 프라이머리 DNS 서버로부터 Response가 오지 않으면 세컨더리 DNS에게 다시 조회한다.


---

# 콘텐츠 서버의 이중화

* 콘텐츠 서버는 도메인명에 관한(zone 파일)을 저장하는 중요한 서버이다.

* 만일 프라이머리 DNS 서버가 다운되어도 세컨더리 DNS 서버가 동일한 정보를 반환할 수 있도록 <br> 동일한 `zone 파일`을 저장해 둘 필요가 있다.

* 이것은 프라이머리 DNS 서버에서 세컨더리 DNS 서버로 zone 전송을 하여 `zone 파일`을 `동기화`한다.

* 정기적 or 임의의 타이밍에 zone 파일을 동기화한다.



---


{% capture images %}
    /assets/img/server/dns_redundancy_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

