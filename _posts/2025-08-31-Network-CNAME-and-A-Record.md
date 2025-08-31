---
layout: post
title:  " A 레코드와 CNAME 레코드는 뭐가 다른걸까? "
categories: Network
author: goodGid
use_math: true
---
* content
{:toc}

## Prologue

* 회사에서 OnPrem 서버를 Kubernetes로 옮기는 작업을 하던 중

  A 레코드와 CNAME 이란 키워드가 회의 중 나왔는데

  도메인 설정 시 자주 등장하는 A 레코드와 CNAME 레코드에 대해 알아보려고 한다.

---




## A 레코드 (Address Record)

* **도메인 => IP 주소(IPv4)**를 직접 연결하는 레코드이다.

  ex) goodgid.com => 123.45.67.89

* 즉 사용자가 goodgid.com 을 입력하면 

  브라우저는 DNS 조회를 통해 바로 해당 서버의 IP로 접속한다.

* 그러므로 반드시 실제 IP 주소를 지정해야 하며

  루트 도메인(goodgid.com)에는 A 레코드를 사용한다.

---

## 루트 도메인(Root Domain)

* goodgid.com과 같은 최상위 도메인을 뜻하며

  www와 같은 서브도메인 혹은 접두사가 없는 형태를 뜻한다.  

```
- 루트 도메인 => goodgid.com
- 서브 도메인 => www.goodgid.com, blog.goodgid.com, shop.goodgid.com
```

* 위 예시에서 www는 단순히 서브도메인 중 하나일 뿐이고

  서브도메인이 없어도 사이트는 잘 동작한다.

  즉 www.goodgid.com과 goodgid.com은 서로 다른 주소지만 보통 같은 서버로 연결된다.

> 왜 이렇게 구분할까?

* DNS에서는 www, blog와 같은 접두사(prefix)를 붙여 

  여러 서비스(홈페이지, 블로그, 쇼핑몰 등)를 운영할 수 있게 해준다.

* 하지만 goodgid.com 자체는 최상위(root) 형태이므로

  특별히 다뤄져야 하므로 A 레코드로 직접 IP를 지정해야 한다.

> ??? : "특별히 다뤄져야 하므로 A 레코드로 직접 IP를 지정해야 한다."

* 사용자가 브라우저에 goodgid.com 을 입력하면 

  DNS는 곧바로 IP를 반환해야 빠르게 접속할 수 있다.

* 이때 CNAME을 쓰면 다른 도메인을 한 번 더 거쳐야 하므로 불필요한 단계가 추가된다.

  따라서 루트 도메인은 A 레코드 => IP 직결이 가장 효율적이다.

> DNS 표준 규칙 : 루트 도메인에 CNAME 금지

* 루트 도메인에는 CNAME 레코드를 둘 수 없다는 규칙이 있다.

  즉 goodgid.com 같은 루트 도메인에는 CNAME 레코드를 둘 수 없다.

* 루트 도메인에는 보통 A, MX(메일), NS(네임서버) 등 

  여러 레코드가 동시에 필요하므로

  CNAME은 다른 레코드와 공존할 수 없다는 규칙이 있다.

> ??? : "CNAME은 다른 레코드와 공존할 수 없다는 규칙이 있다."

* DNS에서 CNAME 레코드는 특정 도메인을 다른 도메인 이름으로 완전히 별칭(alias) 처리하겠다는 의미이다. 

```
www.goodgid.com  CNAME  goodgid.net
```

* 이러면 www.goodgid.com에 들어오는 요청은 실제로 goodgid.net으로 모두 전달된다.

  여기서 핵심이 **다른 레코드와 공존할 수 없다**는 점인데

  DNS에서 하나의 이름(예: www.goodgid.com)에는 CNAME 하나만 있을 수 있고 
  
  다른 레코드(A, MX, TXT 등)와 동시에 존재할 수가 없다.

* 그 이유는 CNAME이 "이 도메인은 완전히 다른 도메인으로 대체된다"라고 선언하므로

  동시에 A 레코드(IP 직접 지정)나 MX 레코드(메일 서버 지정)를 두면 충돌이 발생한다.

* 그래서 루트 도메인(goodgid.com)에는 CNAME을 못 쓰고 

  직접 A 레코드로 IP를 지정해야 한다.

> A 레코드 + 다른 레코드 (가능)

```
goodgid.com.  IN A 123.45.67.89
goodgid.com.  IN MX 10 mail.goodgid.com.
goodgid.com.  IN TXT "v=spf1 include:_spf.goodgid.com ~all"
```

* 브라우저 : A 레코드로 접속 → 123.45.67.89

* 메일 서버 : MX 레코드를 참고 → mail.goodgid.com

* 인증 : TXT 레코드 참고 → SPF 설정

> CNAME + 다른 레코드 (불가능)

```
www.goodgid.com.  IN CNAME other.goodgid.com.   ← OK
www.goodgid.com.  IN A 123.45.67.89             ← ❌ 충돌
www.goodgid.com.  IN MX 10 mail.goodgid.com.    ← ❌ 충돌
```

* CNAME은 별칭(alias)이므로 

  그 이름의 모든 질의는 CNAME 대상 도메인으로 넘어가야 하고

  같은 이름에 A, MX, TXT 등을 설정하면 DNS 표준 위반이다.

---

## CNAME 레코드 (Canonical Name Record)

* **도메인 => 다른 도메인**으로 연결하는 레코드이다.

* 즉 IP를 직접 가리키지 않고 

  이미 존재하는 다른 도메인을 참조한다.

  ex) blog.goodgid.com => ghs.googlehosted.com

* IP 주소를 몰라도 다른 도메인으로 우회해서 접속 가능하므로

  CNAME은 별칭(alias) 역할을 한다.

* 루트 도메인(goodgid.com)에는 CNAME을 사용할 수 없고

  반드시 A 레코드를 사용해야 한다.


---

## Summary

* 루트 도메인, A 레코드, CNAME 레코드 등 개념에 대해 알아봤다.

  특히 루트 도메인에서는 A 레코드를 적용해야한다는 점을 잘 이해하도록 하자! 