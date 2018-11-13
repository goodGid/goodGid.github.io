---
layout: post
title:  " BlockChain (3) "
categories: BlockChain
tags: BlockChain
author: goodGid
---
* content
{:toc}

{% capture images %}
  /assets/img/block_chain/ethereum.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

* 원문은 [Blog](http://www.chaintalk.io/archive/lecture/86)에서 확인하자 !

* 아래는 위 Blog에서 핵심적인 부분(주관적)을 발췌하였다.

---


`dApp`은 기본적으로 `스마트 컨트랙트` + `사용자 인터페이스` 입니다.

사용자 인터페이스를 만들기 위해서 HTML/CSS/Javascript을 사용합니다. 

그리고 `비지니스 로직`과 `데이터`를 저장하기 위해서 `스마트 컨트랙트`를 사용합니다. 

`스마트 컨트랙트`야말로 `중앙서버 중심`의 `인터넷 어플리이션 개발 모델`과 

비교해서 가장 다른 부분입니다.
<br><br>


그래서 일단 이 스마트 컨트랙트가 

어떻게 생겼는지 감부터 잡아봅시다. 
<br><br>


제일 단순하지만 로직과 데이터가 다 들어 있는 컨트랙트 하나를 골랐습니다. 

솔리디티 메뉴얼에 제일 처음 나오는 컨트랙트입니다.

블록체인에 어떤 정수값을 저장해 두었다가 

이를 다시 불러올 수 있도록 하는 컨트랙트입니다.


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

​﻿하나씩 쪼개서 살펴봅시다.
<br><br>


``` js
pragma solidity ^0.4.0; 
```



`pragma`라는 것은 

컴파일러가 어떤 언어와 버전을 기준해 

`컴파일`해야 할 지 알려주는 부분입니다. 
<br><br>


(* 컴파일 : 인간의 프로그래밍언어를 

컴퓨터가 이해할 수 있는 `바이트코드`로 번역해주는 것  

이 경우에는 인간이 코딩한 솔리디티 코드를 

바이트코드로 번역해주는 것을 의미합니다.)
<br><br>
 

pragma 뒤에 나와있는 solidity ^0.4.0;

은 solidity 버전을 말하며 

이 버전을 기준으로  

아래에 있는 코드를 컴파일하라고 

명령하는 것입니다. 
<br><br>
 


`solidity`는 이더리움 스마트 컨트랙트를 

쉽게 코딩하기 위해서 만들어진 상위 언어입니다. 
<br><br>
 

솔리디티 이외에도 몇 가지 다른 언어가 더 있지만, 

현재 가장 많이 쓰이고 있습니다.
<br><br>


`솔리디티`는 자바스크립트와 유사한 형식을 가지고 있지만, 

가장 특징적인 것은 자바스크립트와는 달리 

`정적 언어 ` (statically typed language) 라는 점입니다. 

이게 무슨 말이냐... 

변수를 선언할 때 그 변수가 어떠한 타입인지  

미리 설정해야 된다는 것입니다. 

다른 말로 하면 `컴파일 타임`에서 변수의 타입이 알려진다는 것이죠. 

이 점에 대해서는 이후에 좀 더 자세히 설명하겠습니다.
<br><br>
 
 

하나의 컨트랙트는 다음과 같이 컨트랙 선언문에 의해 정의됩니다.


``` js
contract SimpleStorage {
            ...   
}

```


즉, 위의 코드는 

SimpleStorage 라는 이름의 컨트랙트을 선언하고 

그 컨트랙트의 내용은 "{ .... }" 안에 정의된다는 

의미입니다.
<br><br>


``` js
    uint storedData; 
```


블록체인 위에 storedData라는

어떤 상태 또는 값을 저장하기 위한

256 bits 크기의 부호없는 정수 변수를 선언합니다.
<br><br>
 

storedData 앞에 있는 uint 는 

이 storedData 값이  unsigned (부호없는) integer(정수값) 이라는 것이고, 

이것을 줄여서 uint 가 되는 것입니다. 

즉, storeData라는 변수에는 부호없는 정수값만 

들어가야 한다는 이야기입니다. 
<br><br>
 

이와 같이 모든 변수를 선언할 때 

항상 그것의 타입을 선언해야 하는 언어를 

'정적으로 타입된 언어'라고 부릅니다. 
<br><br>


 
여기서 한가지 더 주목해야 할 점은 

storedData라는 변수가 컨트랙트의 메인 {...} 안에 

바로 들어와 있다는 것입니다.
<br><br>
 

 

이렇게 메인 {  } 에 선언되어 있는 변수는  

해당 컨트랙트 안에서는 어디서나 가져다 

써먹을 수가 있습니다. 전역변수 (Global Variable)라고 부르죠.

 
``` js
  function set(uint x) {

        storedData = x;

    }

```

function은 함수라는 뜻입니다. 

function 옆에 있는 set은 이 `함수의 이름`을 의미합니다. 

set의 (  ) 안에는 사용자로부터 입력받을 x 값이 

타입과 함께 선언되어있습니다. 
<br><br>
 

이 컨트랙트 프로그램이 실행되면 

사용자는 이 set 함수에 uint 형태의 x 값을 

입력하게 될 것입니다. 
<br><br>


입력받은 x값을 storedData에 넣어주게 되면, 

이 값은 `블록체인`에 `기록(저장)`되게 됩니다.
<br><br>



``` js
    function get() constant returns (uint) {

        return storedData;

    }

```


다음으로

``` js
    function get() constant returns (uint) {

        return storedData;

    }

```

{% capture images %}
  /assets/img/block_chain/blockchain(3)_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


앞에서 사용자가 입력한 값을 저장할 때 

사용한 set 함수와 거의 비슷합니다만
<br><br>
 

첫번째 차이점은 get 옆의 ( ) 안에 

입력값이 없습니다. 
<br><br> 

 

만일 사용자가 여러 값을 입력하여 

값을 입력할 변수가 여러개 필요한 경우에는 

그 중에서 어느 값을 가져올지 지정할 수도 있지만 
<br><br>
 
 

우리가 다루고 있는 이 예제에서는 

사용자가 입력 할 변수값이 storedData하나 뿐이므로  

굳이 입력값을 쓸 필요 없이 get옆의 ( ) 를 빈 상태로로 해서 선언했습니다.
<br><br>



즉, 이 컨트랙트 안에서는

앞으로 set 함수에서 사용자가 입력하여 저장된 값에 대해  

어떤 처리를 할 것인데 그 처리를 한 다음에 나올 결과값을 

get 함수를 이용해 돌려달라고 선언하는 겁니다. 
<br><br>
 

 

get 함수에서는 그 값을 돌려받을 자리 

곧, 변수를 만들어줘야(선언해줘야) 합니다.
<br><br>
 


그 변수는 바로 returns 옆의 (   ) 안에 

선언되어 있습니다. 
<br><br>

여기서는 돌려받을 값을 

uint로 선언했습니다.  
<br><br>
 


약간 이상한 것은 타입만 선언하고 

변수명은 생략되었습니다. 
<br><br>
 


이 예제처럼 리턴할 변수가 하나이고 

특별히 그 이름을 지정해서 사용해야 할 필요가 없을 때는 

이렇게 생략할 수 있습니다.
<br><br>
 

 

만일 리턴할 변수가 여러 개여서, 

지정해서 사용해야 할 필요가 있을 때는

아래와 같이 됩니다. 
<br><br>


``` js
    function get() constant returns (uint x) {
        x = storedData;
        return x;
        
     }

```


보시다시피 위에서는 returns (   ) 안에 uint x 라고 

변수이름 x 까지 선언이 되어있습니다.
<br><br>


 

이로써 우리는 하나의 `완전한 컨트랙트`를 완성했습니다.

블록체인에 하나의 값을 저장하고 그것을 다시 불러올 수 있는 루틴을 만들었고, 

그렇게 저장된 값은 블록체인에 계속 남게 됩니다.
<br><br>
 

 

그렇다면 스마트 컨트랙트가 하나 만들어졌는데, 이것을 도대체 어떻게 사용할 수 있을까요?
<br><br>
 

 

첫번째로 해야 할 일은 이 컨트랙트를 

`블록체인 위`에 `퍼블리싱`하는 것입니다. 
<br><br>
 

 

블록체인위에 올라가야 모두가 이것을 불러서 

사용할 것 아니겠습니까?
<br><br>
 

 

컨트랙트를 블록체인 위에 올리는 방법은 

여러 가지가 있습니다만, 

그 중에서 제일 쉬운 방법 하나를 시도해보겠습니다.
<br><br>
 

 

우선 해야할 일은 블록체인에 접속할 수 있는 `노드`가 있어야 합니다. 

노드를 생성하기 위해서는 메타마스크라는 지갑을 사용합니다. 
<br><br>
 

 

메타마스크는 크롬 브라우저용 이더리움 지갑입니다. 

자세한 인스톨 방법은 다음을 참고하세요.

http://www.chaintalk.io/archive/study/527 
<br><br>
 

 

만일 이미 미스트, 패러티 등의 노드 등을 가지고 있는 분들은 

그냥 그것을 사용해도 됩니다.
<br><br>
 

이제 이 크롬 브라우저에서 여러분이 작성한 컨트랙트 코드를 컴파일하고 

블록체인에 올릴 수 있도록, 온라인 컴파일러 사용해 보겠습니다.
<br><br>




이름은 Remix 이고 사이트는

https://ethereum.github.io/browser-solidity/ 

입니다.
<br><br>

 

 

처음 방문하면 이미 다른 샘플 컨트랙트이 열릴 겁니다. 

이건 그냥 두고, 새로 탭을 하나 더 열어서 위의 코드를 넣어보세요.


{% capture images %}
  /assets/img/block_chain/blockchain(3)_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}



