---
layout: post
title:  " 배열 - (1) (중요) "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}



## 고정 바이트 배열(Fixed-size byte arrays)

데이터의 기본 단위는 비트(bit)이다.

8개 비트 = 1바이트가 된다.

byte 형태로도 변수를 선언할 수 있다.

이 때 크기를 고정할 수 있는데,

(byte = byte1), byte2, ... ,byte32로 

1 ~ 32 바이트까지 고정된 바이트 크기를 갖는

배열을 선언할 수 있다.


---


## 동적 바이트 배열(Dynamically-sized byte arrys)

```
             변수명            초기화할 길이
bytes momory name = new bytes(length);
```

동적 바이트 배열은 상태 변수로 선언될 때를 제외하고

지역 변수로 선언되는 경우,

무조건 `memory`로 선언되어야 한다.

``` js

1  pragma solidity ^0.4.8; 
2 
3  contract Example4 {
4     function byteExample( ) {
5         byte2 staticByteArray;
6         staticByteArray = "staticByteArray";
7         
8         bytes memory dynamicByteArray = new bytes[2];
9         dynamicByteArray = "dynamicByteArray";
10     }
11 }

```

5행에서 2바이트의 크기의 byte2형으로

staticByteArray라는 변수를 선언하였다.

하지만 6행에서 15바이트의 문자열이 입력되어 오류가 발생한다.

(영문은 글자당 1바이트, 한글은 글자당 3바이트)

마찬가지로

8행에서 2바이트의 크기로 dynamicByteArray라는 변수를 선언하였다.

하지만 9행에서 16바이트의 문자열을 입력하였지만 

오류가 나지 않는다.

<br>

동적 바이트 배열은 초기화된 크기보다 

큰 데이터가 입력되면 동적으로 크기를 조정한다.

하지만 고정 바이트 배열보다 

많은 gas가 소모된다.



