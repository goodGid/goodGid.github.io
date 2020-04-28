---
layout: post
title:  " [AWS] EC2 Inbound Source "
categories: AWS
author: goodGid
---
* content
{:toc}

## Concept

* Security에서 Rule을 변경하는데 긍금증이 생겼다.

![](/assets/img/aws/ec2_inbound_source_1.png)


```
0.0.0.0/0 과
::/0 은
무슨 차이일까 ?
무슨 뜻일까 ?
```

## Solution

* 간단히 말하면 IPv4와 IPv6를 위한 개념이다.

![](/assets/img/aws/ec2_inbound_source_2.png)

*출처 : [AWS Docs : 라우팅 테이블](http://docs.aws.amazon.com/ko_kr/AmazonVPC/latest/UserGuide/VPC_Route_Tables.html)*




---


![](/assets/img/aws/ec2_inbound_source_3.png)

* 결국은 `any`를 나타내기위한 차이일 뿐이다. 