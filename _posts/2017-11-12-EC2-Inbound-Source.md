---
layout: post
title:  " EC2 Inbound Source "
categories: AWS
author: goodGid
---
* content
{:toc}


## Concept

* Security에서 Rule을 변경하는데 의문점이 들었다.

![](/assets/img/aws/ec2_inbound_source_1.png)


```
0.0.0.0/0 과
::/0 은
무슨 차이일까 ?
무슨 뜻일까 ?
```

## Solve

* 간단히 말하면 IPv4와 IPv6를 위한 개념이다.

![](/assets/img/aws/ec2_inbound_source_2.png)


[Comment 출처](http://docs.aws.amazon.com/ko_kr/AmazonVPC/latest/UserGuide/VPC_Route_Tables.html)

---


![](/assets/img/aws/ec2_inbound_source_3.png)

* 결국은 `any`를 나타내기위한 차이일 뿐이다. 