---
layout: post
title:  " Execute Private Network "
categories: BlockChain
tags: Ethereum
author: goodGid
---
* content
{:toc}



## 사설 이더리움 네트워크 실행하기

이더리움 클라이언트는 Geth를 통해

2가지 모드로 실행될 수 있다.

1. 단순히 이더리움 클라이언트만을 실행하는 모드

2. 이더리움 클라이언트를 실행함과 동시에 대화형 자바스크립트 콘솔 환경으로 접근하는 모드

1번은 이더리움 클라이언트를 실행하고

더 이상 기능이나 설정을 변경할 필요가 없을 때 사용한다.

2번은 다양한 API를 이용하여 실시간으로 새로운 계좌를 생성하거나

Ether를 전송하고

채굴과 같은 기능 등을 활성활 or 비활성화할 때 사용한다.

```
./geth --datadir=$ETH_HOME/db/pnet --networkid=63 --port=60606 console
```

[환경 설정 가이드](https://gist.github.com/goodGid/0067ca063bcdf9a5c5fdfac5b84cbf1f) 참고


---

### 계좌 잔고 조회

* 계좌 목록 확인

```
eth.accounts
```

* 계좌 잔고 확인

```
eth.getBalance(eth.accounts[0])
eth.getBalance(eth.coinbase)
```

* 단위 환산

```
web3.fromWei(eth.getBalance(eth.coinbase), "ether")
```


* 채굴 기능

사설 네트워크에서는 기본적으로 비활성화되어 있다.

채굴을 활성화 하는 방법으로는

1. Geth 실행 시 `--mine`옵션 추가

2. 콘솔 환경에서 활성화

```
// miner는 '--rpcapi' 옵션에 추가한 모듈 중 하나이다.

miner.start()
miner.stop()
```


---

## 외부에서 자바스크립트 콘솔 환경 접속하기

Geth에서 명령 프롬포트를 통해

이더리움 클라이언트의 실행과 동시에

자바스크립트 콘솔에 접속할 수도 있지만

다음과 같이 

다른 IP를 가진 원격지 or 로컬 컴퓨터의 또 다른 명령 프롬포트에서

해당 이더리움 클라이언트의 자바스크립트 콘솔에 접근할 수 있다.

이 때 반드시 `--rpc`관련 옵션을 설정해야 한다.

```
geth attach http://(이더리움 클라이언트의 노드 IP) : (RPC 포트)
```

<br>

Example

이더리움 클라이언트 노드 IP가 

123.123.123.123이고

RPC 포트를 

8123으로 설정하였다면,

다른 명령 프롬포트에서 다음과 같은 방법으로

자바스크립트 콘솔에 접속할 수 있다.

```
geth attach http://localhost:8123           // 1. 로컬 컴퓨터에서 접속 방법 1
geth attach http://127.0.0.1:8123           // 2. 로컬 컴퓨터에서 접속 방법 2
geth attach http://123.123.123.123:8123     // 3. 원격지에서 접속하는 방법
```

1,2 방법은 현재 이더리움 클라이언트가 실행되고 있는 컴퓨터,

즉 현재 이더리움 사설 네트워크가 구축된

로컬 컴퓨터에서 접속하는 방법이다.

같은 IP 주소를 가진 컴퓨터에서 접속하기 때문에

IP 주소를 명시적으로 넣을 필요는 없다.

3번째 방법은 다른 IP주소를 가진 컴퓨터에서

현재 이더리움 클라이언트의 자바스크립트 콘솔에 접속하는 방법이다.