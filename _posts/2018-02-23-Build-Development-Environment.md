---
layout: post
title:  " BlockChain :: Build Development Environment "
date:   2018-02-23
excerpt: "  Build Development Environment "
cate : "post"
tag:
- BlockChain
---

## Build Development Environment

[Github Gist](https://gist.github.com/goodGid/0067ca063bcdf9a5c5fdfac5b84cbf1f)



---

## Extra Resource

### $ETH_HOME

|   file       | description    |  file | description |
|:-------:|:-------:|:-------:|
| abigen | contract ABI 기반 Go Pakage 생성 | geth | Go Ethereum Node <br> <br>   |
| bootnode | Network Discovery 용 Boot Node | gethrpctest | ethereum/rpc-tests Test Suite 실행 도구 <br> <br>  |
| disasm | Contract Byte Code를 Op Code로 변환 | rlpdump | RLP 데이터를 해석하는 개발 도구 <br> <br>   |
| ethtest | geth 빌드 후 검증용 도구 | swarm | Swarm 데몬 ( 개발중 ) <br> <br>   |
| evm | 개발자용 EVM 디버깅 도구 | wnode | Whisper 데몬 (개발중) <br> <br>  |
|=====|=====|=====|

---

### Folders 및 files

|   dir       | description    |  file(s) | description |
|:-------:|:-------:|:-------:|
| geth | data dir의 root | geth ipc | Console or IPC API 통신을 위한 파일 <br> <br>  |
| chaindata | Block, State, Storage의 Trie DB | *.ldb | 지속 분할/Merge 되는 DB 들 <br> <br>  |
| nodes | 접속한 Node들의 관리 DB | *.ldb | Node 관리를 위한 DB <br> <br>  |
| keystore | Account들의 암호화된 Key 정보 | UTC-(time)--(address) | Account별 Key 정보 파일 생성 <br> <br>  |
|=====|=====|=====|

---

