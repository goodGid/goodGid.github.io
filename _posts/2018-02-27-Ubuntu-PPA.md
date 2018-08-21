---
layout: post
title:  " Ubuntu :: PPA(Personal Package Archive) "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}


## What is PPA(Personal Package Archive)?

일반적으로 Ubuntu 소프트웨어 센터에서 다운로드 받을수 있는 각종 패키지의 버전들은 최신의 것들이 아니다. 

우분투는 6개월 주기로 새로운 버전이 출시된다.

이렇게 새로운 버전이 나올때마다 

사용하던 소프트웨어들도 함께 최신버전으로 탑재된다. 

그렇게 되면 소프트웨어들도 6개월씩 기다려야하게 되는 경우가 생긴다.

예를 들어

기존에 사용하던 프로그램이 이미 업데이트 되었는데도

6개월이나 기다려야 된다.

<br>

이를 극복하기 위한 방법으로 `PPA(Personal Package Archive)`를 통해 최신 버전들을 다운로드 할 수 있다.

<br>

그렇다면 PPA는 무엇일까?

Ubuntu에서 소프트웨어를 설치하는 것은 윈도우나 Mac과는 다르다. 

인터넷에서 일일이 패키지를 찾아서 다운받지 않고 

Ubuntu 소프트웨어 센터에서 

원하는 모든 것들을 검색하고 설치할 수 있다.

<br> 

게다가 저장소에 있는 소프트웨어들은 

아무 웹사이트에서 다운받은 EXE 파일들보다 훨씬 안정성있다. 

기본적으로 Ubuntu 소프트웨어 센터의 소프트웨어들은 

우분투 팀에 의해서 미리 안전하고 안정적이라고 판단되는 것들만 모여있기 때문이다.

<br>

하지만 이것이 항상 좋기만 한 것은 아니다.

바로 소프트웨어의 최신버전이 나와도 

우분투의 다음버전까지 기다려야 하기 때문이다.

그래서 필요한 기능이 바로 PPA이다.



---


## PPA 사용하기


* 저장소 추가하기

sudo add-apt-repository 저장소이름

<br>

* 저장소 업데이트

sudo apt-get update

<br>

* 설치

sudo apt-get install XXXXX

---


* 해외 PPA 검색 : [https://launchpad.net/ubuntu](https://launchpad.net/ubuntu)

* 국내 PPA 사이트 : [https://launchpad.net/~ubuntu-ko/+archive/ppa](https://launchpad.net/~ubuntu-ko/+archive/ppa)

