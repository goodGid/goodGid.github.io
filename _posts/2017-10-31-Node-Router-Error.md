---
layout: post
title:  " Error about Router.use() "
categories: Node.js
author: goodGid
---
* content
{:toc}

## Problem

* npm start 명령어를 실행시키는데 다음과 같은 Error가 떴다. 

![](/assets/img/node_js/ec2_error_1.png)

## Solve

* 여러가지 이유가 있겠지만 나는 다음과 같은 이유였다.

![](/assets/img/node_js/ec2_error_2.png)

![](/assets/img/node_js/ec2_error_3.png)

* `exports`에 router를 등록 안해줬다.
