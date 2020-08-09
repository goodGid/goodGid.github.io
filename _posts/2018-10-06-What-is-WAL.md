---
layout: post
title:  " 로그 선행 기록(Write-Ahead Logging, WAL) "
categories: Technology
author: goodGId
---
* content
{:toc}

## 로그 선행 기록(WAL)이란?

* 로그 선행 기입(Write-Ahead Logging, WAL)은 

* DB에서 **ACID**의 특성 가운데 **원자성**과 **내구성**을 제공하는 기술의 한 계열이다.

* WAL을 사용하는 시스템에서 모든 수정은 적용을 하기전에 로그에 기록된다. 

---









* 일반적으로 redo 및 undo 정보는 둘 다 로그에 저장된다.

* 예를 들면 어느 프로그램이 특정 작업을 수행하는 동안 컴퓨터에 정전이 발생했다.

* 정전이 복구 된 후 작업을 다시 시작할 때 3가지 경우가 있을 수 있다.

<br>

1. 작업이 성공적으로 종료

2. 부분적으로 작업이 완료

3. 작업 실패

<br>

* 위와 같은 상황에서 

* 만약 WAL이 사용되었다면

* **현재까지 이뤄진 작업**과 **앞으로 해야할 작업**을 로그에서 분석하여 

* 해야할 작업만 다시 작업을 진행할 수 있게 된다.


> Q. WAL은 데이터를 업데이트하기 전에 관련 정보를 먼저 로그에 기록하는 것을 의미한다. ( O / X ) <br> A. O


---

## Reference

* [로그 선행 기입](https://ko.wikipedia.org/wiki/%EB%A1%9C%EA%B7%B8_%EC%84%A0%ED%96%89_%EA%B8%B0%EC%9E%85)