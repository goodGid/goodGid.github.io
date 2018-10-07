---
layout: post
title:  " 로그 선행 기록(Write-Ahead Logging, WAL) "
categories: Technology
tags: Technology
author: goodGId
---
* content
{:toc}

## 로그 선행 기록(WAL)이란?

* 로그 선행 기입(Write-Ahead Logging, WAL)은 데이터베이스 시스템에서 **ACID**의 특성 가운데 **원자성**과 **내구성**을 제공하는 기술의 한 계열이다.

* WAL을 사용하는 시스템에서 **모든 수정**은 **적용 이전**에 **로그**에 **기록**된다. 











* 일반적으로 redo 및 undo 정보는 둘 다 로그에 저장된다.

* 한 예로 어느 프로그램이 특정 작업을 수행하는 동안 컴퓨터에 정전이 일어났다고 하자. 

* 다시 시작할 때 프로그램은 어느 작업이 수행을 성공적으로 마쳤는지, 절반 성공했는지, 아니면 실패했는지를 잘 알고 있어야 한다. 

* 로그 선행 기입이 사용된다면 프로그램은 이러한 로그를 검사하여 예기치 않은 정전 시 해야할 일과 실제로 했던 일을 비교하게 된다.


> Q. WAL은 데이터를 업데이트하기 전에 관련 정보를 먼저 로그에 기록하는 것을 의미한다. ( O / X ) <br> A. O


---

## 참고

* [로그 선행 기입](https://ko.wikipedia.org/wiki/%EB%A1%9C%EA%B7%B8_%EC%84%A0%ED%96%89_%EA%B8%B0%EC%9E%85)