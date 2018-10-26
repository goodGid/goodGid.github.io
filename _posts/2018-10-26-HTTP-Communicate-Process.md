---
layout: post
title:  " HTTP을 사용한 통신 과정 "
categories: Network
tags: Network
author: goodGid
---
* content
{:toc}

## HTTP란?

* HTTP는 Hypertext Transfer Protocol의 약자로 인터넷상에서 데이터를 주고받기 위한 프로토콜이다.

* **데이터**는 오디오 / 비디오 / 이미지 / 텍스트 등 어떠한 데이터의 종류를 가리지 않는다.

* 모두 HTTP 프로토콜을 이용해 전달하고 전달 받을 수 있다. 

* 브라우저는 HTTP 통신을 통해서 사이트 문서를 가져오고 이를 해석해 화면에 출력하게 된다.

![](/assets/img/network/http_communicate_process_1.png)









---

* 이때 [TCP/IP 계층]({{site.URL}}/OSI-7-Layer/#tcpip-모델)의 순서로 네트워크에 접근하게 되는데 <br> HTTP 프로토콜은 4계층(Application)에 속해 있다. 

* 4계층에서 **정보**를 만들어 전달하면 3계층(Transport)에서 **통신 노드**를 **연결**하고 <br> 2계층(Internet)에서 통신노드간 **패킷**을 **전송**과 **라우팅**하고 <br> 1계층(Network Interface)에서 **전기적 신호**로 **변환**하여 실제로 전달한다. 

* 받는 쪽에서는 반대로 해석한다.

![](/assets/img/network/http_communicate_process_2.png)

---

* 모든 컴퓨터와 서버는 네트워크를 통해 외부에서 접근하려면 IP주소가 필요하다. 

* 하지만 사용자는 브라우저를 이용해 문자 URL을 전달한다. 

* 때문에 이를 해석하기위해 **DNS 서버**로 접근하여 해당 도메인 네임에 맞는 IP를 받아온다. 

* 이 과정을 [이름 해결]({{site.URL}}/Server-DNS/#dns-서버는-2종류)이라 부르며 UDP 통신을 한다.

* 받은 IP를 가지고 한번에 서버에 접근할수 없으며 <br> IP를 알고있는 다른 서버에 접근하면서 경유하여 접근하게 된다. 


---



## 브라우저는 서버에게 어떻게 데이터를 받아올까?

* 브라우저는 서버에게 웹사이트 문서를 받아오기위해 <br> 클라이언트에서 Request 요청을 만들어 서버에게 전달한다. 

* 서버는 클라이언의 Request를 해석하고 <br> 요청에 해당하는 Response를 전달하게 된다.

* 클라이언트에서는 서버에서 전달해준 Response를 이용해 화면에 표현하게 된다.

![](/assets/img/network/http_communicate_process_3.png)


* HTTP 프로토콜의 데이터 형식은 크게 **Header**와 **Body**로 구성되어 있다. 

* Header에는 **서버**가 인식할 수 있는 **약속된 형식**을 따라야한다.

![](/assets/img/network/http_communicate_process_4.png)

---

## Request Header

* 해당 형식으로 표현된 데이터를 전달하면 서버에서는 해당 형식을 해석하고 Response를 전달한다.


1. GET / HTTP/1.1 : HTTP전송 방법과 프로토콜 버전

2. Host: 요청하는 서버 주소

3. User-Agent: OS/브라우저 정보

4. Accept: 클라이언트 이해 가능한 컨텐츠 타입

5. Accept-Language: 클라이언트 인식 언어

6. Accept-Encoding: 클라이언트 인코딩 방법

7. Connection: 전송 완료후 접속 유지 정보 (keep-alive)

8. Upgrade-Insecure-Requests:신호를 보낼때 데이터 암호화 여부

9. Content-Type: 클라이언트에게 반환되어야하는 컨텐츠 유형

10. Content-Length: 본문크기



---


## Response Header


1. HTTP/1.1 200 ok : 프로토콜 버전과 응답상태

2. Access-Control-Allow-Origin: 서버에 타 사이트의 접근을 제한하는 방침

3. Connection: 전송 완료후 접속 유지 정보 (keep-alive)

4. Content-Encoding: 미디어 타입을 압축한 방법

5. Date: 헤더가 만들어진 시간

6. ETag: 버전의 리소스를 식별하는 식별자

7. Keep-Alive: 연결에대한 타임아웃과 요청 최대 개수 정보

8. Last-Modified: 웹 시간을 가지고 있다 수정되었을때만 데이터 변경 ( 캐시연관 )

9. Server: 웹서버로 사용되는 프로그램 이름

10. Set-Cookie: 쿠키 정보

11. Transfer-Encoding: 인코딩 형식 지정

12. X-Frame-Options: frame/iframe/object 허용 여부


















## 질문

> Q. 사용자가 웹 브라우저를 통해 서버에 이미지를 요청해서 사용자에게 보여주기까지 과정을 설명하시오.

* google.png 이미지를 브라우저에서 보기까지 과정에 대해 알아보자.

![](/assets/img/network/http_communicate_process_5.png)


* www.google.com에 접속하면 index.html을 받아온다. 

* 여기 안에 이미지로 https://www.google.com/images/google.png가 들어있다. 

* 웹 브라우저는 html파일을 읽어서 해석을 하는데 **이미지 주소**가 나오면 해당 **URL로 서버에 요청**을 보낸다.

* 요청을 주고받는 과정을 일련의 **트랜잭션**이라고 칭한다.

* 위 구글 첫 화면이 나오는 과정에서 이미지 요청을 보내고 받았기 때문에 트랜잭션이 일어났다고 볼 수 있다.

* 이미지에 대한 트렌잭션뿐만 아니라 html페이지도 트랜잭션이 이뤄졌다.

* 이처럼 1개의 페이지를 보여주는데도 **많은 수의 트랜잭션**이 발생한다.

<br>

* 여기선 HTTP 통신을 이용하기 때문에 **HTTP 트랜잭션**이라 부른다.

* HTTP 트랜잭션은 **HTTP 메세지(HTTP Message)**라고 불리는 데이터 덩어리를 이용해 이루어진다. 

<br>

* 이걸 좀 정리를 해보면 다음과 같다.

1. 웹 브라우저가 https://www.google.com/images/google.png로 이미지를 요청 해야한다는 것을 인지한다.

2. 웹 브라우저는 URL을 이용해 서버의 ip를 추출한다. <br> DNS 서버에 요청을 하게 되고 이 때 ip를 찾기위한 **[이름 해결]({{site.URL}}/Server-DNS/#dns-서버는-2종류/)** 과정은 UDP 통신으로 이루어 진다.

3. 이미지를 요청하기 위한 HTTP 메세지를 만든다.

4. 메세지는 get메서드이고 /google.png를 요청하는 메세지이다.

5. 웹브라우저는 서버와 TCP 3Way Handshaking 방식으로 커넥션을 생성한다.

6. 웹브라우저는 서버에 HTTP요청을 보낸다.

7. 서버는 메세지를 받고 HTTP 메세지를 해석한다. <br> get이라는 메서드이고 /google.png라는 파일을 요청 했다는 것을 인지한다.

8. 서버는 해당 리소스가 있는지 찾는다.

9. 찾으면 상태코드가 200인 메세지와 함께 응답 메세지를 작성 후 클라이언트에게 전송한다.

10. 서버는 클라이언트와 TCP 4Way Handshaking 방식으로 커넥션을 종료한다.

11. 이미지를 받은 클라이언트는 웹 브라우저에 이미지를 띄우고 사용자에게 보여준다.

* 여기서 중요 포인트는 **TCP 커넥션 과정**과 **HTTP 요청/응답**을 보내는 부분이다. 



![](/assets/img/network/http_communicate_process_6.png)




---

## 참고

* [코딩 면접 질문들 - 사용자가 웹브라우저를 통해 서버에 이미지를 요청해서 사용자에게 보여주기까지 과정](http://krksap.tistory.com/1148)

* [패킷으로 보는 초간략 HTTP 통신 과정 (TCP 계층)](http://codetronik.tistory.com/88)

* [Website는 어떻게 보여지게되는 걸까? — ( 1 )](https://medium.com/@pks2974/website%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%B3%B4%EC%97%AC%EC%A7%80%EA%B2%8C%EB%90%98%EB%8A%94-%EA%B1%B8%EA%B9%8C-1-108009d4bdb)
