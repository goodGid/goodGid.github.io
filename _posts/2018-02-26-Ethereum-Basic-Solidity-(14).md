---
layout: post
title:  " 대비책 함수 (Fallback Function) & 오류 처리 (Error Handling) "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}


## 대비책 함수 (fallback Function)

컨트랙트는 딱 하나의 이름 없는 함수를 가질 수 있는데,

이 함수가 `fallback` 함수이다.

<br>

외부에서 어떤 함수를 실행시키는 과정에서,

함수를 못 찾는 오류가 발생하면 

`fallback` 함수가 대신 실행된다.

<br>

또한 컨트랙트가 payable 함수를 거치지 않고

순수하게 Ether를 전송받는 경우도

fallback함수가 실행된다.

<br>

이 때 컨트랙트의 fallback 함수가 없으면,

오류가 발생하고 Ether는 반송되므로

컨트랙트가 함수를 거치지 않고 Ether를 받고 싶으면 반드시

fallback 함수를 구현해야한다.

---

## 오류 처리 (Error Handling)

필요에 따라 특수 함수를 사용하여

강제로 예외를 발생시켜 프로그램을 종료할 수 있다.

이러한 코드를 오류 처리라 하며

솔리디티언어에서는 다음과 같은 함수를 제공한다.

### 1. assert(bool condition)

condition이 false면

프로그램 코드의 실행을 포기한다.

`내부적인 오류`에 사용된다.

### 2. require(bool condition)

condition이 false면

프로그램 코드의 실행을 포기한다.

`외부적인 오류`에 사용된다.

### 3. revert()

프로그램 코드의 실행을 포기하고,

상태 변화를 return한다.

`revert`는 예외를 발생시켜 프로그램 코드를 종료시키지만,

미사용 gas를 환급한다.



