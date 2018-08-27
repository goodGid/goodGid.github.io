---
layout: post
title:  " 기본 자료형  "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}


# 기본 자료형 

솔리디티 언어는

스마트 컨트랙트에 최적화된 자료형을 지원한다.

변수를 선언하는 방법은 다음과 같다

```
자료형  변수명  데이터
type  name = data;
```

<br>

변수 선언시 데이터는 `생략`할 수 있지만,

자료형과 변수명은 `필수`적이다.

그리고 `constant` 키워드를 붙여서 

`상수`로 선언할 수 있다.

이 때는 데이터를 생략할 수 없고

반드시 넣어 줘야한다.

---


## 정수형 (int, uint)

현재까지 스마트 컨트랙트는 

실수형 데이터는 지원하지만 자료형은 지원하지 않는다.

<br>

부호 있는 정수 int = int256

--> 메모리 영역 내에서 256비트(=32바이트)

부호 없는 정수 uint = uint256 

--> 메모리 영역 내에서 256비트(=32바이트)

<br>

솔리디티 언어가 지원하는 정수형의 크기는

8비트, 16비트, 24비트, 32비트, 256비트까지 다양하다.

사실 128비트 이상의 자료형을 사용하면

컨트랙트를 작성하는데 필요한 모든 정수를 소화할 수 있다.



<br>

``` js

pragma solidity ^0.4.0; 

contract Example4 {

    function exampleIntUint() {
        int n = 1;
        uint un = 1;

        int result1 = n / 1;
        uint result2 = n / 1;
        
    }   
}

```

Error가 발생한다.

int / uint는 지원하는 범위가 다르기 때문이다.

int --> 음수 지원 o

uint --> 음수 지원 x


---

## 참거짓형 (bool)

true : 참

false : 거짓

---

## 나열형 (enum)

나열형은 개발자가 정의할 수 있는 자료형으로,

특정한 값들만 갖는 변수를 만들고 싶을 때

유용한 자료형이다.

``` js

enum Tier {Bronze, Silver, Gold, Platinum, Diamond}

Tier a = Tier.Bronze;
Tier b = Tier.Gold;
Tier c = Tier.Diamond;

```


---

## 주소형(address) 기초

주소는 `20바이트` 크기의 자료형으로

address 키워드로 선언하며

컨트랙트의 주소를 저장할 때 사용한다.

주소는 `40자리의 16진수 정수`로 표현된다.

<br>

주소의 다양함 함수(기능)

1. balance : 해당 지갑이나 컨트랙트의 이더 잔고를 조회할 때 사용

2. transfer, send : 해당 지갑이나 컨트랙트로 이더를 송금할 때 사용

    transfer : 송금이 실패할 경우 즉시 오류를 발생시켜 컨트랙트 실행을 취소

    send : 오류를 발생시키지 않고 false만 반환




``` js

pragma solidity ^0.4.0; 

contract Example4 {

    function exampleAddress() public {
        address sender = this;              // this는 현재 컨트랙트를 나타낸다.
        address recipient = 0xABC;

        recipient.transfer(5);
    }   
}

```

---


## 튜플 (Tuple)

크기가 컴파일 전에 미리 정해진 데이터들의 묶음

각 데이터가 `다른 자료형`이여도 상관없다.

`괄호`로 묶어서 선언한다.


``` js

pragma solidity ^0.4.0; 

contract Example4 {

    function f() public {
        var (x, y, z) = (1, 2, true);
        (x, y) = (y, x);
        var (a, b) = (x, y);
    }   
}


```