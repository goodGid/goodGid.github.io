---
layout: post
title:  " 로킹(Locking)이란 무엇인가? "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## 로킹(Locking)이란 무엇인가?

* 상호배제와 접근제어 기능

* Lock을 걸어 그 Lock을 건 트랜잭션만이 Lock을 해제 할 수 있다.

* 하나의 Transaction이 사용하는 DB내의 data를 다른 Transaction이 접근하지 못하게 Lock을 설정하여 <br> 다른 Transaction이 접근하지 못하도록 한다. 실행 완료 후엔 Lock을 해제한다.









---

## 로킹의 특징

* 로킹 단위가 크면 로크 수가 적어 관리하기 쉽지만 **병행성 수준**이 **낮아**진다.

* 로킹 단위가 작으면 로크 수가 많아 관리하기는 복잡하지만 **병행성 수준**이 **높아**집니다.
 


---


## 2단계 로킹 규약(Two-Phase Locking Protocol)

* 트랜잭션은 lock만 수행할 수 있고, unlock은 수행할 수 없는 확장 단계가 있다.

* **확장단계(Growing Phase)** 
    - Lock을 설정하는 단계
    - 새로운 lock 연산만 수행할 수 있고 unlock 연산은 수행할 수 없는 단계

* **축소단계(Shirinking Phase)**
    - Lock을 해제하는 단계
    - unlock 연산만 실행할 수 있고 일단 unlock 연산을 실행하면 lock 연산은 실행할 수 없는 단계

* **교착상태(Deadlock)**이 발생할 수있다.

* 2단계 로킹 규약 준수 o --> [직렬가능](https://goodgid.github.io/Concurrency-Control/#%EB%B3%91%ED%96%89%EC%88%98%ED%96%89%EA%B3%BC-%EC%A7%81%EB%A0%AC%EC%84%B1) <br> 2단계 로킹 규약 준수 x --> [직렬가능성](https://goodgid.github.io/Concurrency-Control/#%EB%B3%91%ED%96%89%EC%88%98%ED%96%89%EA%B3%BC-%EC%A7%81%EB%A0%AC%EC%84%B1)을 보장 할 수없다. 직렬이 가능할수도, 가능하지 않을수도....




```
로킹기법에서 2단계 로킹 규약에 대한 설명으로 옳은 것은? ①
① 트랜잭션은 lock만 수행할 수 있고, unlock은 수행할 수 없는 확장단계가 있다.
② 트랜잭션이 unlock과 lock을 동시에 수행할 수 있는 단계를 병렬전환 단계라 한다.
③ 한 트랜잭션이 unlock 후 다른 데이터 아이템을 lock 할 수 있다.
④ 교착상태를 일으키지 않는다.
```




---

## 참고

* [정보처리기사 필기 1과목 데이터베이스 요점 정리](http://yoondoyeon.tistory.com/entry/1과목-데이터베이스-요점-정리)

* [정보처리기사 - 로킹, 2단계 로킹 규약   정보처리기사](http://blog.naver.com/PostView.nhn?blogId=agopwns&logNo=220998413801&redirect=Dlog&widgetTypeCall=true)

* [[정보처리기사] 트랜잭션(Transaction) & 병행제어(Concurrency Control)](http://kdh2625.tistory.com/138)