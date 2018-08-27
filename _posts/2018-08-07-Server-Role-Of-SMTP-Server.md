---
layout: post
title:  " [사내 서버의 기본] SMTP 서버의 역할"
categories: Server
tags: Server
author: goodGid
---
* content
{:toc}



# SMTP 서버의 역할

* 메일 서비스를 제공하는 서버로 `송신`에 사용하는 `SMTP 서버`와 `수신`에 사용하는 `POP3 서버`가 있다.

* SMTP 서버는 `SMTP(Simple Mail Transfer Protocol)`라는 프로토콜을 이용하여 메일을 송신

```
SMTP 서버는 메일 SW로부터 메일을 받으면

수신자 메일의 마크(@) 뒤에 적힌 도메인명을 보고

해당 도메인명으로 된 SMTP 서버를 찾는다.

SMTP 서버를 찾을 때는 이름 해결에서 사용하는 DNS를 사용한다.

DNS에 의해 해당 도메인명의 SMTP 서버의 IP주소를 알게되면

해당 IP 주소에 대해 메일 데이터를 송신한다.
```

* <b>SMTP 서버라는 우체통에 편지를 넣으면 그 다음은 우체국이 배달해 준다.</b>

```
메일 데이터를 받은 수신자의 SMTP 서버는 수신자 메일 주소의 마크(@) 앞에 적힌 사용자명을 보고

사용자별로 마련되어 있는 스토리지 영역인 '메일 상자'에 메일 데이터를 저장한다.
```

* <b>메일 상자는 가장 가까운 우체국의 사서함을 떠올리면 된다.</b>

<br>

* 여기까지가 SMTP 그리고 SMTP 서버의 임무이다.

* 이 시점에서는 아직 상대에게 메일 데이터가 전달 X

---

# SMTP의 보안 대첵

* SMTP는 인증 기능을 갖고 있지 않기 때문에 다른 사용자를 위장하여 메일을 송신하는 부정한 이용이 가능하다.

* 이와 같은 문제를 처리하기 위해 마련된 기능이 `SMTP AUTH(SMTP 인증`와 `POP before SMTP`이다.

* `SMTP AUTH`는 메일을 송신하기 전에 사용자 ID/PW로 인증을 수행한다.

* `POP before SMTP`는 메일을 송신하기 전에 POP3 서버에서 인증을 수행한다. <br> 인증이 성공하면 <b>일정 시간 동안만</b> 동일한 호스트로부터의 메일 송신을 허가한다.



---

SMTP
{% capture images %}
    /assets/img/server/role_of_smtp_server_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

