---
layout: post
title:  " Build Development Environment "
categories: BlockChain
tags: BlockChain
author: goodGid
---
* content
{:toc}

## Build Development Environment

[Github Gist](https://gist.github.com/goodGid/0067ca063bcdf9a5c5fdfac5b84cbf1f)



---

## Extra Resource

### $ETH_HOME

|   file       | description    |  file | description |
|:-------:|:-------:|:-------:|
| abigen <br> <br> | contract ABI 기반 Go Pakage 생성 <br> <br> | geth  <br> <br> | Go Ethereum Node <br> <br>   |
| bootnode <br> <br> | Network Discovery 용 Boot Node <br> <br> | gethrpctest <br> <br> | ethereum/rpc-tests Test Suite 실행 도구 <br> <br>  |
| disasm <br> <br> | Contract Byte Code를 Op Code로 변환 <br> <br> | rlpdump <br> <br> | RLP 데이터를 해석하는 개발 도구 <br> <br>   |
| ethtest <br> <br> | geth 빌드 후 검증용 도구 <br> <br> | swarm <br> <br> | Swarm 데몬 ( 개발중 ) <br> <br>   |
| evm <br> <br> | 개발자용 EVM 디버깅 도구 <br> <br> | wnode <br> <br> | Whisper 데몬 (개발중) <br> <br>  |
|=====|=====|=====|

---

### Folders 및 files

|   dir       | description    |  file(s) | description |
|:-------:|:-------:|:-------:|
| geth  <br> <br>| data dir의 root  <br> <br> | geth ipc  <br> <br>| Console or IPC API 통신을 위한 파일 <br> <br>  |
| chaindata  <br> <br> | Block, State, Storage의 Trie DB  <br> <br> | *.ldb  <br> <br> | 지속 분할/Merge 되는 DB 들 <br> <br>  |
| nodes  <br> <br> | 접속한 Node들의 관리 DB  <br> <br> | *.ldb   <br> <br> | Node 관리를 위한 DB <br> <br>  |
| keystore  <br> <br> | Account들의 암호화된 Key 정보  <br> <br> | UTC-\<time>\--\<address>  <br> <br> | Account별 Key 정보 파일 생성 <br> <br>  |
|=====|=====|=====|

---


### Geth 옵션

[API Document](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options)

<br>

|   Category       | Option Name  | description |
|:-------:|:-------:|:-------:|
| Command | init | 새로운 Genesis Block을 기반으로 DB 생성 |
|   | account | list, new, update |
|   | console | node 시작 및 console 진입 |
|   | attach <br> <br> | ipc or rpc로 console attach <br> <br> |
| Ethereum | \--datadir \<string> |  |
|   | \--networkid \<num> | |
|   | \--testnet | |
|   | \--identity \<string> <br> <br> | <br> <br> |
| Account | ---unlock \<filename> | |
|   | ---password \<filename> <br> <br> | <br> <br> |
| API & Console | --rpc | | 
|   | \--rpcaddr \<ipaddr> | 기본 "localhost" |
|   | \--rpcport \<port> | 기본 "8545" |
|   | \--rpcapi \<apis> | 기본 "eth, net, web3" <br>(admin, debug, eth, miner, net, personal, shh, txpool, web3) |
|   | \--rpccorsdomain | CORS |
|=====|=====|=====|




