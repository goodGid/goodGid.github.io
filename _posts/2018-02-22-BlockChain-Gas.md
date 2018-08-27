---
layout: post
title:  " Gas "
categories: BlockChain
tags: BlockChain
author: goodGid
---
* content
{:toc}

## What is Gas ?

\- 모든 이더리움 플랫폼에서

Transaction을 실행하기 위한

네트워크 수수료의 단위

<br>

\- EVM 네트워크의 낭비를 막고, 

채굴자들에게 보상으로 쓰여진다.

<br>

\- EVM Bytecode를 실행할 때

`Gas`가 사용된다.

<br>

즉 EVM은 공짜가 아니다.

Gas는 무분별한 EVM 사용을 막을 수 있다.

1. 개발자가 Solidity로 Smart Contract 작성

2. Smart Contract는 Compiler에 의해 EVM Bytecode로 변환

3. EVM Bytecode가 EVM에 의해 실행. <br> 이 때 Gas를 지불


<br>

### Gas의 가격

\- 특정 동작(Operation)에 따라 

필요한 Computational Power는 다른데

동영상 인코딩은 CPU의 작업이 많이 필요하고,

간단한 문서작업은 CPU가 적게 필요하다.

<br>

\- 이 방식을 EVM의 수수료 책정에도 똑같이 적용되어,

간단한 계산일수록 적은 수수료가 필요하고,

복잡한 계산일수록 많은 수수료를 지불한다.

<br>

\- 이더리움 블록의 사이즈가 정해져 있어

Gas의 비용을 높게 책정할수록 

빠르게 블럭에 포함될 수 있다.

이는 채굴자가 Gas를 채굴 보상으로 받기 때문이다.

<br>

\- 채굴 보상을 늘리기 위해서는

Gas 비용을 많이 책정한 Transaction을 먼저 처리해주는 것이 이득이다.

<br>

\- Gas Limit은 Transaction에 사용할 수 있는

최대한의 Gas비용을 설정해둠으로써,

Transaction 처리를 보장할 수 있다.

그러나

그 비용을 초과하면 Transaction은 중단되고,

Gas만 소모된다.

<br>

\- 많은 Transaction이 한 번에 처리되어야 할 때,

높은 Gas Limit을 설정하는 것이 필요하다.



