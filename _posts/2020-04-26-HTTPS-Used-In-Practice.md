---
layout: post
title:  " HTTPS를 사용하면 클라이언트는 데이터를 암호화해서 전달할 필요가 있을까? "
categories: HTTP
author: goodGid
---
* content
{:toc}

## Prologue

* 다음과 같은 질문을 받았다.

* *Q. HTTPS를 사용하면 클라가 데이터를 암호화해서 전달할 필요가 있나?*

* 위 질문에 대해 고민을 해보고 깨달은 바가 있어서 글을 작성하게 되었다.

* 우선 이 질문에 대한 답은 없다.

  다만 답이 될 수 있는 후보 중에 하나에 대해 글을 작성하고자 한다.




---

## HTTPS 개념

* HTTPS를 사용하면 모든 HTTP 요청과 응답 데이터는 네트워크로 보내지기 전에 암호화된다.

* HTTPS는 HTTP의 아래 계층인 **보안 계층**에서 동작한다.

* 이 보안 계층은 안전 소켓 계층(Secure Sockets Layer, **SSL**) 혹은 

  그를 계승한 전송 계층 보안(Transport Layer Security, **TLS**)을 이용하여 구현된다.

![](/assets/img/http/HTTPS-Used-In-Practice_1.png)



---


## 할 필요 없는 거 아니야 ?

* 사실 보안 계층에서 암호화를 해주니까 

  클라가 굳이 암호화를 해서 보낼 필요가 없지 않을까?라고 생각했다.

* 그런데 다른 사람의 의견이 듣고 싶어서

  팀에서 Infra를 담당하시는 팀원분(= H)에게 똑같은 질문을 여쭤봤다.

  팀원분의 대답은 나와는 깊이의 차이가 느껴졌다.

```
H : 
HTTPS 통신은 
어플리케이션 계층(=HTTP 계층)에서 암호화가 풀리기 때문에 
예를 들어 Client -> Nginx(SSL Termination) -> WAS
이렇게 가는 경로가 있다면 Nginx에서 암호화가 풀려버려요.
그 말은 Nginx -> WAS 구간은 안전하지 않다를 의미해요.
즉 HTTPS는 SSL Handshake 구간에서만 적용되는 암호화라고 생각해야 해요.

goodGid :
그러면 만약 
Client -> WAS로 요청이 이뤄지고
SSL Handshake가 형성되었다면 
Client가 굳이 암호화해서 보낼 필요가 없다고 볼 수도 있겠네요?

H :
네.

goodGid : 
아하 Client -> Nginx 대해서만 
SSL Handshake가 형성되었기 때문에 
Nginx -> WAS 구간은 보안을 장담 못 한다.
라고 이해하면 될까요?

H :
네. 그래서 요즘에는 SSL 처리하는 부분을 WAS 앞단에 두는 게 일반적이에요.
ex) Client -> SSL 처리 모듈(ex g/w, loadbalacer 등등) -> WAS 구조
왜냐하면 SSL 처리하는 게 CPU 리소스도 많이 먹기도 하고 별도의 관리도 필요하거든요.
```

* 필자는 단편적으로 클라이언트의 요청이 서버로 간다고 생각했다.

* 하지만 팀원분은 좀 더 거시적으로 상황을 가정하고 답변을 주셨다.





---

## 그래서 암호화를 해야 한다는 거야 ?

* 상황에 따라 다르다고 대답할 수 있겠다.

* 요즘에는 하나의 요청이 여러 곳을 거쳐서 도착한다.

* 그 관점에서 생각한다면 암호화는 언제 어디서 어떻게 노출될지 모른다.

* 그러므로 100% 장담을 할 수 없다면 암호화를 하는 게 맞다고 생각한다.

* 왜냐하면 다음과 같은 상황이라면 데이터가 노출되기 때문이다.

![](/assets/img/http/HTTPS-Used-In-Practice_2.png)


---

## Summary 

* *Q. HTTPS를 사용하면 클라가 데이터를 암호화해서 전달할 필요가 있나?*

* 굉장히 많은 생각과 흥미로움을 불러일으킨 질문이었다.

* 다시 한 번 HTTPS에 관해 공부도 하게 되었고

  네트워크라는 게 정말 복잡하고 고려해야 할 변수가 너무나도 많구나를 깨닫게 해주었다.

  그리고 무엇보다 HTTPS 사용하는 데 있어 숙련도가 한층 높아진 느낌이다. ㅎㅎ 

+

* 위 질문에 대해 다양한 의견을 듣고 싶다.

  가능하다면 댓글로 의견을 공유해줬으면 좋겠다 ! 


---

## Reference

* [HTTPS   Secure Hypertext Transfer Protocol   HTTP 보안계층 구현](http://www.ktword.co.kr/abbr_view.php?m_temp1=3132)