---
layout: post
title:  " [공개 서버의 기본] SSL 서버의 역할"
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# SSL 서버의 역할

* SSL 서버 = 웹 서버 SW + SSL SW

* SSL은 데이터를 암호화하거나 통신 상대를 인증함으로써 데이터를 보호

* 대표적으로는 오픈소스인 `OpenSSL` 있다.

---

# SSL로 보호할 수 있는 위협

## 1. 암호화

* 정해진 규칙에 근거하여 데이터를 변환하는 기술

* 제 3자가 데이터를 훔쳐보는 `도청` 방지 가능

## 2. 메시지 다이제스트

* 데이터로부터 고정 길이 데이터(해시값)를 꺼내는 계산

* 데이터 송수신시 해시값을 계산하여 그 값의 유무로 판단

* 제 3자가 데이터를 바꿔 쓰는 `변조` 방지 가능

## 3. 디지털 증명서

* 해당 컴퓨터가 진짜인지를 증명하는 파일

* 통신 상대가 진짜인지를 확인함으로써 `위장` 방지 가능

---

{% capture images %}
    /assets/img/server/role_of_ssl_server_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

