---
layout: post
title:  " [네트워크] 0.0.0.0/0 과 ::/0는 뭐가 다른걸까? "
categories: Network
author: goodGid
---
* content
{:toc}

## Question

![](/assets/img/network/Network-IP4-IP6-Different_1.png)

* 0.0.0.0/0 과 ::/0 는 무슨 차이일까?




## Answer

* 간단히 말하면 IPv4와 IPv6를 위한 개념이다.

![](/assets/img/network/Network-IP4-IP6-Different_2.png)

*출처 : [AWS Docs : 라우팅 테이블](http://docs.aws.amazon.com/ko_kr/AmazonVPC/latest/UserGuide/VPC_Route_Tables.html)*

---

![](/assets/img/network/Network-IP4-IP6-Different_3.png)

* 결국은 **any**를 나타내기위한 차이일 뿐이다. 