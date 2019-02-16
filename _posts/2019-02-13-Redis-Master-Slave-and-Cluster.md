---
layout: post
title:  " Redis Master/Slave와 Cluster "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

* Redis Master-slave 및 Redis Cluster를 분석한다.








---

## Redis Master/Slave

![](/assets/img/posts/redis_master_slave_and_cluster_1.png)

* Redis Master-slave는 Redis에서 제공하는 가장 기본적인 Replication 기법이다. 

* 위의 그림은 Redis Master-slave 구성시 Architecture를 나타내고 있다. 

* Redis의 Master-Slave 기법은 MySQL의 Master-slave Replication 기법과 유사하다.

* 하나의 Master에 다수의 Slave가 붙을 수 있다. 

* Master는 **Read-Write Mode**로 동작하고 Slave는 **Read-Only Mode**로 동작한다. 

* Redis Client는 필요에 따라서 Master에 붙어 Write 동작을 수행하거나

* 적절한 Master or Slave에 붙어 Read 동작을 수행할 수 있다.

<br>

* Master-slave 사이의 Replication은 Async 방식을 이용한다. 

* Master는 Data 변경시 변경 내용을 backlog에 기록한다. 

* Slave는 Master에 접속하여 backlog의 내용을 바탕으로 Replication을 수행한다. 

* Async이기 때문에 Master에 저장된 Data가 Slave에는 잠깐동안 저장되지 않을 수 있다. 

* 따라서 Redis Client(App)는 Slave에서 Data를 Read시 Async 특징을 반드시 고려해야한다.

<br>

* Master가 죽을경우 Slave는 Master에게 주기적으로 Connection을 요청하며 Master가 되살아 날때까지 대기한다. 

* Master가 살아나면 Slave는 Replication을 수행하여 Master와 동기화를 맞춘다. 

* Master의 복구가 힘든 경우 Redis 관리자는 Slave 중에서 하나를 수동으로 Master로 승격시키고 

* 나머지 Slave들을 새로운 Master로부터 Replication 하도록 설정 해야한다. 

* Master가 바뀐뒤에는 죽었던 Master는 새로운 Master의 Slave로 설정하여 이용한다.

### Sentinel

* Master의 동작이 멈출경우 Redis Client는 Slave를 통해서 Read 동작을 수행 할 수 있지만 Write 동작을 수행 할 수 없다. 

* 따라서 Master의 Downtime은 Redis Cluster의 가용성을 떨어트린다. 

* 이러한 가용성 문제를 해결을 도와주는 App이 **Sentinel**이다. 

* Sentinel은 Master가 죽는지 감지하고 Master가 죽었을경우 Slave 중 하나를 Master로 승격시키고 기존의 Master는 Slave로 강등시킨다. 

* Redis 관리자의 간섭없이 자동으로 이루어지기 때문에 Master의 Downtime을 최소화하여 **HA(High Availabilty)**를 가능하게 만든다.

* Sentinel은 일반적으로 홀수개로 구성하여 Split-brain을 방지한다. 

* 위의 그림에서는 Sentinal을 Redis와 별도의 Node에 구성하여 이용하는 모습을 나타내고 있지만 

* Sentinel을 Redis와 동일한 Node에 구성하여 이용하여도 문제없다. 

* Sentinel 설정에는 **Quorum이란 설정값**이 존재한다. 

* Quorum은 특정 Redis에 장애 발생시 몇 개의 Sentinel이 특정 Redis의 장애 발생을 감지해야 장애라고 판별하는지를 결정하는 **기준값**이다. 

* 예를들어 Quorum 값을 2로 설정하였을 경우

* 2개 이상의 Sentienl이 특정 Redis에 장애가 발생하였다고 판별해야 Sentinel은 해당 Redis에 대한 장애 대응을 수행한다.

---

### HAProxy

* Redis Master-slave 구성시 Master는 RW(Read/Write) Mode로 동작하고 Slave는 RO(ReadOnly) Mode로 동작하기 때문에 Client는 Master의 IP/Port / Slave의 IP/Port를 알고 필요에 따라 적절한 Master 또는 Slave에 붙어 동작을 수행해야 한다. 

* 따라서 Master의 장애 발생시 Master가 교체되면 그에 따라 Client의 Redis 설정도 바뀌어야한다. 

* 하지만 Master가 교체될때 마다 Redis를 이용하는 모든 Client의 설정을 바꾸는 일은 쉬운일이 아니다. 

* 이러한 문제를 해결하기 위해서 일반적으로 **HAProxy**를 이용한다.

* Haproxy는 Client에게 Redis의 Master, Slave에 일정하게 접근 할 수 있는 **End-point**를 제공한다. 

* 위의 그림에서 *Port X* 는 Master에게 접근 할 수 있는 Port를 나타내고 

