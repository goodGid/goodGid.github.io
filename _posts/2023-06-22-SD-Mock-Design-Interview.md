---
layout: post
title:  " [시스템 설계 (System Design) - 한번에 인터뷰 합격하기] 4강 : 모의 설계 인터뷰 "
categories: SystemDesign
author: goodGid
---
* content
{:toc}

> 이 글은 [강의](https://www.udemy.com/course/best-system-design-interview) 내용을 토대로 작성하였습니다.

---

## 모의 면접 : URL 단축 서비스

### 301 vs 302

* HTTP Status 301

  요청한 리소스가 새로운 위치로 영구적으로 이동되었음을 뜻함
  
  브라우저가 캐시 할 수 있음

* HTTP Status 302
  
  요청한 리소스가 일시적으로 다른 위치에 있음을 뜻함
  
  매번 서버에 요청을 해야 함



---

## 강의 자료 복사본: 시스템 설계

### 정규화 데이터  vs 비정규화 데이터

![](/assets/img/sd/SD-Mock-Design-Interview_1.png)

* Q. 비정규화 데이터 대신 정규화된 데이터 표현을 사용한 이유는?

  식당과 클라이언트에 대한 정보를 필요에 따라 DB에서 조회하는 방식이 편리함
  
  DB앞 캐시를 둬서 조회 가능 + 편리함
  
  또한 공간의 절약
  
  고객의 연락처 등 데이터 변경 시 비정규화된 데이터 전체를 업데이트할 필요 X

---

### Geo Routing

![](/assets/img/sd/SD-Mock-Design-Interview_2.png)

* 시스템 설계 시 좋은 **Keyword** 이지 않을까? 란 생각이 듦

---

## Refernece

* [시스템 설계 (System Design) - 한번에 인터뷰 합격하기](https://www.udemy.com/course/best-system-design-interview)