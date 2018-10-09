---
layout: post
title:  " 상속  "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}



## 상속 (Inheritance)

솔리디티는 `다중 상속`과 `다형성`을 지원한다.

상속을 하려면, 자식 컨트랙트 이름 뒤에 

`is 부모_컨트랙트_이름`를 적으면 된다.

이때 상속 명단에 적는 순서가 굉장히 중요하다.

순서에 따라서 부모의 컨트랙트의 코드가 복사되는데,

순서가 잘못되면 컴파일 오류가 날 수도 있고

의미가 완전히 바뀔 수 있다.


---

## 오버라이드 (Override)

원래 부모가 가진 함수를 `오버라이드` 하려면,

같은 이름의 함수를 선언하면 된다.

`입력 매개 변수`는 부모 함수와 달라도 괜찮지만,

`출력 매개 변수`는 완전히 같아야 한다.


``` js

pragma solidity ^0.4.11;

contract Dad {
    function f() constant returns (uint) {
        return 10;
    }
}

contract Mom {
    function f() constant returns (uint) {
        return 20;
    }
}

contract Child1 is Dad, Mom {}
contract Child2 is Mom, Dad {}
contract Child3 is Mom, Dad {
    function f() constant returns (uint) {
        return 30;
    }
}


```

상속받는 순서에 따라 결과값이 달라진다.

Child1  --> 20

Child2  --> 10

Child3  --> 30
