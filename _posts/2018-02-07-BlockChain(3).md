---
layout: post
title:  " BlockChain (3) "
date:   2018-02-07
excerpt: " BlockChain (3) "
cate : "post"
tag:
- BlockChain
---
{% capture images %}
  /assets/img/posts/ethereum.png
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


제일 단순하지만 로직과 데이타가 다 들어 있는 컨트랙트 하나를 골랐습니다. 

솔리디티 메뉴얼에 제일 처음 나오는 컨트랙트입니다.

블록체인에 어떤 정수값을 저장해 두었다가 

이를 다시 불러올 수 있도록 하는 컨트랙트입니다.




{% highlight JavaScript %}
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
{% endhighlight %}

​﻿하나씩 쪼개서 살펴봅시다.
<br><br>


{% highlight solidity %}
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

{% endhighlight %}










