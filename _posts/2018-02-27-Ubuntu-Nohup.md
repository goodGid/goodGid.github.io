---
layout: post
title:  " Ubuntu :: Nohup "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}


## What is Nohup?

[사전적 정의](https://ko.wikipedia.org/wiki/Nohup)를 알아보자.

리눅스, 유닉스에서 쉘스크립트파일 (*.sh)을 데몬형태로 실행시키는 프로그램


---

## &이란 ?

프로세스를 실행할 때 백그라운드에서 동작하도록 만드는 명령어이다.

---

## 주의사항 

nohup으로 실행할 쉘스크립트파일 (*.sh)은

현재 퍼미션이 755상태이여야 한다.

chmod 755 shell.sh

---

## 출력

nohup으로 쉘파일을 실행하면 

자동으로 "nohup.out" 파일이 생성되며, 

이 파일에는 리다이렉션을 사용하지 않은 출력문자열이 자동으로 저장된다.

<br>

* 기본 출력

```
nohup shell.sh

cat nohup.out
hello
```

* 다른 파일에 출력

```
nohup shell.sh > 1.txt
cat 1.txt
hello
```

* 출력 안하기

```
nohup shell.sh > /dev/null
cat nohup.out
cat: nohup.out: No such file or directory
```

---

* nohup 종료방법

1. “ps -ef | grep 쉘스크립트파일명” 명령으로 데몬형식으로 실행

2. "kill -9 PID번호“ 명령으로 해당 프로세스 종료


---

## nohup과 &차이

```
$ ./run &
$ nohup ./run &
```

위 두 명령어의 차이점은 다음과 같다.

<br>

nohup으로 실행하면 hang-up signal 이 와도 동작하기 때문에 

터미널 연결이 끊어져도 실행을 멈추지 않는다.

'&'으로만 실행해도 터미널이 끊어져도 실행이 멈추지는 않던데...' 라고 말하는 분들도 있다.

& 은 백그라운드로 돌린다는 의미이며, 

기본적으로는 nohup이 아닐 경우 터미널이 끊어지면 실행도 끊어진다. 

하지만 요즘 옵션에 nohup과 같은 동작을 하게 설정이 되어 있어서 

& 만으로도 nohup 과 같은 동작을 보인다.

---


## Tip

만약 nohup명령어로

직접 만든 스크립트를 실행하고자 하는데 

명령어를 입력한 후 엔터를 치면 

exit이 나온다면 스크립트에 에러가 있어 종료가 되는 것이다.

