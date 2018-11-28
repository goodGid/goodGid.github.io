---
layout: post
title:  " TCP 3-way Handshake, 4-way Handshake "
categories: Network
tags: Network
author: goodGid
---
* content
{:toc}

## TCP/IP의 개념

* TCP/IP는 네트워크를 상호 연결시켜 정보를 전송 할 수 있도록 하는 기능을 가진 다수의 프로토콜이 모여있는 프로토콜 집합이다.

* 인터넷은 **데이터 링크 계층**을 지원하는 네트워크를 **TCP/IP 프로토콜**을 이용하여 상호 연결하는 네트워크이다.

* 인터넷 상의 서로 다른 OS를 쓰는 컴퓨터간 데이터 전송을 가능하게 하는 정보 전송을 위한 인터넷 표준 프로토콜이다.

![](/assets/img/network/tcp_ip_3way_4way_3.png)











* 한마디로, 네트워크를 **상호 연결(서로간에 연결)** 시켜 전송 할 수 있도록 다양한 기능을 가진 프로토콜 집합체이다.

* TCP/IP는 OSI 7 Layer처럼 **추상적인 레이어 역할**을 하는 것이 아닌 **실용적인 네트워크 연결**을 위해 만들어졌다.


---

## TCP 3 Way Handshake

* **TCP 3 Way Handshake**는 **전송 계층**의 **TCP/IP 프로토콜**을 이용해서 통신을 하는 응용프로그램이 <br> 데이터를 전송하기 전에 **정확한 전송**을 보장하기 위해 상대방 컴퓨터와 사전에 **세션**을 **수립**하는 과정을 의미한다. 

* 한마디로 **신뢰성**을 보장하기위해 사용한다.

* 확인, 응답을 뜻하는 **ACK**는 'Acknowledgment'의 약자이다.
    - 신뢰적 데이터 전송을 위해 사용된다.

* 동기화 요청을 뜻하는 **SYN**은 'Synchronize sequence numbers'의 약자이다.
    - 이 때 SYN 패킷의 Sequence Number는 난수를 이용해 생성한다.
    - 처음 클라이언트에서 SYN 패킷을 보낼 때 Sequence Number에는 랜덤한 숫자가 담겨진다. 
    - 초기 **Sequence Number**를 **ISN**이라고 한다. 
    - ISN이 0부터 시작하지 않고 난수를 생성해서 number를 설정하는 이유는 무엇일까?
    - Connection을 맺을 때 사용하는 포트(port)는 유한 범위 내에서 사용하고 시간이 지남에 따라 재사용된다. 
    - 따라서 두 통신 호스트가 과거에 사용된 포트 번호 쌍을 사용하는 가능성이 존재한다. 
    - 서버 측에서는 패킷의 SYN을 보고 패킷을 구분하게 되는데 난수가 아닌 순차적인 number가 전송된다면 이전의 connection으로부터 오는 패킷으로 인식할 수 있다. 
    - 이러한 **문제**가 **발생할 가능성**을 줄이기 위해서 **난수**로 **ISN**을 설정하는 것이다.

---

## 3-way Handshaking 역할

* 3-Way Handshaking 세션을 **수립**하기 위해 수행되는 절차이다.

* TCP는 장치들 사이에 논리적인 접속을 성립(Establish)하기 위하여 3-way Handshaking 사용한다.

* 양쪽 모두 데이터를 전송할 준비가 되었다는 것을 보장하고 <br> 실제로 데이터 전달이 시작하기전에 한쪽이 다른 쪽이 준비되었다는 것을 알 수 있도록 한다.

* 양쪽 모두 상대편에 대한 초기 **순차 일련 변호**를 얻을 수 있도록 한다. 


![](/assets/img/network/tcp_ip_3way_4way_1.png)


---

## 3-way Handshaking 과정

```
Client > Server : TCP SYN
Server > Client : TCP SYN ACK
Client > Server : TCP ACK
```
* [STEP 1]
    - A 클라이언트는 B 서버에 접속을 요청하는 **SYN 패킷**을 보낸다. 
    - 이때 A 클라이언트는 **SYN**을 보내고 **SYN/ACK** 응답을 기다리는 **SYN_SENT** 상태가 된다.


