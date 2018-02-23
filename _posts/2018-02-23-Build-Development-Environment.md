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


## 빌드 환경 구성 및 빌드
1. Git 설치

     A.   sudo apt-get install git

2. 우분투 환경 업데이트

     A.   sudo apt-get update

3. 빌드 필수 구성요소 설치

     A.   sudo apt-get install build-essential

4. Go 설치 및 환경설정

     A.   wget https://storage.googleapis.com/golang/go1.10.linux-amd64.tar.gz

     B.   sudo tar -C /usr/local -xzf go1.10.linux-amd64.tar.gz 

     C.   ~/.profile 파일에 환경변수 추가

        * export PATH=$PATH:/usr/local/go/bin 추가

        * export GOROOT=/usr/local/go 추가

     D.   작업디렉터리 생성

               a.   mkdir ethereum

               b.   cd ethereum
               
               c.   mkdir bin
               
               d.   mkdir db
               
               e.   mkdir logs
               
               f.   mkdir src
               
               g.   cd db
               
               h.   mkdir pnet

     E.   ~/.profile 파일에 환경변수 추가
               
               a.   export ETH_HOME=$HOME/ethereum
               
5.   Git을 통한 go-Ethereum 소스 클론 및 빌드
     A.   git clone https://github.com/ethereum/go-ethereum
     B.   git tag : 버전확인
     C.   git checkout v1.8.1(최신버전으로 설정)
     D.   make all
     
6.   작업폴더에 symlink
     A.   ln -s /home/{:user}/go-ethereum/build/bin/* /home/{:user}/ethereum/bin (go-Ethereum 에서 사용하는 명령을 작업공간에서 사용할 수 있도록 링크 추가)
          ex) ln -s /home/ubuntu/Ethereum/go-ethereum/build/bin/* /home/ubuntu/Ethereum/bin
     
7.   버전 확인
     A.   go env
     