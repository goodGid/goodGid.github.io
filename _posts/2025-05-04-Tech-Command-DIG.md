---
layout: post
title:  " DIG(Domain Information Groper) 명령어를 아시나요? "
categories: Tech
author: goodGid
use_math: true
---
* content
{:toc}



## dig(Domain Information Groper)

* dig(Domain Information Groper)은 DNS(Domain Name System) 정보를 조회하는 데 사용되는 명령어이다. 

  주로 도메인 이름에 대한 IP 주소나 기타 DNS 레코드를 확인할 때 사용한다.

> 사용법

```
dig [옵션] [도메인 이름] [레코드 타입]
ex) dig google.com
```


### Example

![](/assets/img/tech/Tech-Command-DIG_1.png)

* google.com 도메인의 IPv4 주소(A 레코드) 를 요청했고 

  정상적으로 응답받았으며

  google.com의 IPv4 값은 142.250.207.110 이다.

* 참고로 **google.com**은 클라우드 기반 인프라에서 운영되므로 
  
  **로드 밸런싱**과 **CDN 최적화**를 위한 정상적인 동작이며
  
  같은 도메인이라도 시간/위치에 따라 IP가 달라질 수 있다. 
  

```
; <<>> DiG 9.10.6 <<>> google.com
=> `dig` 버전 9.10.6 사용, `google.com` 도메인 조회


;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 13732
=>  opcode: QUERY → 일반적인 조회 요청
=>  status: NOERROR → 오류 없이 정상 응답
=>  id: 13732 → 요청 식별 번호 (랜덤)


;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
=>  `qr`: 응답임
=>  `rd`: 재귀 요청 허용  
=>  `ra`: 재귀 응답 가능
=>  `QUERY: 1` : 1개의 질문 보냄
=>  `ANSWER: 1` : 1개의 응답 받음
=>  `AUTHORITY: 0` : 권한 네임서버 정보 없음
=>  `ADDITIONAL: 1` : 추가 정보(OPT 섹션) 1개 포함


;; QUESTION SECTION:
;google.com.			IN	A
=> 요청한 내용: google.com의 IPv4 주소(A 레코드)


;; ANSWER SECTION:
google.com.		36	IN	A	142.250.207.110
=> 도메인: `google.com`
=> TTL(Time to Live): `36초` (이 시간 동안 캐시됨)
=> 타입: `A` 레코드
=> 응답 IP 주소: `142.250.207.110`


;; Query time: 12 msec
=> 응답을 받는 데 걸린 시간: 12 msec
```



## Summary

* dig 명령어를 알고 있으면 

  네트워크 문제를 진단하거나 관련 작업을 할 때 유용하게 활용할 수 있다.

* 처음 보는 명령어였다면 이번 기회에 잘 알아두자 !