* [STEP 2] 
    - B 서버는 **SYN**요청을 받고 A 클라이언트에게 요청을 수락한다는 **ACK** <br> 클라이언트도 포트를 열어달라는 **SYN**가 설정된 **패킷**을 발송하고 A가 다시 **ACK**으로 응답하기를 기다린다. 
    - 이때 B 서버는 **SYN_RECEIVED** 상태가 된다.



* [STEP 3]
    - A 클라이언트는 B 서버에게 **ACK**을 보내고 이후부터는 연결이 이루어지고 데이터를 주고 받을 수 있게 된다.
    - 이때의 B 서버 상태가 **ESTABLISHED**이다.


* 위 같은 방식으로 통신하는 것이 **신뢰성**있는 연결을 맺어 준다는 **TCP의 3 Way handshake**방식이다.



---

## 4-way Handshaking 역할

* 4-Way Handshaking 세션을 **종료**하기 위해 수행되는 절차이다.

![](/assets/img/network/tcp_ip_3way_4way_2.png)

---

## 4-way Handshaking 과정

![](/assets/img/network/tcp_ip_3way_4way_4.png)

* 최초에는 서로 통신 상태이기 때문에 양쪽이 ESTABLISHED 상태이다.

* 한 가지 주의할 점은 일반적으로 클라이언트가 FIN을 보내고 서버가 그 패킷을 받는 그림으로 4 way Handshaking을 학습하는데 

* 무조건 클라이언트만 FIN 패킷을 보내는 것은 아니다.

* 따라서 클라이언트와 서버가 아닌 **Active Close(또는 Initiator, 기존 클라이언트)**와 **Passive Close(또는 Receiver, 기존 서버)**로 표현하는 것이 정확하다.

* 서버가 먼저 종료하겠다고 FIN을 보낼 수 있고 이런 경우 서버가 FIN_WAIT1 상태가 된다. 

* [STEP 1]
    - 통신을 종료하고자 클라이언트가 서버에게 **FIN 패킷**을 보내고 자신은 **FIN_WAIT_1** 상태로 대기한다.

* [STEP 2] 
    - **FIN 패킷**을 받은 서버는 해당 포트를 **CLOSE_WAIT** 상태로 바꾸고 
    - 서버는 일단 **ACK**를 클라이언트에게 보내고
    - ACK를 받은 클라이언트는 상태를 **FIN_WAIT_2** 상태로 변경한다.
    - 그와 동시에 서버에서는 해당 포트에 연결되어 있는 **Application**에게 **Close()**를 요청한다.


* [STEP 3]
    - Close() 요청을 받은 Application은 종료 프로세스를 진행시켜 최종적으로 Close()가 되고
    - 서버는 **FIN 패킷**을 클라이언트에게 전송하고 상태를 **LAST_ACK** 상태로 바꾼다.

* [STEP 4]
    - 클라이언트는 **FIN_WAIT_2** 상태에서 서버가 연결을 종료했다는 신호를 기다리다가
    - **FIN**을 받으면 확인 했다는 의미로 **ACK**를 서버에게 전송한다.
    - 그리고 클라이언트는 **TIME_WAIT** 상태로 바꾼다. 
    - **TIME_WAIT** 상태에서 일정 시간이 지나면 CLOSED 되게 된다. <small> (이 상태는 아래 질문의 답이 된다.) </small>
    - **최종 ACK**를 받은 서버는 자신의 포트도 CLOSED로 닫게 된다.

<br>

> Q. [ 필요 패킷 -> FIN 패킷 ] 순서로 클라이언트에게 전달이 이뤄져야하는데 <br> [ FIN 패킷 -> 필요 패킷 ] 순서로 전달이 이뤄졌을 경우 어떻게 해야할까?

* 서버에서 FIN 패킷을 전송하기 전에 <br> 전송한 패킷이 **Routing 지연** or **패킷 유실로 인한 재전송** 등으로 <br> FIN 패킷보다 늦게 도착하는 상황이 발생할 수 있다.

* 클라이언트에서 세션을 종료시킨 후 뒤늦게 도착하는 패킷이 있다면 <br> 이 패킷은 **Drop**되고 **데이터**는 **유실**될 것이다. 

