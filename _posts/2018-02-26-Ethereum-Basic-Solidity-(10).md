---
layout: post
title:  " 가시성  "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}



## 가시성 (Visibility)

* 가시성 설정을 생략하면 기본으로 public으로 설정된다.

---


### * 외부 접근 가능 *

#### External (외부)

\- 변수는 external 가시성을 가질 수 없다.

\- external 함수는 컨트랙트 인터페이스의 일부가 되며

트랜잭션을 통해 외부 컨트랙트에서 이 함수를 접근(호출)할 수 있다.

\- `external` 함수는 거대한 데이터를 받을 때 `public` 함수보다 `gas`를 적게 소모한다.

---


#### Public (공개)

\- <b> public 변수는 데이터를 반환하는 public 함수(getter)가 자동으로 생성된다. </b>

\- 작은 데이터를 다룰 때 `external` 함수보다 효율적이다.

---

### * 외부 접근 불가 *

#### Internal (내부)

\- 모든 internal 변수 및 함수는 

같은 컨트랙트 or 상속된 자식 컨트랙트에서만 접근이 가능하다.

---

#### Private (비공개)

\- 오직 같은 컨트랙트 내에서만 접근이 가능하다.


---


### * 컨트랙트 내의 함수의 가시성 *


| 함수의 가시성   | 동일 컨트랙트 | 자식 컨트랙트 | 외부 컨트랙트 |
|:-------:|:-------:|:-------:|:-------:|
| External | O | O | O |
| ----
| Public | O | O | O |
| ----
| Internal | O | O | X |
| ----
| Private | O | X | X |
|=====


public변수는 `컴파일러`가 자동으로 

그 변순의 데이터를 반환하는 함수 `getter`를 만들어 준다.

변수 이름이 myVariable이면

getter는 myVariable()이 된다.

---

### * 컨트랙트 내의 변수의 가시성 *


| 함수의 가시성   | 동일 컨트랙트 | 자식 컨트랙트 | 외부 컨트랙트 |
|:-------:|:-------:|:-------:|:-------:|
| Public | O | O | O(대입은 불가능) |
| ----
| Internal | O | O | X |
| ----
| Private | O | X | X |
|=====



