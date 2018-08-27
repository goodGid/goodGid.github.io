---
layout: post
title:  " 함수  "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}



``` js

pragma solidity ^0.4.0; 

contract SimpleStorage {
    uint storedData;

    function set(uint x) {
        storedData = x;
    }

    function get() constant returns (uint) {
        return storedData;
    }
    
}

```

함수 내부에 선언된 변수를 `지역변수 (local variable)`

외부에 선언된 변수를 `상태 변수 (state variable)`

<br>

함수의 형태

```
      1.함수 이름    2.입력 매개 변수      3.옵션           4.출력 매개 변수
function name   (x1, x2, ... , xN)   option returns (y1, y2, ... ,yN) {
                5.함수 내용
}
```

1번은 필수, 2,3,4번은 생략이 가능하다.

3번 생략시 자동으로 pulbic이 적용된다.

<br>

3.옵션에 대해 알아보자.

#### 1. external / public / internal / private 

외부 컨트랙트가

이 함수에 접근 할 수 있는지 설정할 수 있다.

이를 `가시성(visibility)`라 한다.

private 함수는 내부에서만

internal 함수는 내부와 상속된 컨트랙트에서 접근이 가능하다.

컨트랙트 밖에서도 접근을 가능하게 하려면

external or public을 붙이면 된다.

<br>

#### 2. constant

함수가

컨트랙트의 상태 변수를 

수정하지 않음을 보장하려면

constant를 붙여서 

`상수 함수(constant function)`으로 선언할 수 있다.

상수 함수의 실행은 gas를 소모하지 않는다.

만약 함수에서 컨트랙트의 상태를 수정하고 싶다면,

이 옵션을 사용해서는 안된다.

<br>


#### 3. payable

컨트랙트가 자신의 함수를 통해

다른 지갑이나 컨트랙트에서 이더를 송금받고 싶은 경우,

`payable`를 붙여 `지불 가능 함수(payable function)`로 선언해야 한다.


---


## 생성자 (Constructor)

`생성자`를 `선언`하려면 

`컨트랙트와 같은 이름의 함수`를 선언하면 된다.



``` js

pragma solidity ^0.4.0; 

contract Example4 {

    uint count;
    address from;
    address to;

    function Example4(uint _count, address _from, address _to) public {
        count = _count;
        from = _from;
        to = _to;
    }
}

contract Example4Creator {
    Example4 e = new Example4(1, MyAddress, ToAddress  ,2018);
}


```

이렇게 생성자를 선언하면 

Mist or Remix에서 컨트랙트를 생성할 때,

생성자의 입력 매개 변수를 넣어줄 수 있는 

공간이 따로 생긴다.