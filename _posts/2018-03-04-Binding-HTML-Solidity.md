---
layout: post
title:  " Binding-HTML-Solidity "
categories: BlockChain
tags: BlockChain
author: goodGid
---
* content
{:toc}


## Problem

책 예제에 있는 프로젝트를 따라해보았다.

그냥 코드들만 있길래 안될꺼 같았는데 역시나 안됐다.

너무 light하게 설명이 되어있었다.

<br>

HTML 파일에 코드를 보면 (Line 13)

단지 `ABI`로 Contract를 만든다.

그런데 내가 알기론 만든 Contract에 `BYTE CODE`도 넣어줘야하는데

그 부분이 생략되어 있었다.

[zastrin](https://kr.zastrin.com/courses/4/lessons/1-1)이라는 사이트를 참고하여 

문제점을 해결하였다.

<br>

글을 포스팅하는 오늘(18. 03. 04) 기준으로

HTML안에서 ABI,BYTE CODE로 바꾸는

코드가 분명 있을텐데 찾지 못하여서

console에서 ABI, BYTE CODE를 컴파일하여 구한 후 

HTML파일에 정적으로 때려박았다.


## Related Resourece

* [A simple smart contract Web UI using web3.js](http://hypernephelist.com/2016/06/21/a-simple-smart-contract-ui-web3.html)

* [tomconte/solarchain-dashboard](https://github.com/tomconte/solarchain-dashboard)