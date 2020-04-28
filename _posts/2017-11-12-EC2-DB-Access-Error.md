---
layout: post
title:  " [AWS] Ubuntu에서 MySQL 접근 불가 : EC2에서 RDS 접근 불가 "
categories: AWS
author: goodGid
---
* content
{:toc}

## Problem

* Local에서는 DB 접속이 잘 되는데 Ubuntu에서는 접속이 되지 않았다.


## Environment

* Server : Ubuntu by EC2

  DB : MySQL by RDS


## Solution

* Inbound rules에 3306 포트가 열려있지 않기 때문에

  MySQL의 Default 포트인 3306로 요청 시 접속이 되지 않았다.

* AWS에서 다음과 같이 설정을 해주면 된다.

---

> Step 0.

* AWS 서비스를 사용하고 있기 때문에 

  AWS 기준으로 해결 방법을 알아본다.

---
 
> Step 1. 

* [AWS](https://aws.amazon.com/console/) 로그인 -> Service -> EC2 -> **Security Groups** 접속한다.

---

> Step 2. 

* 사용중인 Security Group을 클릭한다.

![](/assets/img/aws/ec2_rds_error_1.png)

---

> Step 3. 

* 3306 포트를 추가한다.

![](/assets/img/aws/ec2_rds_error_2.png)

---

> Step 4.

* DB 접속이 잘 되는지 체크해본다. 

