---
layout: post
title:  " [OS] 얼마나 자주 컨텍스트 스위칭(Context Switching)이 발생할까? "
categories: OS
author: goodGid
---
* content
{:toc}

> 이 글은 [운영체제 공룡책](https://bit.ly/3myTXlX) 강의를 듣고 정리한 내용입니다.

## Context Switching

* OS에서 컨텍스트 스위칭은 필연적으로 발생한다.

  ( 컨텍스트 스위칭 개념은 여기서 다루지 않는다. )

  그렇다면 얼마나 일어나는지 명령어를 통해 확인해보자 !

* 2가지를 확인해 본다.

1. 컨텍스트 스위칭이 얼마나 일어나는가

2. 해당 프로세스는 몇 번의 선점/비선점을 당하였는가



---

## CMD

### vmstat

* **vmstat**는 가상 메모리의 상태를 확인할 수 있는 명령어이다.

  그리고 출력되는 여러 상태 중 몇 번의 Context Switching이 발생했는지도 알 수 있다.

  // CS = Context Switching

* vmstat 사용법으로는 *vmstat x y* 형식이며
  
  x초씩 y번 가상 메모리 상태를 출력시켜준다.

> man vmstat

```
## NAME
vmstat - Report virtual memory statistics

## SYNOPSIS
vmstat [options] [delay [count]]

## DESCRIPTION
vmstat reports information about processes, memory, paging, block IO, traps, disks and cpu activity.
The  first report produced gives averages since the last reboot.
Additional reports give information on a sampling period of length delay.  
The process and memory reports are instantaneous in either case
```


> vmstat 1 10

![](/assets/img/os/OS-How-Often-Do-Context-Switches-Occur_1.png)

* 1초씩 10번 가상 메모리의 상태를 출력한다.

  그리고 결괏값을 보면 
  
  1초마다 0 -> 107 -> 125 -> ... -> 117 -> 241번의 

  컨텍스트 스위칭이 발생했음을 확인할 수 있다.

---

### 선점 vs 비선점

* 현재 CPU를 점유하고 있는 프로세스는 

  선점 혹은 비선점 방식으로 컨텍스트 스위칭이 발생한다.

* 여기서 **/proc/{Process ID}/stats** 명령어를 사용하여

  해당 프로세스가 몇 번의 선점/비선점을 당했는지 Count를 알 수 있다.

> /proc/1/stats

![](/assets/img/os/OS-How-Often-Do-Context-Switches-Occur_2.png)

* Process ID가 1인 프로세스에 관해 확인하려고 한다.

  가장 상단에 Name을 보면 해당 프로세스의 이름은 systemd 이고

  하단을 보면 **voluntary_ctxt_switches(= 비선점)**과 **nonvoluntary_ctxt_switches(= 선점)**의 Count를 볼 수 있다.

* 해석해 보자면 systemd 프로세스는

  비선점에 의한 컨텍스트 스위칭이 발생 횟수는 4704517번이고

  선점에 의한 컨텍스트 스위칭은 174165번 발생했다.

---

## Summary

* 컨텍스트 스위칭과 관련된 정보를 어떻게 확인할 수 있는지 알아봤다.

  *vmstat* 와 */proc/{PID}/status* 명령어를 기억해두자 !

* 참고 : 이 글에서 다루는 개념은 [강의(14분 30초)](https://www.inflearn.com/course/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%EA%B3%B5%EB%A3%A1%EC%B1%85-%EC%A0%84%EA%B3%B5%EA%B0%95%EC%9D%98/lecture/63033?tab=note&speed=1.75)를 참고하였습니다.



---

## Reference

* [운영체제 공룡책 강의](https://bit.ly/3myTXlX)
