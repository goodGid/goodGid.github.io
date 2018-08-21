---
layout: post
title:  " Error about Router.use() "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}

## Problem

* npm start 명령어를 실행시키는데 다음과 같은 Error가 떴다. 

{% capture images %}
	/assets/img/posts/ec2_error_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

## Solve

* 여러가지 이유가 있겠지만 나는 다음과 같은 이유였다.

{% capture images %}
	/assets/img/posts/ec2_error_2.png
	/assets/img/posts/ec2_error_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}

* `exports`에 router를 등록 안해줬다.
