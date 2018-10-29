---
layout: post
title:  " Connection Timeout / Socket Timeout / Read Timeout "
categories: Network
tags: Network
author: goodGid
---
* content
{:toc}

## Connection Timeout

* 웹 브라우저가 네이버 서버에 접속하기 위해 서버와 연결된 상태가 되어야 한다. 

* **연결**을 **구성**하기 위해서 보통 **TCP Connection**과 동일하게 **3-way Handshake 방식**으로 수행하게 된다. 

* **3-way Handshake**를 **정상적**으로 **수행**하게 되면 웹 브라우저와 네이버 서버는 **연결된 상태**가 된다.

* 이 때까지 **소요된 시간**을 **Connection**에 **소요된 시간**이라고 할 수 있다. 

* 즉 **Connection Timeout**은 **Connection**을 **구성**하는데 **소요**되는 **시간의 임계치**를 의미한다.










---

## Socket Timeout

* 보통 서버는 클라이언트와 **Established** 후 데이터를 클라이언트에게 전송한다.

* 이 때 하나의 패킷이 아니라 **여러 개의 패킷**으로 나눠서 전송한다.

* 각 패킷이 전송될 때 시간 Gap이 생길 수 있는데 이 **시간의 임계치**를 **Socket Timeout**이라고 한다.

* 즉 **Socket Timeout**은 **개별 패킷**을 **기다리는 Timeout**이다. 

* **주의할 점**은 Socket Timeout이 **전체 응답**을 수신하는 Timeout이라고 생각하는 것이다. 

* 다시말해 전체 응답이 아닌 **개별 응답**에 대한 **시간 제한**이다.

* 따라서 Timeout 시간 제한이 1초이고 응답 패킷이 3개일 경우 (각 패킷 도착 시간이 0.9초 ) <br> 총 응답 시간이 2.7초가 걸리지만 Timeout이 발생하지 않는다.

![](/assets/img/network/server_various_type_of_timeout_1.png)

* 결론적으로 URL을 호출할 때에는 **Connection Timeout**과 **Socket Timeout** 설정이 **모두 필요**하다. 

> Q. 만약 두 가지 Timeout을 설정하지 않으면 어떤 일이 벌어질까?

* URL 접속시 무한 대기가 발생할 수 있다. 

---

## Read Timeout

``` java
/**
 * Sets the read timeout to a specified timeout, in
 * milliseconds. A non-zero value specifies the timeout when
 * reading from Input stream when a connection is established to a
 * resource. If the timeout expires before there is data available
 * for read, a java.net.SocketTimeoutException is raised. A
 * timeout of zero is interpreted as an infinite timeout.
 *
 *<p> Some non-standard implementation of this method ignores the
 * specified timeout. To see the read timeout set, please call
 * getReadTimeout().
 *
 * @param timeout an <code>int</code> that specifies the timeout
 * value to be used in milliseconds
 * @throws IllegalArgumentException if the timeout parameter is negative
 *
 * @see #getReadTimeout()
 * @see InputStream#read()
 * @since 1.5
 */
public void setReadTimeout(int timeout) {
   if (timeout < 0) {
      throw new IllegalArgumentException("timeout can not be negative");
   }
   readTimeout = timeout;
}
```

* **Read Timeout**은 **Socket Timeout**과 유사하다고 볼 수 있다.


---

## Connection vs Socket 

* A는 최대 10분까지 맛집을 가기위해 기다릴 생각이 있다.

* 10분을 넘게 기다렸지만 A(=클라이언트)는 맛집(=서버)을 들어가지 못해 떠났다.

* 이처럼 서버에 클라이언트가 접근을 시래했을 시 적용되는 것이 Connection Timeout이다.

* 즉 접근을 시도하는 시간 제한(=10분)이 **Connection Timeout**이 되는 것이다.

* 만약 A가 10분 안에 맛집에 들어갔다고 가정해보자.

* 그리고 A는 음식을 기다리는데 최대 5분을 소요할 생각이 있다.

* 5분이 지난 A는 그냥 가게를 나왔다. 

* 즉 클라이어트가 서버에 접속은 성공했으나 클라이언트가 원하는 요청에 대해 <br> 서버가 너무 오랫동안 응답을 못해 클라이언트가 연결을 해제하는 것이 **Read Timeou**t이다.

* 이런 경우 클라이언트는 현 상황을 오류로 인지하고(=음식이 안나옴) <br> 서버는 계속 요청(=요리중)을 수행하고 있기 때문에 요청 성공으로 인지를 한다.

* 이로인해 클라이언트와 서버간 싱크가 맞지 않아 문제가 발생할 확률이 높다.

---

## Stack OverFlow


> Q. ConnectionTimeout versus SocketTimeout


