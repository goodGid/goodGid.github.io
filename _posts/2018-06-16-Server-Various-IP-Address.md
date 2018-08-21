---
layout: post
title:  " [네트워크 기초 지식] 여러 가지 IP 주소 "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}



# 여러 가지 IP 주소

* 사용 용도나 사용 장소에 따라 어디까지 어떻게 사용해야 하는지가 정해져 있다.

* A ~ E 클래스까지 5개의 주소 클래스로 나눌 수 있다.

* 주소 클래스는 IP 주소의 <b>32비트</b> 중 처음 1~4비트로 분류 <br> 즉 맨 처음 비트에 따라 사용할 수 있는 IP 주소의 범위가 정해짐

* 일반적으로 A ~ C 클래스 사용 <br> 차이점은 네트워크 규격의 차이이다.

* A -> B -> C 순서로 규격이 작아진다.

* D와 E는 특수한 용도로 사용하므로 일반적으로는 사용 X

* IP 주소에는 호스트부가 모두 0인 `네트워크 주소` <br> 혹은 모두 1인 `브로드캐스트 주소`등 컴퓨터에 설정할 수 없는 것도 존재한다.

---

# 사용 장소에 따른 분류

* IP 주소는 사용 장소에 따라 <br> `글로벌 IP 주소` / `프라이빗 IP 주소`로 분류

* 글로벌 IP 주소는 인터넷에서 고유한 IP 주소

* 프라이빗 IP 주소는 조직이나 가정 등의 LAN에서 자유롭게 할당해도 좋은 IP 주소

```
Class A --> 10.0.0.0 ~ 10.255.255.255

Class B --> 172.168.0.0 ~ 172.31.255.255

Class C --> 192.168.0.0 ~ 192.168.255.255
```

<br>

{% capture images %}
    /assets/img/server/various_ip_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

