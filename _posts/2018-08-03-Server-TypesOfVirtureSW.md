---
layout: post
title:  " [서버 준비하기] 가상화 S/W 종류 "
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# 가상화 S/W 종류

* 서버를 가상화하기 위해 필요한 S/W를 `가상화 S/W`라 한다.

* 가상화 S/W는 Application으로서 작동하는 `호스트 OS형`과 OS로서 작동하는 `하이퍼바이저형`으로 나눌 수 있다.

---

## 호스트 OS형 가상화 S/W

* 호스트 OS형은 보통의 OS(호스트 OS)에 설치된 가상화 S/W에서 가상머신(게스트 OS)을 작동시키는 가상화 기술

* 가상화 S/W뿐만 아니라 호스트 OS도 작동해야 하기 때문에 리소스를 더 많이 소비하고 처리 지연 발생


---

## 하이퍼바이저형 가상화 S/W

* 서버에 직접 설치된 가상화 S/W에서 가상 머신을 작동시키는 가상화 기술

* 하이퍼바이저형 가상화 S/W에는 호스트 OS형에 있는 호스트 OS와 게스트OS의 개념이 X

* 하이퍼바이저형 가상화 S/W는 가상화 S/W의 리소스만 소비

* 호스트 OS형과 같이 Useless 리소스를 소비하는 일 X / 처리지연 X

---


{% capture images %}
    /assets/img/server/types_of_virture_sw_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

