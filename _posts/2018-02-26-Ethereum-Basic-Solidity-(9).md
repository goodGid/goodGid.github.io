---
layout: post
title:  " 이벤트 & 전처리문(pragma)과 파일 참조(import)  "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}


컨트랙트에서 함수가 실행되는 중간에

이벤트를 발생시켜,

어떤 변수가 현재 어떤 값인지 로그를 남겨,

외부 dApp이 API를 이용해서

이 로그를 추적할 수 있다.

<br>

따라서 어떤 값이 바뀔 때마다

이를 감지해서, dApp이 callback 함수를 실행시켜

실시간으로 정보를 업데이트하거나 대응할 수 있다.


``` js

pragma solidity ^0.4.11;

contract Example4 {
    event myEvent(
        address indexed _from,
        address indexed _to,
        uint _amount
    );

    function pay(address _to) payable {
        myEvent(msg.sender, _to, msg.value);
    }
}

```


위의 예시에서 pay()가 실행될 때 마다 

myEvent가 호출되고 

_from, _to, _amount가 노출된다.

이를 지켜보고 있던 dApp은 pay()가 실행됨을 알고 대응할 수 있다.

<br>

예를 들어 pay()가 실행되자마자 누가 누구에게 얼마를 보냈는지

실시간으로 표시하는 게시판을 만들 수 있다.

<br>

이벤트에서 `indexed` 키워드를 붙인 인자들은

`필터링 검색`을 가능하게 해준다.

예를 들어

0xABCD가 보내는 거래 

or 

0xEFGH로 보내지는 거래들만 볼 수 있게 된다.

하지만 

amount에는 `indexed` 키워드가 없기 때문에

2000 wei를 보냈을 때 

2000 wei가 전송된 거래들만 보고 싶어도 볼 수가 없다.


<br>

다시 말하면,

이벤트가 발생하면 단순히 어떤 값을 가지는지만 알고 싶다면 

`indexed`를 붙이지 않아도 되지만,

필터링 검색을 하려면 `indexed` 키워드를 붙여주면 된다.


---


## 전처리문(pragma)과 다른 컨트랙트 파일 참조(import)

`pragma`는 일종의 전처리문으로서

작성된 스마트 컨트랙트를 컴파일 할 `컴파일러 버전`을 명시하는 것이다. 

<br>

`import`는 다른 솔리디티 파일을 참조할 수 있다.

```
import "참조할 파일 주소.sol";
```



