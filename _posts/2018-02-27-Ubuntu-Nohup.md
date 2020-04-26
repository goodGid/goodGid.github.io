---
layout: post
title:  " [Ubuntu] Nohup이란 무엇인가? "
categories: Linux
author: goodGid
---
* content
{:toc}

## Nohup 정의

* [nohup](https://ko.wikipedia.org/wiki/Nohup)은 Linux, Unix에서 쉘스크립트파일(*.sh)을 **데몬 형태**로 실행시키는 프로그램이다.

> 주의 사항

* nohup으로 실행 시킬 쉘스크립트파일(*.sh)은

  현재 Permission이 755 상태이어야 한다.

``` shell
chmod 755 shell.sh
```




---

## Nohup 출력

* nohup으로 쉘파일을 실행시키면 

  자동으로 "nohup.out" 파일이 생성된다.

  이 파일에는 리다이렉션을 사용하지 않은 출력 문자열이 자동으로 저장된다.

---

> 기본 출력

```
nohup shell.sh
cat nohup.out
hello
```

---


> 다른 파일에 출력

```
nohup shell.sh > 1.txt
cat 1.txt
hello
```

---


> 출력 하지 않기

```
nohup shell.sh > /dev/null
cat nohup.out
cat: nohup.out: No such file or directory
```

---

> nohup 종료 방법

1. <p>"ps -ef | grep 쉘스크립트 파일명" 명령으로 현재 프로세스(PID) 조회</p>

2. "kill -9 PID 번호" 명령으로 해당 프로세스 종료

---

## &이란 ?

* 프로세스 실행 시 백그라운드로 동작시키는 명령어이다.

---

## Nohup과 &


* nohup으로 실행하면 hang-up signal이 와도 동작하기 때문에 

  터미널 연결이 끊어져도 실행을 멈추지 않는다.

* 기본적으로는 nohup이 아닐 경우 터미널이 끊어지면 실행도 끊어진다. 

  하지만 요즘 옵션에 nohup과 같은 동작을 하게 설정이 되어 있어서 

  & 만으로도 nohup과 같은 동작을 보이다.

* 그렇지만 가능하다면 nohub과 &를 같이 사용하는걸 추천한다.

