---
layout: post
title:  " HDLC(High-level Data Link Control)프로토콜이란? "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## HDLC란 무엇인가?

* 컴퓨터 데이터 통신에 적합한 전송제어방식
     - 점대점,다중점 링크 상에서 반이중,전이중 통신을 모두 지원하도록 설계됨








---

## HDLC의 특징

* 비트(Bit)위주의 프로토콜, 각각의 프레임에 데이터의 흐름을 제어하며 오류를 검출할 수 있는 비트 열을 삽입해 전송

* 포인트 투 포인트 및 멀티 포인트, 루프 방식에서 모두 사용 가능

* 단방향, 반이중, 전이중 통신을 모두 지원하며, **동기식 전송 방식**을 사용

* 오류 제어를 위해 **[Go-Back-N ARQ](https://goodgid.github.io/Error-Flow-Control/#go-back-n-arq-gbn-arq)**와 **[선택적 재전송(Selective Repeat) ARQ](https://goodgid.github.io/Error-Flow-Control/#selective-rejectsr-arq)**를 사용

* 흐름 제어를 위해 **[슬라이딩 윈도우 방식](https://goodgid.github.io/Error-Flow-Control/#%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%94%A9-%EC%9C%88%EB%8F%84%EC%9A%B0sliding-window)**을 사용

* 전송 제어상의 제한을 받지 않고 자유롭게 비트 정보를 전송할 수 있는 것을 **비트 투과성(투명성)**이라 함

* 비트 투과성(투명성)을 보장하기 위한 기능으로 **비트 스터핑(Bit Stuffing)**이 사용됨

* **전송 효율**과 **신뢰성**이 높음

---

## 비트 스터핑(Bit Stuffing)

* 프레임 구조의 앞과 뒤를 구분하는 비트 열로 '01111110'으로 구성되어 있다. 

* FLAG 비트 열의 역할은 통신 회선을 공유하는 모든 다른 프레임들과 구분하는 비트 열로 

* 송신측에서는 송신하기 전에 송신 메시지의 앞과 뒤에 '01111110' 을 추가하여 전송한다. 

* 또한 FLAG 비트를 제외한 모든 비트는 연속된 '1'의 비트가 6개 이상이 되지 않도록 <br> '0'을 강제적으로 추가하여 송신한다. 

* 수신측은 FLAG 비트를 제외한 비트 열에 '1'의 문자가 연속적으로 5개가 입력되면 <br> 5개 다음에 입력된 '0' 비트를 제거한다. 

* 이처럼 '0'을 삽입하고 '0'을 제거하여 기본적인 오류를 검출하고 <br> 신뢰성 있는 송·수신이 되도록 하는 기능을 **비트 투과성/투명성(Bit transparency)**이라고 한다.


---

## HDLC 프레임 구조 

![](/assets/img/posts/what_is_hdlc_1.png)

<center><small> "주제"넘는 "정보"를 달라하네 라고 외워보는건 어떨까?  </small></center>

* 플래그(Flag) : 프레임의 시작과 끝을 나타내는 고유한 비트 패턴(01111110)으로 혼선을 방지하기 위해 동기 유지

* FCS(프레임 검사 순서 필드) : 프레임 내용에 대한 오류 검출을 위해 사용되는 부분으로 일반적으로 CRC 코드가 사용됨

![](/assets/img/posts/what_is_hdlc_2.png)


<br>


![](/assets/img/posts/what_is_hdlc_3.png)



---

## 참고

* [HDLC   High-level Data-Link Control   하이레벨 데이터링크 제어 절차](http://www.ktword.co.kr/abbr_view.php/abbr_view.php?m_temp1=89&m_search=%ED%95%98)

* [HDLC 프레임 전송모드 특징](https://m.blog.naver.com/PostView.nhn?blogId=c_18&logNo=220687580321&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F)