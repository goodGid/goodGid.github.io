---
layout: post
title:  " DB Access Error from EC2 "
categories: AWS
author: goodGid
---
* content
{:toc}


## Problem

* Local에서는 RDS접속이 잘 되는데 EC2에서는 접속이 안됐다.

![](/assets/img/aws/ec2_rds_error_1.png)

## Solve

* RDS에 접속 시 3306 포트를 안열어준 상태였다.

* AWS 사이트에서 다음과 같이 설정을 해주니 해결이 되었다.
 
#### Step 1. 

Click to `Security Groups`

#### Step 2. 

![](/assets/img/aws/ec2_rds_error_2.png)


#### Step 3. 

![](/assets/img/aws/ec2_rds_error_3.png)
