---
layout: post
title:  " [Java Optimizing] 3. 하드웨어와 운영체제 : CPU 사용률 알아보기 "
categories: Java_Optimizing
author: goodGid
---
* content
{:toc}

> 이 글은 [자바 최적화 (Optimizing Java,가장 빠른 성능을 구현하는 검증된 10가지 기법)](https://book.naver.com/bookdb/book_detail.nhn?bid=14796595) 책을 학습한 내용을 토대로 작성되었습니다.

## Prologue

* 성능 진단의 첫 단추는 어느 리소스가 한계에 다다랐는지 밝히는 일이다.

  부족한 리소스를 제대로 알지 못하면서 성능을 제대로 튜닝할 수는 없다.

---


## CPU 사용률

> CPU 사이클은 어플리케이션이 가장 갈증을 느끼는 리소스이다.

* CPU의 효율적 사용은 성능 향상의 **지름길**이다.

* **[vmstat](https://linux.die.net/man/8/vmstat)** 툴을 이용해 CPU의 현재 성능에 대해 체크해볼 수 있다.

* *vmstat 1* 을 명령어로 입력하면 

  스냅샷을 1버만 찍는 게 아니라 1초마다 1번씩 스냅 샷을 찍는다.

  그러므로 성능 테스트 시 실시간으로 CPU 변화를 체크할 수 있다.


---

## vmstat 섹션

* vmstat의 다양한 **섹션**이 있다.

  각 섹션에 대해 알아본다.

![](/assets/img/java_optimizing/Java-Optimizing-HW-and-OS-CPU-Utilization-Monitoring_1.png)

### proc

* 실행 가능한(r) 프로세스

  블로킹된(b) 프로세스 개수를 나타낸다.

---

### memory

* 스왑 메모리 (swpd)

  미사용 메모리 (free)
  
  버퍼로 사용한 메모리 (buff)
  
  캐시로 사용한 메모리 (cache)가 표시된다.

---

### swap

* 디스크로 교체되어 들어간(Swap-In) 메모리 (si)

  디스크에서 교체되어 빠져나온(Swap-Out) 메모리(so) 정보를 나타낸다.

* 참고로 최신 서버급 머신은 보통 

  스왑이 많이 일어나지 않는다.


---

### io

* 블록-인(bi), 블록-아웃(bo) 개수는 

  각각 블록(I/O) 장치에서 받은 

  512바이트 블록, 블록 장치로 보낸 512바이트 블록 개수이다.

---

### system

* 인터럽트(in) 및 초당 Context Switching 교환(cs) 횟수이다.

---

### cpu

* CPU와 직접 연관된 지표를 CPU 사용률(%)로 표기한다.

  유저 시간 (us)

  커널 시간 (sy, 시스템 타임(System Time))

  유휴 시간 (id)

  대기 시간 (wa)

  도둑맞은 시간 (st, 가상 머신에 할애된 시간)이 표시된다.

---

### 한계

* 어떤 프로세스에서 Context Switching 비율이 높게 나타나면

  I/O에서 블로킹이 일어났거나

  **스레드 락 경합** 상황이 벌어졌을 가능성이 크다.

* 그러나 vmstat 출력 결과만 봐서는 

  문제 포인트를 인지하는 데 한계가 있다.

  왜냐하면 I/O 작업 실태를 실시간으로 보여주니

  I/O 문제 감지에는 좋으나

  스레드 락 경합과 같은 실태를 보여주진 못한다.

* 그러므로 이런 상황에서는

  실행 프로세스의 스레드 상태를 보여주는 툴(ex VisualVM)을 사용하는 게 좋다.

---

## Summary

* vmstat 툴에 대해 알아봤다.

  특히 섹션의 값들이 어떤 의미인지에 대해 집중적으로 알아봤는데

  실제로 해석하는 게 더 중요한 부분이다.

  Best Practice는 [How to read Vmstat output](https://access.redhat.com/solutions/1160343) 글을 참고하자.

---

## Reference

* [자바 최적화 (Optimizing Java,가장 빠른 성능을 구현하는 검증된 10가지 기법)](https://book.naver.com/bookdb/book_detail.nhn?bid=14796595)