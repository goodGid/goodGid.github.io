---
layout: post
title:  " 하나의 토픽에 다수의 컨슈머 그룹 (Multiple consumer groups in one topic) "
categories: Kafka
tags: Kafka
author: goodGid
---
* content
{:toc}

> 이 글의 코드 및 정보들은 [책](https://book.naver.com/bookdb/book_detail.nhn?bid=13540082)을 바탕으로 작성하였습니다.

## 1 토픽 : N 컨슈머 그룹

![](/assets/img/kafka/Kafka-Consumer-Group_6.png)

* 컨슈머 그룹마다

* 각자의 오프셋을 별도로 관리하기 때문에

* 하나의 토픽에

* 복수의 컨슈머 그룹이 연결되어도

* 다른 컨슈머 그룹에게 영향 없이 

* 메시지를 가져갈 수 있다.

* 보다 자세한 개념은

* [Kafka Commit & Offset]({{site.url}}/Kafka-Commit-Offset/)글을 참고하자.

---

## 참고

* [카프카, 데이터 플랫폼의 최강자 실시간 비동기 스트리밍 솔루션 카프카의 기본부터 확장 응용까지](https://book.naver.com/bookdb/book_detail.nhn?bid=13540082)