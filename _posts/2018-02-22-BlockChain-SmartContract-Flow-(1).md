---
layout: post
title:  " SmartContract Flow (1) "
categories: BlockChain
tags: BlockChain
author: goodGid
---
* content
{:toc}

##  SmartContract Flow

{% capture images %}
/assets/img/block_chain/bc_sc_flow_1_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %} 

### 1. SmartContract 개발 환경

개발 도구와 Compiler 까지를 포함한 범위를 표시

Code를 작성하고 컴파일하면 

`Byte Code` / `Function Signature` / `ABI`를 최소한 출력


#### 1-1. Byte Code

SmartContract Code를 컴파일 한 결과

BlockChain에

Contract Creation Transaction을 발생시켜

배포하거나

Contract로의 Message Tx(트랜잭션)이나 

Call을 통해 EVM(Ethereum Virtual Machine) 위에서 실행


---

#### 1-2. Function Signature

Contract내의 함수 이름의 SHA3한 Hash값의 4Byte 값으로,

Contract의 함수를 실행시킬 때 

Transaction의 

to: 주소에는 Contract Address

data: 부분에는 이 method signature 4Byte와 함께

파라미터 값이 payload로 들어간다.


---

#### 1-3. ABI(Application Binary Interface)

\- 특정 언어나 플랫폼에 종속되지 않은 방식으로

기술된 Application Interface에 대한 정의

<br>

\- [ABI](https://www.slideshare.net/ssusere4785c/abi-34537158)는 컴파일러 혹은 ABI Generator가 출력하는데,

이 ABI에는 SmartContract의 함수와 Parameter에 대한

Metadata가 정의 되어있음.

<br>

\- ABI를 갖고 JavaScript 언어 기반의 어플리케이션을 만들 때

객체를 만들게 할 수 있고, 

쉽게 그 객체의 Method를 호출하는 것 만으로

Contract의 함수가 호출 되도록 할 수 있음

<br>

---


### 2. BlockChain Engine

\- Ethereum Node를 의미

<br>

\- 모든 Smart Contract와 관련된 Transaction 처리와 

Contract 실행을 위한 EVM은 Node가 갖고 있다.

---

### 3. Applications

\- Smart Contract는 Logic만 갖고 있다.

\- 사용자나 외부 시스템과의 

상호작용을 위해서는

당연히 Application이 필요하다.

