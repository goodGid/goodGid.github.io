---
layout: post
title:  " 트랜잭션 고립화 레벨(Transaction Isolation Level) "
categories: Database
tags: Database
author: goodGid
---
* content
{:toc}

## Isolation Level의 필요성

* 데이터베이스의 무엇보도 **중요한 기능**은 **데이터**를 **정확**하고 **안전**하게 **저장**하며 <br> **데이터**의 **변경**이나 **수정**시 **제한**을 두어 **안정성**을 **저해**하는 **요소**를 막으며 <br> **데이터 상태들**을 항상 **옳게 유지**하는 것을 의미한다. 

* 즉 흔히 말하는 **무결성**을 보장하는 것이다.

* 데이터의 무결성 보장과 관련된 **트랜잭션의 ACID 보장**이라고 할 수 있다.

* ACID(Atomicity, Consistency, Isolation, Durability)는 트랜잭션 보장을 위해 갖추어야 할 속성들을 나타낸다. 

* 이를 위해서는 DB는 ACID가 의미하는 바와 같이 **트랜잭션**이 **원자적**이면서도 **독립적인 수행**을 하도록해야 한다.

* 그래서 등장하는 개념이 **Locking**이다.












* **Locking**은 트랜잭션이 DB를 다루는 동안 다른 트랜잭션이 관여하지 못하게 막는 것이다.

* 하지만 **무조건적인 Locking**으로 동시에 수행되는 많은 트랜잭션들을 일렬로 대기시킨다면 <br> **DB의 성능**은 현저하게 떨어진다. 

* 반대로 **응답성**을 높이기 위해 **Locking 범위**를 줄인다면 잘못된 값이 처리 될 여지가 있다. 

* 그래서 최대한 **효율적인 Locking 방법**이 필요하다.

* 이와 관련된 Locking 방법이 **Isolation Level**이라고 생각하면 된다.


---

## Isolation Level의 종류

### Read Uncommitted

* SELECT 문장을 수행하는 경우 **해당 데이터**에 **Shared Lock**이 걸리지 않는 Level이다. 

* 따라서 어떤 사용자가 A -> B로 데이터를 변경하는 동안 <br> 다른 사용자는 B라는 아직 **완료되지 않은(Uncommitted 혹은 Dirty) 데이터** B를 읽을 수 있다.

* 트랜잭션이 끝나지 않은 상황에서 각기 **다른 트랜잭션**이 **변경한 내용**에 대한 **조회**가 가능하다.

* **데이터베이서의 일관성**을 유지할 수 없다.

![](/assets/img/database/transaction_isolation_lvel_1.png)

* Transaction1이 수행 중에 Transaction2가 값을 변경할 경우 <br> Transaction1이 다시 조회를 하는 시점에 Commit은 하지 않았지만 <br> 이미 Transaction2가 값을 변경하였기 때문에 <br> *아무개* 에서 *개발자* 로 값이 변경되어 조회가 된다.



---


### Read Committed

* **SQL Server**가 Default로 사용하는 Isolation Level이다. 

* 이 Level에선 SELECT 문장이 수행되는 동안 **해당 데이터**에 **Shared Lock**이 걸린다.

* 그러므로 어떠한 사용자가 A -> B로 데이터를 변경하는 동안 <br> 다른 사용자는 해당 데이터에 접근할 수 없다.

* **Read Uncommitted**와 다르게 **Commit**이 이루어진 **데이터**가 **조회**된다. 

* 하지만 어떠한 사용자가 A -> B로 데이터를 변경하는 동안 <br> 다른 Transaction은 접근할 수 없어 대기하게 된다.

![](/assets/img/database/transaction_isolation_lvel_2.png)


1. Transaction2가 Update를 하게된다. 

2. 아직 Commit하지 않아 Transaction1은 SELECT을 하지 못하고 대기하게 된다.

3. Transaction2가 Commit명령어를 날리게 된다. 

4. 이제 Transaction2는 조회가 가능하다.



---


### Repeatable Read

* 트랜잭션이 완료될 때까지 SELECT 문장이 사용하는 모든 데이터에 **Shared Lock**이 걸리므로 <br> 다른 사용자는 그 영역에 해당되는 데이터에 대한 수정이 불가능하다. 

* 가령 *SELECT col1 from A where col1 between 1 and 10* 을 수행하였고 <br> 이 범위에 해당하는 데이터가 2건이 있는 경우(col1 = 1,5) <br> 다른 사용자가 col1 = 1 or col1 = 5인 Row에 대한 UPDATE 작업이 불가능하다. 

* 하지만 col1이 1과 5를 제외한 **나머지 범위**에 해당하는 Row를 **INSERT**하는 것은 **가능**하다.

* Transaction이 범위내에서는 **조회한 데이터**의 내용이 항상 **동일함**을 보장한다.

![](/assets/img/database/transaction_isolation_lvel_3.png)

