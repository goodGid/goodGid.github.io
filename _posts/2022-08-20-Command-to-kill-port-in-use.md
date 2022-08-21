---
layout: post
title:  " [Linux] 사용중인 포트(Port) 죽이는 명령어 (feat. fuser) "
categories: Linux
author: goodGid
---
* content
{:toc}

## fuser

* [fuser는 파일이나 소켓을 어떤 프로세스가 사용하는 지 알려주는 명령어이다.](https://www.lesstif.com/lpt/linux-fuser-socket-95879173.html)


### Options

### [-k, -kill](https://www.lesstif.com/lpt/linux-fuser-socket-95879173.html#linuxfuser사용법파일이나socket을어떤프로세스가사용중인지확인-killsignal보내기)

* -k,–kill 옵션을 사용하면 

  특정 파일이나 디렉터리를 사용하는 모든 프로세스에게 SIGKILL 전송이 가능하다.

```
$ sudo fuser -k /var/
```

---

### [-n, --namespace](https://www.lesstif.com/lpt/linux-fuser-socket-95879173.html#linuxfuser%EC%82%AC%EC%9A%A9%EB%B2%95%ED%8C%8C%EC%9D%BC%EC%9D%B4%EB%82%98socket%EC%9D%84%EC%96%B4%EB%96%A4%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EA%B0%80%EC%82%AC%EC%9A%A9%EC%A4%91%EC%9D%B8%EC%A7%80%ED%99%95%EC%9D%B8-namespace%EC%82%AC%EC%9A%A9)

* -n, --namespace 옵션을 사용하면 

  네임스페이스(file, udp, tcp) 안에서 프로세스를 찾는다.
  
``` 
$ sudo fuser -n tcp 8080
```

![](/assets/img/linux/Command-to-kill-port-in-use_1.png)