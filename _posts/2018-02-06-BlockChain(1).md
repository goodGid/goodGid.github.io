---
layout: post
title:  " BlockChain (1) "
date:   2018-02-06
excerpt: " BlockChain (1) "
cate : "post"
tag:
- BlockChain
---

* 원문은 [Blog](http://www.chaintalk.io/archive/lecture/43)에서 확인하자 !

* 아래는 위 Blog에서 핵심적인 부분(주관적)을 발췌하였다.


데이타를 중앙서버가 가지는 것이 아니라, 각 노드들이 동일한 복제본을 각각 보관하는 것입니다.

각 노드들이 가진 데이타를 지속적인 싱크를 통해서 일치시켜 나감으로써 데이타의 정합성을 유지합니다.
<br>

이 데이타는 다수의 어카운트로 구성되는데, 어카운트에는 두가지 형태가 있습니다.

1. 사용자 어카운트 (프라이빗 키에 의해 제어됨) 
2. 컨트랙트 (코드에 의해서 제어됨)

<br>

이들 어카운트들은 모두 상태(state) 정보를 가집니다.

<br>

이 상태정보를 바꾸는 것이 `트랜잭션`입니다. 

트랜잭션은 사용자 어카운트에서 일으킬 수도 있고, 컨트랙트가 발생시킬 수도 있습니다.

<br>

이 중 컨트랙트에 포함되는 코드가 바로 애플리케인션의 핵심적인 비지니스 로직을 구성하게 됩니다.

<br>
 
이더리움은 컨트랙트 코드를 프로그래밍하는 상위 언어를 제공하는데,

그 중 가장 보편적으로 쓰이는 것이 `솔리디티(solidity)` 입니다.







## How to install Ethereum Wallet ?

>>> Click [This URL](https://github.com/ethereum/mist/releases)

## AWS Lambda Seminar

{% capture images %}
  /assets/img/posts/ethereum_wallet_1.png
  /assets/img/posts/ethereum_wallet_2.png
  /assets/img/posts/ethereum_wallet_3.png
  /assets/img/posts/ethereum_wallet_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=4 %}


