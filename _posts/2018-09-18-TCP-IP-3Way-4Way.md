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

* 동기화 요청을 뜻하는 **SYN**은 'Synchronize sequence numbers'의 약자이다.

* 확인, 응답을 뜻하는 **ACK**는 'Acknowledgment'의 약자이다.

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


* [STEP 1]
    - 통신을 종료하고자 클라이언트가 서버에게 **FIN 패킷**을 보내고 자신은 **FIN_WAIT_1** 상태로 대기한다.

* [STEP 2] 
    - **FIN 패킷**을 받은 서버는 해당 포트를 **CLOSE_WAIT**으로 바꾸고 
    - 서버는 일단 **ACK**를 클라이언트에게 보내고
    - ACK를 받은 클라이언트는 상태를 **FIN_WAIT_2**로 변경한다.
    - 그와 동시에 서버에서는 해당 포트에 연결되어 있는 **Application**에게 **Close()**를 요청한다.


* [STEP 3]
    - Close() 요청을 받은 Application은 종료 프로세스를 진행시켜 최종적으로 Close()가 되고
    - 서버는 **FIN 패킷**을 클라이언트에게 전송하고 상태를 **LAST_ACK** 상태로 바꾼다.

* [STEP 4]
    - 클라이언트는 **FIN_WAIT_2** 상태에서 서버가 연결을 종료했다는 신호를 기다리다가
    - **FIN**을 받으면 확인 했다는 의미로 **ACK**를 서버에게 전송한다.
    - 그리고 클라이언트는 **TIME_WAIT** 상태로 바꾼다. 
    - **TIME_WAIT**에서 일정 시간이 지나면 CLOSED 되게 된다. <small> (이 상태는 아래 질문의 답이 된다.) </small>
    - **최종 ACK**를 받은 서버는 자신의 포트도 CLOSED로 닫게 된다.


> Q. [ 필요 패킷 -> FIN 패킷 ] 순서로 클라이언트에게 전달이 이뤄져야하는데 <br> [ FIN 패킷 -> 필요 패킷 ] 순서로 전달이 이뤄졌을 경우 어떻게 해야할까?

* 서버에서 FIN 패킷을 전송하기 전에 전송한 패킷이 **Routing 지연** or **패킷 유실로 인한 재전송** 등으로 FIN 패킷보다 늦게 도착하는 상황이 발생할 수 있다.

* 클라이언트에서 세션을 종료시킨 후 뒤늦게 도착하는 패킷이 있다면 이 패킷은 **Drop**되고 **데이터**는 **유실**될 것이다. 

* 이러한 현상에 대비하여 클라이언트는 서버로부터 **FIN 패킷**을 수신하더라도 <br> 일정시간(디폴트 240초)동안 세션을 남겨놓고 잉여 패킷을 기다리는 과정을 거치게 되는데 <br> 이 과정을 **TIME_WAIT**라고 한다.

---

## 참고

* [TCP 3-way Handshake, 4-way Handshake](http://lelumiere.tistory.com/10?category=670812)

* [TCP 연결 종료와 비정상 종료 4 way handshake (FIN_WAIT_1, FIN_WAIT_2, CLOSE_WAIT, LAST_ACK, TIME_WAIT](http://hyeonstorage.tistory.com/287)

* [TCP의 3 way Handshake과 4 way Handshake](http://needjarvis.tistory.com/157)
 






