---
layout: post
title:  " [OS] Multi Processing, Multi Core, Multi Tasking, Multi Programming 개념 학습하기 "
categories: OS
author: goodGid
---
* content
{:toc}

> 이 글은 [운영체제 공룡책](https://bit.ly/3myTXlX) 강의를 듣고 정리한 내용입니다.

## Multi Processing

![](/assets/img/os/OS-Concepts-Starting-with-Multi_1.png)

* CPU가 1개가 아니라 여러 개다.

* 즉 registers와 cache를 

  독립적으로 가진 CPU가 **1개의 메모리**에 연결이 되어있다.

* 예를 들어 슈퍼 컴퓨터에는 CPU가 900만 장이 있다.

* ref : [19:00](https://www.inflearn.com/course/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%EA%B3%B5%EB%A3%A1%EC%B1%85-%EC%A0%84%EA%B3%B5%EA%B0%95%EC%9D%98/lecture/63028?tab=note&speed=1.75)




---

## Multi Core

![](/assets/img/os/OS-Concepts-Starting-with-Multi_2.png)

* CPU를 각각 구성하는 건 비용이 많이 드니까

  CPU 칩 안에 registers와 cache를 갖고있는 
  
  **Core만** 따로 회로로 구성하자는 아이디어이다.

* 즉 같은 프로세서 칩 1개에서 

  여러개의 코어가 붙어있는 구조이다. 

* 그래서 실제로 컴퓨터에는 CPU 칩을 1개만 꽂지만

  그 안에 코어가 여러 개 있는 구조이다.

  ex) 코어가 2개라면 듀얼 코어

  ex) 코어가 4개라면 쿼드 코어 

* ref : [20:00](https://www.inflearn.com/course/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%EA%B3%B5%EB%A3%A1%EC%B1%85-%EC%A0%84%EA%B3%B5%EA%B0%95%EC%9D%98/lecture/63028?tab=note&speed=1.75)

---

## Multi Tasking & Multi Programming

![](/assets/img/os/OS-Concepts-Starting-with-Multi_3.png)

* 메모리에 여러 프로그램을 올려 사용하는 구조를 

  Multi Tasking = Multi Programming 이라 부른다.

* 메모리에 여러 개의 프로세스를 동시에 올리고

  CPU는 **시분할**로 여러 프로세스를 실행시킨다.

  (= **Concurrency**하게 실행시킨다.)

  그래서 CPU 사용 효율을 높일 수 있다.

* 정리하자면 다음과 같다.

```
하나의 메모리에 동시에 여러 개 프로세스를 올린다.
(= Multi Programming)

Multi Programming 된 메모리를 대상으로
CPU가 시분할로 여러 프로세스를 빠르게 처리한다.
(= Multi Tasking, Concurrency)
```

* ref : [21:13](https://www.inflearn.com/course/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%EA%B3%B5%EB%A3%A1%EC%B1%85-%EC%A0%84%EA%B3%B5%EA%B0%95%EC%9D%98/lecture/63028?tab=note&speed=1.75)

---

## Reference

* [운영체제 공룡책 강의](https://bit.ly/3myTXlX)
