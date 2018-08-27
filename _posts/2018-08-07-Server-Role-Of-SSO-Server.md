---
layout: post
title:  " [사내 서버의 기본] SSO 서버의 역할"
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}


# SSO 서버의 역할

* `SSO(Single Sign On`란 한 번의 사용자 인증으로 여러 시스템에 액세스할 수 있도록 하는 장치

* 시스템의 수가 많은 대기업에서 주로 사용

* SSO 서버는 여러 시스템의 인증 처리를 대행해 줌으로써 <br> 사용자를 번거롭게 하는 비밀번호 관리에서 해방시켜준다.

* SSO 서버는 시스템과 어떻게 연결할지에 따라 `에이전트형`과 `리버스 프록시형`으로 크게 나눈다.

* `에이전트형`은 시스템을 구축할 서버에 인증 모듈을 인스톨하고 <br> 모듈을 경유하여 SSO 서버와 인증 정보를 주고받음으로써 SSO를 구현

* `리버스 프록시형`은 SSO 서버가 사용자의 인증 요청을 받아 뒤에 있는 웹 서버에 중계함으로써 SSO를 구현

---

# 다요소 인증으로 보안 레벨을 올린다.

* 일원 관리는 편리함을 낳음과 동시에 그 곳을 털리면 관리가 붕괴되어 버리는 큰 취약성을 지닌다.

* SSO의 생명선은 SSO 서버에 로그인하는 사용자명과 비밀번호이다.

* 이 둘이 유출되면 연계하고 있는 모든 시스템에 손쉽게 액세스할 수 있게 되므로 <br> 단순한 비밀번호 인증뿐만 아니라 2단계 인증이나 원타임 비밀번호 등을 조합하는 `다요소 인증`을 함께 검토할 필요가 있다.

---


{% capture images %}
    /assets/img/server/role_of_sso_server_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

