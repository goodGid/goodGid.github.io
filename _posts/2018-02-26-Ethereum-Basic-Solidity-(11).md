---
layout: post
title:  " 블록과 거래 속성들  "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}


## 블록 속성들

블록과 거래(transaction)의 속성을 가져올 수 있는 변수 및 함수이다.

#### 1. block.blockhash(uint blockNumber) returns (byte32)

입력한 blockNumber번째의 `블록`의 `해시 값`을 반환한다.

다만 현재 블록을 포함한 

최근 256개의 블록에서만 동작한다.

#### 2. block.coinbase(address)

현재 블록의 채굴자 주소를 반환한다.

#### 3. block.difficulty(uint)

현재 블록의 채굴 난이도를 반환한다.

#### 4. block.gaslimit(uint)

현재 블록의 gas limit값을 반환한다.

#### 5. block.number(uint)

현배 블록이 몇 번째 블록인지에 대한 순번을 반환한다.

#### 6. block.timestamp(uint)

현재 블록의 타임스탬프(채굴된 시기)를 반환한다.


---


## 거래 속성들

#### 1. msg.data(bytes)

메시지에 있는 데이터 전체를 반환한다.

#### 2. msg.gas(uint)

메시지의 남은 gas를 반환한다.

#### 3. msg.sender(address)

메시지를 보낸 송신자의 주소를 반환한다.

즉 현재 스마트 컨트랙트를 실행시킨 사용자의 주소를 반환한다.

#### 4. msg.sig(bytes4)

메시지에 있는 처음 4byte의 데이터를 반환한다.

이 `4byte`는 `함수의 식별자`이다.

#### 5. msg.value(uint)

메시지의 송금액을 wei 단위로 반환한다.

이 변수는 

현재 스마트 컨트랙트 스스로의 잔고에 송금되는 이더의 양에 따라

함수의 행동을 다르게 하기 위해 쓰이거나,

은행 시스템(예금과 출금)을 가진 스마트 컨트랙에서 쓰인다.

#### 6. now(uint)

block.timestamp()와 같다.

#### 7. tx.gasprice(uint)

거래의 gas 가격을 반환한다.


#### 8. tx.origin(address)

거래를 보낸 송신자의 주소를 반환한다.