```
A connection timeout occurs only upon starting the TCP connection. 
This usually happens if the remote machine does not answer. 
This means that the server has been shut down, you used the wrong IP/DNS name, wrong port or the network connection to the server is down.

A socket timeout is dedicated to monitor the continuous incoming data flow. 
If the data flow is interrupted for the specified timeout the connection is regarded as stalled/broken. 
Of course this only works with connections where data is received all the time. 
```

<small>[번역](https://translate.google.co.kr/?hl=ko#en/ko/A%20connection%20timeout%20occurs%20only%20upon%20starting%20the%20TCP%20connection.%20This%20usually%20happens%20if%20the%20remote%20machine%20does%20not%20answer.%20This%20means%20that%20the%20server%20has%20been%20shut%20down%2C%20you%20used%20the%20wrong%20IP%2FDNS%20name%2C%20wrong%20port%20or%20the%20network%20connection%20to%20the%20server%20is%20down.%0A%0AA%20socket%20timeout%20is%20dedicated%20to%20monitor%20the%20continuous%20incoming%20data%20flow.%20If%20the%20data%20flow%20is%20interrupted%20for%20the%20specified%20timeout%20the%20connection%20is%20regarded%20as%20stalled%2Fbroken.%20Of%20course%20this%20only%20works%20with%20connections%20where%20data%20is%20received%20all%20the%20time.%0A%0ABy%20setting%20socket%20timeout%20to%201%20this%20would%20require%20that%20every%20millisecond%20new%20data%20is%20received%20(assuming%20that%20you%20read%20the%20data%20block%20wise%20and%20the%20block%20is%20large%20enough)!%0A%0AIf%20only%20the%20incoming%20stream%20stalls%20for%20more%20than%20a%20millisecond%20you%20are%20running%20into%20a%20timeout.)</small>

```
A connection timeout is the maximum amount of time that the program is willing to wait to setup a connection to another process. 
You aren't getting or posting any application data at this point, just establishing the connection, itself.

A socket timeout is the timeout when waiting for individual packets. 
It's a common misconception that a socket timeout is the timeout to receive the full response. 
So if you have a socket timeout of 1 second, and a response comprised of 3 IP packets, where each response packet takes 0.9 seconds to arrive, for a total response time of 2.7 seconds, then there will be no timeout.
```

 <small>[번역](https://translate.google.co.kr/?hl=ko&tab=TT#en/ko/A%20connection%20timeout%20is%20the%20maximum%20amount%20of%20time%20that%20the%20program%20is%20willing%20to%20wait%20to%20setup%20a%20connection%20to%20another%20process.%20You%20aren't%20getting%20or%20posting%20any%20application%20data%20at%20this%20point%2C%20just%20establishing%20the%20connection%2C%20itself.%0A%0AA%20socket%20timeout%20is%20the%20timeout%20when%20waiting%20for%20individual%20packets.%20It's%20a%20common%20misconception%20that%20a%20socket%20timeout%20is%20the%20timeout%20to%20receive%20the%20full%20response.%20So%20if%20you%20have%20a%20socket%20timeout%20of%201%20second%2C%20and%20a%20response%20comprised%20of%203%20IP%20packets%2C%20where%20each%20response%20packet%20takes%200.9%20seconds%20to%20arrive%2C%20for%20a%20total%20response%20time%20of%202.7%20seconds%2C%20then%20there%20will%20be%20no%20timeout.)</small>


---

> Q. What is the difference between connection and read timeout for sockets? 

```
The connection timeout is the timeout in making the initial connection
i.e. completing the TCP connection handshake. 
The read timeout is the timeout on waiting to read data1. 
Specifically, if the server fails to send a byte <timeout> seconds after the last byte, a read timeout error will be raised.
```

<small>[번역](https://translate.google.co.kr/?hl=ko#en/ko/The%20connection%20timeout%20is%20the%20timeout%20in%20making%20the%20initial%20connection%3B%20i.e.%20completing%20the%20TCP%20connection%20handshake.%20The%20read%20timeout%20is%20the%20timeout%20on%20waiting%20to%20read%20data1.%20Specifically%2C%20if%20the%20server%20fails%20to%20send%20a%20byte%20%3Ctimeout%3E%20seconds%20after%20the%20last%20byte%2C%20a%20read%20timeout%20error%20will%20be%20raised.)</small>


---

## 참고

* [CONNECTION TIMEOUT과 READ TIMEOUT 차이 쉽게 정리](https://inyl.github.io/programming/2017/12/02/timeout.html)

* [ConnectionTimeout과 SocketTimeout의 차이](http://tomining.tistory.com/164)

* [What is the difference between connection and read timeout for sockets?](https://stackoverflow.com/questions/3069382/what-is-the-difference-between-connection-and-read-timeout-for-sockets)

* [ConnectionTimeout versus SocketTimeout](https://stackoverflow.com/questions/7360520/connectiontimeout-versus-sockettimeout/7360916)