* 이러한 현상에 대비하여 클라이언트는 서버로부터 **FIN 패킷**을 수신하더라도 <br> 일정시간(디폴트 240초)동안 세션을 남겨놓고 잉여 패킷을 기다리는 과정을 거치게 되는데 <br> 이 과정을 **TIME_WAIT**라고 한다.





> Q. [비정상 종료 상황] 다양한 상황에 따른 연결의 종료를 적절하게 처리하지 못하여 CLOSE_WAIT 상태로 남아있는 상황

* Application에서 close()를 적절하게 처리해주지 못하면 <br> TCP 포트는 CLOSE_WAIT 상태로 계속 기다리게 된다. 

* 이렇게 CLOSE_WAIT 상태가 statement에 많아지게 되면 <br> Hang이 걸려 더이상 연결을 하지 못하는 경우가 생기기도 한다. 

* 따라서 어플리케이션 개발시 여러 상황에 따라 close() 처리를 잘 해줘야 한다.





> Q. [비정상 종료 상황] 다양한 상황에 따른 연결의 종료를 적절하게 처리하지 못하여 FIN_WAIT_1 상태로 남아있는 상황

* FIN_WAIT_1 상태라는 것은 상대방측에 커넥션 종료 요청을 했는데 <br> ACK를 받지 못한 상태로 기다리고 있는 것이다. 

* 이것은 아마 서버를 찾을 수 없는 것으로 **네트워크 및 방화벽**의 문제일 수 있다.

* FIN_WAIT_1의 상태는 일정 시간이 지나면 **Time Out**이 되면 스스로 Closed하게 된다.





> Q. [비정상 종료 상황] 다양한 상황에 따른 연결의 종료를 적절하게 처리하지 못하여 FIN_WAIT_2 상태로 남아있는 상황

* FIN_WAIT_2 상태는 클라이언트가 서버에 종료를 요청한 후 <br> 서버에서 요청을 접수했다고 ACK를 받았지만 <br> 서버에서 종료를 완료했다는 FIN 을 받지 못하고 기다리고 있는 상태이다. 

* 이 상태는 양방의 두번의 통신이 이루어졌기 때문에 **네트워크의 문제**는 **아닌 것**으로 판단된다.

* 서버측에서 CLOSE를 처리하지 못하는 경우일 수도 있다. 

* FIN_WAIT_2 역시 일정 시간이 지나면 **Time Out**이 되면 스스로 Closed하게 된다.

<br>

* 어떠한 이유에서 FIN_WAIT_1과 FIN_WAIT_2 상태인 연결이 많이 남아있다면 문제가 발생할 수 있다. 

* 물론 일정 시간이 지나 Time Out이 되면 연결이 자동으로 종료되긴 하지만 <br> 이 Time Out이 길어져 많은 수의 소켓이 늘어나게 되면 **메모리 부족**으로 더 이상 소켓을 오픈하지 못하는 경우가 발생한다.

* 이 경우는 **네트워크나 방화벽** 또는 **Application**에서 close()처리 등에 대한 문제등으로 발생할 수 있으며 원인을 찾기가 쉽지 않다.

 * 이러한 문제 해결을 위해서 FIN_WAIT_1과 FIN_WAIT_2 의 **Time Out** 시간을 적절히 조절할 필요가 있다.





---

## 참고

* [TCP 3-way Handshake, 4-way Handshake](http://lelumiere.tistory.com/10?category=670812)

* [TCP 연결 종료와 비정상 종료 4 way handshake (FIN_WAIT_1, FIN_WAIT_2, CLOSE_WAIT, LAST_ACK, TIME_WAIT](http://hyeonstorage.tistory.com/287)

* [TCP의 3 way Handshake과 4 way Handshake](http://needjarvis.tistory.com/157)
 
* [CLOSE_WAIT & TIME_WAIT 최종 분석](http://tech.kakao.com/2016/04/21/closewait-timewait/)

* [[TCP] 3-way-handshake & 4-way-handshake](http://asfirstalways.tistory.com/356)

* [네트워크 :: 네트워크?](https://woovictory.github.io/2018/05/17/network/)


