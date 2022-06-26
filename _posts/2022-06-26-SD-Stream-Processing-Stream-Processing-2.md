---
layout: post
title:  " [데이터 중심 애플리케이션 설계] 11장. 스트림 처리 : 3. 스트림 처리 - 2편 "
categories: SystemDesign
author: goodGid
---
* content
{:toc}

> 이 글은 [책](https://book.naver.com/bookdb/book_detail.nhn?bid=13483879) 내용을 토대로 작성하였습니다.

## 목차

1. [이벤트 스트림 전송 - 1편]({{site.url}}/SD-Stream-Processing-Event-Stram-Send-1)

2. [이벤트 스트림 전송 - 2편]({{site.url}}/SD-Stream-Processing-Event-Stram-Send-2)

3. [DB와 스트림 - 1편]({{site.url}}/SD-Stream-Processing-DB-and-Stream-1)

4. [DB와 스트림 - 2편]({{site.url}}/SD-Stream-Processing-DB-and-Stream-2)

5. [스트림 처리 - 1편]({{site.url}}/SD-Stream-Processing-Stream-Processing-1)

6. [스트림 처리 - 2편]({{site.url}}/SD-Stream-Processing-Stream-Processing-2)

---

## 내결함성

* 스트림 처리자가 어떻게 **결함**에 견디는지 알아본다.

---

### 마이크로 일괄 처라와 체크포인트

* 스트림은 무한하다.

  그러므로 스트림의 시작과 끝을 정하여 작은 블록으로 쪼갠 후
  
  각 블록을 일괄 처리하듯이 다루는 방법을

  **마이크로 일괄 처리(Microbatching)**라 한다.

  ex) 스파크 스트리밍

* 마이크로 일괄 처리의 크기는 일반적으로 약 1초 정도로 설정한다.

  사이즈가 작으면 스케줄링 + 코디네이션 비용이 커진다.

  사이즈가 커지면 처리 결과를 보기까지 지연시간이 발생한다.

* 만약 설정한 크기에서 한 번에 처리를 못 할 땐

  작업 수행 후 상태를 명시적으로 다음 작업으로 넘긴다. (= **체크포인트**)



---

> 한계

* 작업을 완료 후 해당 출력을 소비하려는 객체에 데이터를 보냈는데

  (ex. 디비에 기록, 외부 메시지 브로커에 데이터 전송 등)

  알고보니 잘못된 데이터를 보냈을 경우

  스트림을 처리하는 객체에는 마땅한 방법이 없다.

* 만약 로직을 수정하여 재시도하더라도 

  외부 객체에는 2개의 데이터를 보내게 된다.

* 이런 문제를 방지하기 위해선 **성공했을 경우**에만 출력할 수 있도록 해야 한다.

* 이와 관련된 개념으로는 **원자적 커밋**을 할 수 있도록 하거나

  혹은 **멱등성** 개념을 활용할 수 있다.

---

## Refernece

* [데이터 중심 애플리케이션 설계](https://book.naver.com/bookdb/book_detail.nhn?bid=13483879)