---
layout: post
title:  " DB 커넥션 풀(Connection Pool) "
categories: Database
tags: Database
author: goodGid
---
* content
{:toc}

## DB 커넥션 풀이란?

* 서버는 **동시에 사용할 수 있는 사람의 수**라는 개념이 존재한다. 

* 일반적인 Connection Pool을 이용하면 **동시 접속자 수를 벗어나게 될 경우 에러(예외)가 발생**하게 된다. 

* 예외가 발생하면 그 접속자는 더이상 처리를 하지 못하므로 사이트 이용자는 다시 접속을 시도해야하는 불편함이 생긴다. 

* 이를 해결하기 위해 탄생한 것이 *Connection Pool* 이다. 












* Connection Pool이란 동시 접속자가 가질 수 있는 Connection을 하나로 모아놓고 관리한다는 개념이다. 

* 누군가 접속하면 자신이 관리하는 Pool에서 남아있는 Connection을 제공한다. 

* 하지만 남아있는 Connection이 없는 경우라면 해당 **클라이언트는 대기 상태로 전환**시킨다.

* 그리고 Connection이 다시 Pool에 들어오면 대기 상태에 있는 클라이언트에게 순서대로 제공한다. 

* 즉 데이터베이스와 연결된 Connection을 미리 만들어서 pool 속에 저장해 두고 있다가 

* 필요할 때 Connection을 Pool에서 쓰고 다시 Pool에 반환하는 기법을 말한다. 

<br>

* **웹 프로그램**에서는 데이터베이스의 환경설정과 연결 관리 등을 따로 XML파일이나 속성 파일을 사용해서 관리하고

* 이렇게 설정된 정보를 이름을 사용하여 획득하는 방법을 사용한다. 

* 웹 컨테이너가 실행되면서 Connection(connection) 객체를 미리 Pool(pool)에 생성해 둔다. 

* DB와 연결된 Connection(connection)을 미리 생성해서 

* Pool(pool) 속에 저장해 두고 있다가 필요할 때에 가져다 쓰고 반환한다. 

* 미리 생성해두기 때문에 데이터베이스에 부하를 줄이고 유동적으로 연결을 관리 할 수 있다.

![](/assets/img/database/db_connection_pool_1.png)


* 이렇게 Pool 속에 미리 생성되어 있는 Connection을 가져다가 사용하고

* 사용이 끝나면 Connection을 Pool에 반환합니다.


---

## 설명

* 만약 한명의 접속자가 웹 사이트에 접속했다고 가정합니다. 

* 해당 웹 사이트에서 접속자는 게시판을 확인하고 자신이 쓴 게시물을 수정하고 또 새로운 게시글을 등록합니다. 

* 그럼 이 한명의 접속자로 인해 DB접속은 아래와 같이 발생합니다.

<br>

1. 데이터 취득

2. 검색 후 데이터 취득

3. 데이터 갱신

4. 데이터 새등록

<br>

* 한명의 접속자로 인해 단 시간에 4번의 DB 접속이 일어난다. 

* 만약 접속자가 1000명 이라면 몇번의 DB 접속이 일어날까? 

* 이러한 오버헤드를 방지하기위해 **미리 Connection 객체를 생성하고 해당 Connection 객체를 관리하는것**을 의미한다. 

* 즉 *Connection Pool에 DB와 연결을 해 놓은 객체를 두고* 

* *필요할 때마다 Connection Pool에서 빌려오는 것* 이라고 생각하면 된다. 

* 그리고 연결이 끝나면 다시 Pool에 돌려준다. 

* Connection Pool을 너무 크게 해놓으면 당연히 메모리 소모가 크게 되고

* 적게 해놓으면 Connection이 많이 발생할 경우 **대기 시간이 발생**하기 때문에 

* 웹 사이트 동시 접속자 수 등 서버 부하에 따라 크기를 조정해야 한다.





---

## 정리

* Pool 속에 미리 Connection이 생성되어 있기 때문에 Connection을 생성하는 데 드는 연결 시간이 소비되지 않는다. 

* Connection을 계속해서 재사용하기 때문에 생성되는 Connection 수가 많지 않다. 

* Connection Pool을 사용하면 Connection을 생성하고 닫는 시간이 소모되지 않기 때문에 

* 그만큼 어플리케이션의 실행 속도가 빨라지며 또한 한 번에 생성될 수 있는 Connection 수를 제어하기 때문에 

* 동시 접속자 수가 몰려도 웹 어플리케이션이 쉽게 다운되지 않는다.

* 하지만 Connection Pool에서 생성되어 있는 Connection의 수는 한정적이기 때문에 

* Connection Pool에 있는 Connection의 수보다 동시 접속자가 많아지면

* Connection을 갖지 못한 사용자는 대기 상태로 전환되고

* Connection이 반환되면 대기하고 있는 순서대로 Connection이 제공된다.



---

## 참고

* [Connection Pool이란?](http://brownbears.tistory.com/289)