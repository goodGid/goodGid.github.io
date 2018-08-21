---
layout: post
title:  " [사내 서버의 기본] DHCP 서버의 역할 "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# DHCP 서버의 역할

* DHCP 서버는 네트워크와 관련된 설정 정보를 DHCP 클라이언트에게 배포하는 서버

* 컴퓨터에 IP 주소를 할당하는 방법으로는 `정적 할당`과 `동적 할당`이 존재

* `정적 할당`은 수동으로 IP 주소를 설정하는 방법
    - 서버나 네트워크 기기 등 동일한 IP 주소를 계속 사용해야하는 기기에서 사용

<br>

* `동적 할당`은 서버가 클라이언트에 대해 IP주소, 서브넷 마스크, 기본 게이트웨이 등과 같은 <br> 네트워크와 관련된 설정 정보를 배포하여 자동으로 설정하는 방법
    - `DHCP(Dynamic Host Configuration Protocol)`는 `동적 할당`으로 IP주소를 배포할 때 사용하는 프로토콜이다.
    - `DHCP`를 사용하면 번잡한 IP 주소 관리를 편하게 사용 + 부족한 IP 주소를 활용


---

# 어드레스 풀에서 IP주소를 배포한다.

* DHCP 서버는 다음과 같은 설정을 해준다.

```
배포할 IP 주소의 범위
192.168.0.2 ~ 192.168.0.100/24

배포해서는 안 되는 IP 주소의 범위
192.168.0.101 ~ 192.168.0.255/24

배포할 IP 주소의 유효기간
1일

기본 게이트웨에의 IP 주소
192.168.0.1

DNS 서버의 IP 주소
192.168.0.1
```

* 설정 정보를 받은 클라이언트는 리스 기간이 경과 or 네트워크 연결이 해제되면 배포받은 설정 정보를 반환

---


{% capture images %}
    /assets/img/server/dhcp_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

