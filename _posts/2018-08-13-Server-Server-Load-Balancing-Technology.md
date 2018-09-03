---
layout: post
title:  " [서버를 장애로부터 보호하기] 서버 부하분산 기술 "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}



# 서버 부하분산 기술

* <b>서버 부하분산 기술</b>이란 여러 대의 서버에 통신을 분배하여 처리 부하를 분산하는 기술이다.

* 부하분산 기술은 <b>DNS 라운드 로빈</b>, 서버 타입, 어플라이언스 서버타입 3종류로 나눌 수 있다.

---

# DNS 라운드 로빈

* DNS 라운드 로빈은 DNS을 이용하여 부하분산을 구현한다.

* DNS 서버에 하나의 도메인명에 여러 개의 IP 주소를 등록하고 클라이언트의 요청이 있을 시 IP 주소를 순서대로 반환하는 방식이다.

---

{% capture images %}
    /assets/img/server/server_load_balancing_technology_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