* *Port Y*는 Slave에게 접근 할 수 있는 Port를 나타낸다. 

* HAProxy는 tcp-check를 이용하여 주기적으로 각 Redis가 Master로 동작하는지 또는 Slave 동작하는지 파악하고 그에따라 동적으로 Routing Rule을 설정한다. 

* 따라서 Master가 교체되어도 Haproxy는 일정한 End-point를 Client에게 제공 할 수 있다.


---


## Redis Cluster

![](/assets/img/posts/redis_master_slave_and_cluster_2.png)

* Redis Cluster는 Redis에서 제공하는 Replication 및 Sharding 기법이다. 

* 위의 그림은 Redis Cluster 구성시 Architecture를 나타낸다. 

* Cluster를 구성하는 각 Redis는 다른 모든 Redis들과 직접 연결하여 **gossip Protocol**을 통해 통신한다. 

* gossip Protocol을 통해서 각 Redis는 Redis 상태 정보를 교환한다. 

* gossip Protocl은 Redis Client가 이용하는 Port번호보다 10000이 높은 번호를 Port로 이용한다. 

* Redis Client가 이용하는 기본 Port 번호는 6379를 이용하기 때문에 gossip Protocol이 이용하는 기본 Port번호는 16379가 된다. 

* Client 또한 Cluster를 구성하는 모든 Redis와 직접 연결하여 Data를 주고 받는다.

* Redis Cluster는 Multi-master, Multi-slave 구조를 갖으며 각 Redis는 Master 또는 Slave로 동작한다. 

* 각 Master는 **Hash Slot**이라는 Data 저장구역을 다른 Master와 나누어 소유한다. 

* Hash Slot은 0부터 16384까지의 주소를 가지고 있다. 

* 위의 그림은 각 Master가 Hash Slot을 3개로 균등하게 분활해서 구성한 모습을 나타내고 있다. 

* Key-value Data가 이용할 Hash Slot은 Data의 Key를 Hashing한 결과값을 이용한다.

* Hashing은 CRC16 및 Moduler 연산자를 이용하여 Data가 각 Hash Slot에 균등하게 배분되도록 한다. 

* 따라서 Data는 각 Master의 Hash Slot의 크기에 비례하여 Data를 저장하게 된다.

<br>

* 각 Master에 할당한 Hash Slot은 Redis 관리자에 의해서 동적으로 변경이 가능하다.

* 따라서 동적으로 Master를 추가하거나 제거하는것도 가능하다. 

* 각 Master는 다수의 Slave를 갖을 수 있다. 

* 위의 그림에서는 각 Master가 하나의 Slave를 갖고 있는 모습을 나타내고 있다. 

* Master와 Slave 사이의 Replication은 Redis Master-slave 구성과 동일하게 Async 방식으로 이루어진다. 

* 따라서 Slave도 동적으로 자유롭게 추가하거나 제거하는것이 가능하다.

<br>

* Client는 Master, Slave 또는 Master가 가지고 있는 Hash Slot에 관계없이 Cluster에 포함된 아무 Redis에게 Data/Write 요청을 보낼 수 있다. 

* Redis는 자신이 처리 할 수 있는 요청은 직접 처리하고 Client에게 처리 결과를 전달한다. 

* 만약 자신이 처리 할 수 없는 요청이라면 해당 요청을 처리할 수 있는 Redis의 정보를 Client에게 전달한다. 

* Client는 Redis가 전달해준 다른 Redis에게 동일 요청을 다시 보내서 Data를 처리한다. 

* 예를들어 Slave Redis에게 Write 요청을 보내면 Slave Redis는 해당 요청을 처리 할 수 있는 Master Redis의 정보를 Client에게 넘겨준다. 

* 이러한 요청 Redirection으로 인해서 Client는 Redis Cluster 이용시 Redis Cluster를 지원하는 Library를 이용해야한다.

<br>

* Master Redis가 죽을경우 죽은 Master의 Slave Redis는 gossip Protocol을 통해서 Master의 죽음을 파악한뒤 스스로 Master로 승격하여 Master를 대신한다. 

* 그 후 죽은 Master가 살아나서 동작하는 경우 스스로 Slave로 강등하여 동작한다. 

* Master와 Slave사이의 Replication은 Async 방식으로 이루어지기 때문에 Master의 죽음은 Master와 Slave 사이의 **Data** 정합성을 깰 수 있다. 

* 깨진 Data 정합성으로 인해서 Master와 Slave 사이의 Data 충돌이 발생하는 경우 무조건 **나중에 Master가 된 Data를 기준으로 정합성**을 맞춘다.




---

## 참고

* [Redis Master-slave, Cluster](https://ssup2.github.io/theory_analysis/Redis_Master_Slave_Cluster/)