1. Transaction1이 SELECT시점에 아무개가 조회된다. 

2. Transaction2가 Update후 Commit을 시행하였지만 Update가 안된다. <br> 그러나 Insert는 된다. 

3. Transaction1이 다시 조회 해도 <br> Transaction2가 Commit이 되지 않았기 때문에 아무개로 조회된다. <br> 하지만 Insert한 동네개발자는 조회된다.

4. Transaction1이 종료되면 다시 Commit이 이루어지기 때문에 개발자로 조회가 된다.




---



### Serializable

* 말 그대로 **모든 동작**이 **직렬화**되어 작동한다. 

* **Repeatable Read**와 다르게 **Insert**를 하여도 작동하지 않게 된다.

* 트랜잭션이 완료될 때까지 SELECT 문장이 사용하는 **모든 데이터**에 **Shared Lock**이 걸리므로 <br> 다른 사용자는 그 영역에 해당되는 데이터에 대한 **수정 및 입력**이 불가능하다.

* 예를 들어 **[Repeatable Read]({{site.url}}/Transaction-Isolation-Level/#repeatable-read)**의 경우 1에서 10 사이에 해당되는 데이터에 대한 UPADTE이 가능하다. 

* 하지만 이 Level에서는 **UPDATE 작업**도 허용하지 않는다.


![](/assets/img/database/transaction_isolation_lvel_4.png)



---

## 부작용(Side Effect)

### Dirty Read

* 어떤 트랜잭션에서 아직 실행이 끝난지 않은 다른 트랜잭션에 의한 변경 사항을 보게되는 경우를 **Dirty Read**라고 한다.

* 만약 **수정한 트랜잭션**이 그 변경 사항을 **롤백**하면 <br> 그 데이터를 읽은 다른 트랜잭션은 **Dirty 데이터**를 가지고 있다고 말한다.

---

### Non-Repeatable Read

* 어떤 트랜잭션에서 **같은 질의**를 사용했을 때 질의를 아무리 **여러번 해도** <br> 그리고 다른 트랜잭션에서 아무리 여러 번 그 행을 변경해도 <br> 항상 **같은 데이터만** 읽어드리는 경우를 **Non-Repeatable Read**라고 한다. 

* 즉 Non-Repeatable Read가 요구되는 트랜잭션에서는 **다른 트랜잭션**에 의한 **변경 사항**을 볼 수가 없다. 

* 그러한 **변경 사항**을 보고 싶으면 어플리케이션에서 **트랜잭션**을 **새로 시작**해야 한다.

---


### Phantom Read

* Phantom Read는 **다른 트랜잭션**에 의한 **변경 사항**으로 인해 <br> 현재 사용 중인 트랜잭션의 WHERE 절의 **조건**에 맞는 **새로운 행**이 생길 수 있는 경우에 관한 것이다. 

* 예를 들어 잔고가 $100 미만인 계좌가 2개인 DB에서

* $100 미만인 계좌를 찾는 트랜잭션이 있고

* 그 트랜잭션안에서 Select 쿼리를 2번 수행한다고 가정하자.

* 처음에 데이터를 읽으면 2개의 계좌를 찾게 된다.

* 이 때 다른 트랜잭션에서 $0인 계좌를 새로 만들면

* 두번째 데이터를 읽을 땐 3개의 계좌를 찾게 된다.

* 이처럼 WHERE 절의 **조건**에 맞는 **새로운 행**이 생길 수 있는 경우를 말한다.

* **트랜잭션 격리 수준(Transaction Isolation Level)**에서 **Phantom Read**를 **지원**하면 <br> 새로운 **유령(phantom)**행이 나오지만 <br> 지원하지 않으면 새로 생긴 행을 볼 수 없다.


![](/assets/img/database/transaction_isolation_lvel_5.png)



---

## 추가 정보

* **MySQL**의 InnoDB 스토리지 엔진의 **기본 Isolation Level**이 **REPEATABLE-READ**이고

* **Oracle**은 **READ-COMMITED**이다. 

* **Oracle**은 **READ-COMMITED**와 **SERIALIZABLE**만 지원하며 나머지 두가지 **Isolation Level**은 지원하지 않는다.

* 각 DBMS별 isolation Level 에 자세한 내용은 다음 링크에서 참조할 수 있다.

* MySQL : [http://dev.mysql.com/doc/refman/5.5/en/set-transaction.html](http://dev.mysql.com/doc/refman/5.5/en/set-transaction.html)

* Oracle : [http://www.oracle.com/technetwork/issue-archive/2005/05-nov/o65asktom-082389.html](http://www.oracle.com/technetwork/issue-archive/2005/05-nov/o65asktom-082389.html)



---

## 참고

* [데이터베이스 Isolation Level](http://hundredin.net/2012/07/26/isolation-Level/)

* [Isolation Level 이해하기](https://medium.com/@wonderful.dev/isolation-Level-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-94e2c30cd8c9)