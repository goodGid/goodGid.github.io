---
layout: post
title:  " Redis 서버에 접속중인 Client 목록 확인 방법 "
categories: Redis
author: goodGid
use_math: true
---
* content
{:toc}

## Prologue

* 회사에서 Redis 서버를 재기동 해야 하는 이슈가 생겼다.

  재기동하기 전에 현재 Redis 서버와 커넥션을 맺고 있는 클라이언트를 확인하고 Graceful하게 종료를 시켜야 했다.

* Redis 서버와 연결을 맺고 있는 명령어인 **CLIENT LIST** 명령어에 대해 알아보자.




---

## CLIENT LIST

```
redis-cli CLIENT LIST
```

* 위 명령어는 Redis 서버와 연결된 모든 클라이언트 정보를 출력한다.

  그 정보의 종류로는 각 클라이언트에 대한 ID, IP 주소, 포트, 연결 상태 등이 있다.

> Output

```
id=4 addr=127.0.0.1:60942 fd=8 name= age=146 idle=0 flags=N db=0 sub=0 psub=0 multi=-1 qbuf=26 qbuf-free=65536 obl=0 oll=0 omem=0 events=r cmd=client
id=5 addr=127.0.0.1:60943 fd=9 name= age=145 idle=0 flags=N db=0 sub=0 psub=0 multi=-1 qbuf=26 qbuf-free=65536 obl=0 oll=0 omem=0 events=r cmd=client
```

* id : 클라이언트의 고유 식별자로, 예를 들어 id=4, id=5와 같다.

* addr : 클라이언트의 IP 주소와 포트 번호로, addr=127.0.0.1:60942, addr=127.0.0.1:60943처럼 표시된다.

* fd : 파일 디스크립터 번호로, fd=8, fd=9와 같은 값을 가진다.

* name : 클라이언트의 이름을 나타내며 기본적으로 비어 있을 수 있다. (ex. name= 비어 있음)

* age : 클라이언트가 연결된 시간을 초 단위로 나타내며 age=146, age=145처럼 표시된다.

* idle : 클라이언트가 마지막으로 명령을 보낸 이후 경과한 시간(초 단위)이며, idle=0과 같이 나타난다.

* flags : 클라이언트의 플래그를 나타내며 N은 일반 클라이언트를 의미한다. (ex. flags=N)

  ```
  N (normal) → 일반 클라이언트
  M (master) → 마스터 역할을 하는 클라이언트
  S (slave / replica) → 슬레이브(레플리카) 역할을 하는 클라이언트
  O (out of memory) → Redis가 메모리 제한을 초과하여 명령을 거부한 클라이언트
  T (transaction) → 트랜잭션 중인 클라이언트 (MULTI 명령을 실행한 상태)
  ```

* db : 클라이언트가 사용 중인 데이터베이스 번호를 나타내며 db=0과 같은 값을 가진다.

* sub : 클라이언트가 구독 중인 채널 수를 나타내며 sub=0처럼 표시된다.

* psub : 클라이언트가 패턴 구독 중인 채널 수를 나타내며 psub=0과 같이 나타난다.

* multi : 클라이언트의 트랜잭션 멀티-명령 상태를 나타내며 -1이면 트랜잭션이 아님을 의미한다. (ex. multi=-1)

* qbuf : 수신 대기 중인 쿼리 버퍼 크기를 나타내며 qbuf=26처럼 표시된다.

* qbuf-free : 사용할 수 있는 쿼리 버퍼 크기를 나타내며 qbuf-free=65536과 같은 값을 가진다.

* obl : 출력 버퍼 길이를 나타내며 obl=0처럼 표시된다.

* oll : 출력 리스트 길이를 나타내며 oll=0과 같은 값을 가진다.

* omem : 출력 메모리 사용량을 나타내며 omem=0처럼 표시된다.

* events : 클라이언트 파일 디스크립터의 폴링 이벤트를 나타내며 r은 읽기 이벤트를 의미한다. (ex. events=r)

* cmd : 클라이언트가 마지막으로 실행한 명령어를 나타내며 cmd=client처럼 표시된다.

---

## 특정 클라이언트 종료하기

```
redis-cli CLIENT KILL <ip>:<port>
ex) redis-cli CLIENT KILL 127.0.0.1:6094
```

* 위 명령어로 특정 클라이언트의 연결을 강제로 종료할 수 있다.

```
redis-cli CLIENT KILL TYPE normal
```

* 특정 조건에 맞는 클라이언트를 종료 할 수도 있다.

```
redis-cli CLIENT KILL ID 3
```

* 특정 ID를 지정하여 클라이언트를 종료 할 수도 있다.

---

## Summary

* 실시간 서비스를 운영한다면 Redis 서버를 죽이는 건 쉽지 않음을 경험했다.

  다행히도 Master/Slave 구조로 클러스터링이 되어 있어서 한대씩 조심스럽게 작업을 수행했다.