컴파일러 버전을 0.4.0 에 맞추고, 

Enable Optimization, Auto Compile 을 체크해 놓으면 

위의 이미지와 같은 상태가 될 겁니다.
<br><br>
 


그런데 왜 컴파일을 할까요?

앞에서도 설명드렸지만 다시 정리하자면 

솔리디티로 만든 코드는 인간이 이해하기 쉬운 형태이지, 

컴퓨터가 이해하는 언어는 아닙니다. 

이 언어를 바이트코드로 전환해야 비로소 컴퓨터가 이해하게 됩니다. 

`블록체인`에 `올릴 내용`은 솔리디티가 아니라 `바이트코드`입니다.
<br><br>
 

 

위의 솔리디티 코드가 바이트코드로 컴파일 되면 

다음과 같이 나옵니다.

 
```
606060405260438060106000396000f3606060405260e060020a600035046360fe47b1811460265780636d4ce63c146032575b6002565b34600257600435600055005b346002576000546060908152602090f3 
```

솔리디티 코드보다 매우 짧은 숫자로 전환되었습니다.
<br><br>
 


이렇게 바이트 코드로 올려진 것을 

다시 개별 컴퓨터가 받아서 실행하게 되는데, 
<br><br>
 


이 바이트 코드가 실제 돌아가는 환경은 

