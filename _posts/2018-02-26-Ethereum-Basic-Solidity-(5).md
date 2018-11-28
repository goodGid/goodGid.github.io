---
layout: post
title:  " 맵핑(Mapping) (중요)  "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}


## 맵핑(Mapping)

맵핑은 특별한 자료형으로

배열이 대괄호 안에서

0,1,2, ...의 [ 색인(index),데이터 ]의 쌍이라고 한다면,

`맵핑`은 `[ 키(key), 데이터 ]`의 쌍이라고 할 수 있다.

`키`는 `정수형`뿐 아니라 `주소형`도 사용할 수 있다.

맵핑은 `상태 변수`로만 사용이 가능하며 

지역 변수로 사용 시 참조하게 된다.

```
         키 자료형               맵핑 이름
mapping (key type => data type) name
                      데이터 자료형
```

맵핑은 키와 데이터를 이용하여

선언, 접근, 대입이 가능하다.


``` js

1 pragma solidity ^0.4.8; 
2 
3 contract Example4 {
4     mapping (address => uint) public balances;
5
6     function setBalance (uint input) {
7         balances[msg.sender] = input;
8     }
9 }

```

위 예제에서 `msg.sender`는 `컨트랙트를 실행`시킨 `사람의 주소`를 의미한다.

7행에서 setBalance 함수를 실행하면

msg.sender와 입력받은 input으로 [키, 데이터] 쌍을 만들어

맵핑 balances에 삽입한다.

이미 있다면, 기존 데이터를 input으로 대체하게 된다.

<br>

`맵핑의 키`에는 

맵핑, 동적 배열, 스마트 컨트랙트, 구조체를 제외한 모든 자료형을 사용할 수 있다.

`맵핑의 값`은

맵핑을 포함한 모든 자료형을 사용할 수 있다.

<br>

4행처럼 `맵핑`에 `public 키워드`를 붙이면

자동으로 값을 반환할 수 있는 `함수(getter)`가 되는데,

맵핑의 getter는 조금 어렵다.

<br>

이 함수는 `매개 변수`로 원래 맵핑의 `키의 자료형`을 따르고

`반환할 때`는 `값의 자료형`을 따르게 된다.

만약 반환 값이 또 맵핑이면 

getter는 입력 매개변수가 2개 이상이 될 수 있고,

각 키에 해당하는 자료형을 따른다.

<br>

`맵핑`은 `해시`에 의해 `암호화`되는 `해시 테이블`이라고 할 수 있다.

다만 맵핑에 키의 본래 값이 저장되지 않고

대신에 키의 해시 값이 저장되는 차이점이 있다.

그래서 맵핑의 길이를 조회할 수 없으며

for문과 같은 반복문 사용이 불가능하다.