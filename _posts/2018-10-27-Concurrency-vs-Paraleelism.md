---
layout: post
title:  " 동시성(Concurrency)과 병렬성(Parallelism) "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## 동시성(Concurrency)이란?

* 동시성은 **싱글 코어**에서 **멀티 쓰레드**를 동작시키기 위한 방식이다.

* 멀티 쓰레드란 **[멀티 태스킹]({{site.url}}/OS-Start-From-Multi)을 위해 여러 개의 쓰레드가 번갈아가면서 실행되는 성질**을 말한다. 

* 동시성을 이용한 싱글 코어의 멀티 태스킹은 <br> 각 쓰레드들이 병렬적으로 실행되는 것처럼 보이지만 <br> 사실은 번갈아가면서 조금씩 실행되고 있는 것이다. <br> 즉 **동시에 실행**되는 것처럼 보이는 것이다.

* 독립적으로 실행하는 프로세스들을 구성한다.

* 한 번에 여러 개를 다루는 것과 관련있다.

* 1명이 5개의 작업을 빠른 시간에 이것 저것 실행한다.

* I/O Bound <br> ex) 마우스, 키보드, 디스플레이, 디스크


![](/assets/img/posts/concurrency_vs_paraleelism_1.png)

* 동시성에서는 **문맥 교환**이 발생한다.










----

## 병렬성(Parallelism)이란?

* 병렬성은 **멀티 코어**에서 **멀티 쓰레드**를 동작시키는 방식이다.

* 한 개 이상의 쓰레드를 포함하는 각 코어들이 동시에 실행되는 성질을 말한다. 

* 멀티 코어에서도 **동시성**은 사용 가능하다.

* 병렬성은 **데이터 병렬성(Data parallelism)**과 **작업 병렬성(Task parallelism)**으로 구분된다.

* 5명이 5개의 작업을 동시에 실행한다.

* CPU Bound <br> ex) (한 번에 여러 점을 출력하는) 벡터 점 제품


![](/assets/img/posts/concurrency_vs_paraleelism_2.png)

---


### 데이터 병렬성

* 데이터 병렬성은 **전체 데이터**를 **서브 데이터들**로 나눈 후 <br> **서브 데이터들**을 **병렬 처리**하여 작업을 빠르게 수행하는 것을 말한다. 

* 자바 8에서 지원하는 병렬 스트림이 데이터 병렬성을 구현한 것이다. 

* 서브 데이터는 **멀티 코어의 수**만큼 쪼개어 <br> 각각의 데이터들을 **분리된 쓰레드에서 병렬 처리**한다.




---


### 작업 병렬성

* 작업 병렬성은 **서로 다른 작업**을 병렬 처리하는 것을 말한다. 

* 대표적인 예는 웹 서버로, 각각의 브라우저에서 요청한 내용을 개별 쓰레드에서 병렬로 처리한다.



---

## 정리


![](/assets/img/posts/concurrency_vs_paraleelism_3.png)


---

## 참고

* [동시성(Concurrency) vs 병렬성(Parallelism)](http://atin.tistory.com/567)

* [동시성(Concurrency)과 병렬성(Parallelism)](http://yolojeb.tistory.com/10)

* [동시성과 병렬성](http://ohgyun.com/741)