`EVM`이라는 `이더리움 가상머신`에서 입니다. 
<br><br>
 
 

EVM에서는 바이트코드가 다시 `opcodes`단위로 

해석되어 처리됩니다. 

(* opcode : 보통 기계어에서 연산을 가리키는 부분의 코드 )
<br><br>
 

이 opcodes 의 리스트는 다음과 같습니다.
```
PUSH1 0x60 PUSH1 0x40 MSTORE PUSH1 0x43 DUP1 PUSH1 0x10 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN PUSH1 0x60 PUSH1 0x40 MSTORE PUSH1 0xE0 PUSH1 0x2 EXP PUSH1 0x0 CALLDATALOAD DIV PUSH4 0x60FE47B1 DUP2 EQ PUSH1 0x26 JUMPI DUP1 PUSH4 0x6D4CE63C EQ PUSH1 0x32 JUMPI JUMPDEST PUSH1 0x2 JUMP JUMPDEST CALLVALUE PUSH1 0x2 JUMPI PUSH1 0x4 CALLDATALOAD PUSH1 0x0 SSTORE STOP JUMPDEST CALLVALUE PUSH1 0x2 JUMPI PUSH1 0x0 SLOAD PUSH1 0x60 SWAP1 DUP2 MSTORE PUSH1 0x20 SWAP1 RETURN  
```


지금 이 opcodes 들을 바로 이해할 필요는 없습니다. 

그냥 이런 정도의 내용들이 뒤에서 작동하는구나 하는 정도로 

파악하고 넘어갑시다.
<br><br>



컴파일은 되었고, 이 바이트 코드를 

블록체인으로 올리는 것도 간단합니다.

그냥 빨간 색의 "create"을 버턴을 누르면 됩니다. 
<br><br>




{% capture images %}
  /assets/img/block_chain/blockchain(3)_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


이렇게 컨트랙트를 블록체인으로 보내고 나면, 

다음과 같이 그 컨트랙트의 주소가 나옵니다.
<br><br>
 

0xc5244053eca508a11951400fc7af28738fd0ce77 

 

아래 그림에서 나타난 컨트랙트 주소는 지금 이 공부를 하는 사람들마다 다르게 나옵니다. 
<br><br>
 

 

자신의 브라우저에서 주어진 그림과 비교하여 자신의 컨트랙트 주소가 있는 위치를 확인해보면 

다른 주소가 적혀져 있을 것입니다. 
<br><br>
 

SimpleStorage at 의 뒷 부분을 잘 살펴보시면 거기에 나와있는 주소가  

바로 자신의 컨트랙트 주소입니다.

 
{% capture images %}
  /assets/img/block_chain/blockchain(3)_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

블록체인에서 블록들이 생성되려면 

10초 이상 간혹 10여분 이상 기다려야 될 때도 있습니다. 
<br><br>

 

요즈음 테스트넷에 스팸공격이 많아서 느려질 때도 있습니다. 

만일 테스트넷에 새 블록이 오래동안 잘 생성되지 않는 경우에는 

다른 테스트넷을 써야 합니다. 

kovan 이라는 새 테스트넷 환경이 있는데 이에 대해서는 다음에 설명하겠습니다. 
<br><br>
 

 
테스트넷이 정상적으로 돌아간다면, 

1-2분 후에 다음과 같이 블록체인에 컨트랙트가 올라 간 것을 확인할 수 있습니다.

https://testnet.etherscan.io/address/0xc5244053eca508a11951400fc7af28738fd0ce77 
<br><br>
 


위의 사이트 주소는 제가 지금 받은 컨트랙 주소이고 

여러분은 

https://testnet.etherscan.io/address/  여기 뒷부분에 

SimpleStorage at 뒷부분에 있는  
 
여러분이 생성한 컨트랙트 주소를 넣어주면 됩니다.
<br><br>



자 여러분이 코딩한 첫번째 컨트랙트가 비록 테스트넷이기는 하지만

블록체인위에 올라가서 누구나 이를 이용할 수 있게 되었습니다.

[다음 편](https://goodgid.github.io/BlockChain(4)/)