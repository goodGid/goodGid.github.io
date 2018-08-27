---
layout: post
title:  " 추상 컨트랙트 & 인터페이스 "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}


## 추상 컨트랙트 (Abstract contract)

객체 지향 언어의 추상 객체와 비슷하게,

솔리디티도 추상컨트랙트를 지원한다.

추상 컨트랙트 자체는 생성할 수 없고,

컨트랙트를 만드는 기초틀로 활용된다.

<br>

단순하게 컨트랙트 내부에서 

하나 이상의 함수가 `추상 함수`이면 

자동으로 `추상 컨트랙트`가 된다.

<br>

`추상 함수`는 

단지 `함수의 이름`과 `입력 매개 변수` 및 `출력 매개 변수`만 `선언`해 두고

내용은 없는 함수이다.

내용이 없기 때문에 중괄호 없이 끝에 `;`만 붙이면 된다.

```
           함수 이름              옵션
function    name (x1,...,xN)  option   returns (y1, ... , yN);
                  입력 매개 변수                    출력 매개 변수
```



---


## 인터페이스 (Interface)

인터페이스는 더 엄격한 추상 컨트랙트라고 보면 된다.

추상 컨트랙트는 자식 컨트랙트를 위한

틀의 역할 + 자체 기능도 있는 컨트랙트이지만, ( 추상 컨트랙트 = 추상 함수 + 비추상 함수)

인터페이스는 순수하게 기능 없이 틀 역할만 한다.

틀만 잡고 싶을 때는 인터페이스가 훨씬 유용하다.

인터페이스 내에는 

모든 함수가 `추상 함수`여야 하고, 

다른 컨트랙트나 인터페이스를 상속받을 수 없다.

또한 자체 생성자, 변수, 구조체 및 나열형을 정의할 수 없다

사용법은 `contract` 키워드 대신 `interface` 키워드를 사용한다.

``` js

pragma solidity ^0.4.11;

interface BankingSystem {
    function deposit (uint) returns (uint);
    function withdraw (uint) returns (uint);
}


```