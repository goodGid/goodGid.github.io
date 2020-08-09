---
layout: post
title:  " [Ubuntu] PPA(Personal Package Archive) "
categories: Linux
author: goodGid
---
* content
{:toc}

## Ubuntu Problem

* 일반적으로 [Ubuntu S/W 센터](https://ubuntu.com/blog/tag/ubuntu-software-center)에서 다운로드 받을 수 있는 각종 패키지의 버전들은 최신이 아니다.

* Ubuntu는 6개월 주기로 새로운 버전이 출시된다.

* 그렇기 때문에 

  [Ubuntu S/W 센터](https://ubuntu.com/blog/tag/ubuntu-software-center)에서 

  사용하는 S/W의 최신 버전을 다운받기 위해서는 6개월을 기다려야 한다.

  즉 기존에 사용하던 프로그램이 이미 업데이트 되었어도 6개월을 기다려야 한다.

* 이와 같은 문제를 극복하기 위한 방법이 **PPA(Personal Package Archive)**이다. 





## Ubuntu S/W 센터

* Ubuntu에서 S/W를 설치하는 것은 윈도우나 Mac과는 다르다. 

* 인터넷에서 파일을 찾아 다운받지 않고 

  Ubuntu S/W 센터에서 원하는 모든 것들을 검색하고 설치할 수 있다.

* 게다가 Ubuntu S/W 센터에 있는 S/W들은 

  기본적으로 Ubuntu 팀에 의해서 미리 안전하고 안정적이라고 판단되는 것들만 모여있기 때문에

  아무 웹사이트에서 다운받은 파일들보다 훨씬 안전한다.

* 하지만 이것이 항상 좋기만 한 것은 아니다.

  바로 S/W의 최신버전이 나와도 

  Ubuntu의 다음버전까지 기다려야 하기 때문이다.

  그래서 필요한 기능이 바로 PPA이다.


---


## PPA

* PPA(Personal Package Archive)를 통해 최신 버전을 다운받을 수 있다.


### PPA 사용 방법


[launchpad](https://launchpad.net/)에서 검색을 한다.
  



``` shell
# 저장소 추가
# 저장소에 추가된 PPA_Info는 apt-get update 명령어를 통해 자동으로 Update 된다.
# This command adds the PPA repository to the list.
sudo add-apt-repository <PPA_info> 

# 저장소 업데이트
# This command updates the list of the packages that can be installed on the system.
sudo apt-get update

# 프로그램 설치
# This command installs the package.
sudo apt-get install <package_in_PPA>

# 저장소 삭제
sudo add-apt-repository --remove <PPA_info>
```


### 용어 해설

> PPA_Info

* PPA_info가 ppa:goodgid/gidhub 라고 한다면 

  다음과 같이 해석하면 된다.

  goodgid = User

  gidhub = 해당 User의 패키지 모음 저장소명

* 관련 Repository는 [https://launchpad.net/](https://launchpad.net/)에서 검색을 하면 된다.




---

## PPA 검색

* 국내 PPA 사이트 : [https://launchpad.net/~ubuntu-ko/+archive/ppa](https://launchpad.net/~ubuntu-ko/+archive/ppa)

* 해외 PPA 사이트 : [https://launchpad.net/ubuntu](https://launchpad.net/ubuntu)





## Reference

* [Using PPA in Ubuntu Linux [Complete Guide]](https://itsfoss.com/ppa-guide/)

* [[Ubuntu] 우분투 APT repository 제거하기](https://m.blog.naver.com/PostView.nhn?blogId=opusk&logNo=220986301109&proxyReferer=https:%2F%2Fwww.google.com%2F)