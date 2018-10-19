---
layout: post
title:  " 사설 이더리움 네트워크(Geth) 구축하기 "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}

## 이더리움 클라이언트 소개

* 이더리움은 중앙 집중형 서버 프로그램이 따로 존재하지 않는다.

* 오로지 클라이언트 프로그램만 존재한다.

* 이더리움 클라이언트는 멀티 플랫폼 환경을 지원하기 위해 다양한 프로그래밍 언어로 개발되고 있다.









## 사설 이더리움 네트워크 구축하기

공용 이더리움 네트워크상에서 

개발자가 새롭게 만든 dApp을 배포하려면

실제 이더를 소비하여 

컴파일된 코드를 블록으로 저장해야한다.

<br>

그런데 오류가 발견된다면 

수정 후 다시 배포를 해야하는데 

이 때 추가로 이더를 소비해야한다.

<br>

따라서 개발한 dApp을 

이더 걱정없이 마음 편하게

테스트할 수 있는 공간이 필요하다.

<br>

이더리움 사설 네트워크에서는 

이더를 원하는 만큼 생성 or 채굴 할 수 있기 때문에

dApp을 테스트하는데 매우 효율적인 공간이다.

<b>

이러한 사설 네트워크를 구축하기 위해선

생성 or 설정할 요소들이 있다.

　1. Genesis 블록 파일 생성 

이더리움 네트워크에서 사용되는 블록체인의 최초 시작 블록을 생성한다.

　2. Data 디렉토리 설정

계좌나 블록 정보들이 저장될 디렉토리를 설정한다.

　3. 네트워크 ID 설정

사설 이더리움 네트워크의 ID를 정의한다.

　4. Node Discovery 비활성화

이더리움 네트워크에 있는 모든 노드들은

끊임없이 다른 노드를 찾아 

자신의 Peer로 등록하게 되는데

테스트의 용도로 구성된 사설 네트워크에서는

이러한 과정이 필요하지 않으므로 비활성화한다.


---

## Geth 클라이언트 프로그램의 옵션

* 옵션을 통해 이더리움 네트워크 환경을 설정할 수 있다.

　1. \--identity

다른 이더리움 네트워크와 

구분 짓기 위한 일종의 식별자(ID) 역할


　2. \--nodiscovery

자신의 peer을 찾으려하는 다른 노드들로부터

나의 노드를 발견하지 못하게 숨기는 역할

　3. \--maxprees 0

이 옵션 값을 0으로 하면 

어떤 노드도 사설 네트워크에 접속할 수 없다.

원하는 개수의 peer들만 

사설 네트워크에 연결할 수 있도록 설정할 수 있다.

　4. \--rpc

해당 이더리움 노드에 접근할 수 있는 

RPC 인터페이스를 활성화한다.

Geth에서는 기본적으로 활성화되어 있다.

　5. \--rpcapi : "db, eth, web3, miner"

RPC 인터페이스를 통해서 

어떤 API를 사용할 것인지 정의할 수 있다.

RPC 인터페이스가 활성화되면

누구나 API를 통해 노드에 접근할 수 있기 때문에

필요한 API만 정의한다.

　6. \--rpcaddr

RPC 인터페이스를 통해 

접근을 허용할 IP주소를 설정할 수 있다.

0.0.0.0으로 설정할 경우,

모든 내부 네트워크 IP가 접근할 수 있다.

　7. \--rpcport "8123"

RPC 인터페이스에 접근하기 위한 포트를 정의

　8. \--rpccorsdomain "*"

사설 네트워크에 어떤 주소를 가진 RPC 클라이언트들이 접근하여

작업을 수행할 수 있는지를 정의한다.

인증되지 않은 노드들이

RPC를 통해서 사설 네트워크에 접속하는 것을 막기 위해

와일드카드(*) 대신에 특정 URL을 정의하는 것이 좋으나,

단순히 dApp을 테스트하기 위한 용도라면 

와일드카드를 사용해도 무방하다.

　9. \--dataidr "(path)"

사설 네트워크의 블록 데이터들이 저장될 폴더를 지정한다.

만약 공개 네트워크를 같이 사용하고자 한다면,

사설 네트워크용 폴더를 확실하게 구분해서 지정해야한다.

　10. \--port "30303"

이더리움 네트워크의 노드들이

수동으로 사설 네트워크에 접속하기 위한 포트를 정의한다.

　11. \--mine

이더리움 채굴을 활성화한다.

---

## Geth 클라이언트 계좌 만들기

* 자세한 설치 방법은 [환경 설정 가이드](https://gist.github.com/goodGid/0067ca063bcdf9a5c5fdfac5b84cbf1f)을 참고


사설 네트워크를 구축하기에 앞서 Geth 클라이언트용 개인 계좌를 개설해야 한다.

Geth 클라이언트의 계좌를 생성하는 2가지 방법

1. 기본적으로 이더리움 사설 네트워크를 구축한 후 콘솔에 접속하여 개설하는 방법

2. Geth 클라이언트를 실행하기 전에 미리 계좌를 생성하는 방법

2번째 방법으로 진행을 해보자.

<br>

`--datadir` 옵션은 

블록 데이터와 계좌 정보가 

저장될 폴더를 지정하는 옵션이다.

[--datadir](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options) "/home/karalabe/.ethereum"  Data directory for the databases and keystore


```
geth --datadir {저장시킬 위치} account new
```


<br>

accout list 옵션을 사용하면

우리가 개설한 계좌의 정보를 조회할 수 있다.

```
./geth --datadir=$ETH_HOME/db/pnet account list

./geth --datadir $ETH_HOME/db/pnet account list
```


{% capture images %}
/assets/img/ethereum/eth_basic_build_dev_get_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %} 


