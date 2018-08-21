---
layout: post
title:  " Middleware (2) "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}



## What is Middleware ?

* 미들웨어 : 구조 내에서 중간 처리를 위한 함수(함수들의 꾸러미가 모듈)

1. Express가 제공하는 가장 강력한 기능 중 하나다.
2. express 프레임워크에서 사용할 수 있는 중간 처리 목적의 소프트웨어 : 기본적인 express 구조 내에서 처리 목적으로 사용
3. 요청에 대한 응답을 완수하기 전까지 중간중간 다양한 일을 처리할 수 있음
4. 미들웨어 함수 생명주기 : request - response 응답을 주기로 종료 
5. 미들웨어 함수 우선순위 : 먼저 로드되는 미들웨어 함수가 먼저 실행됨(코드 순서 중요)


{% capture images %}
	/assets/img/posts/middleware_2_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


``` js

var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);

```


위의 예에서 next()에 대한 호출에 주목하십시오. 이 함수를 호출하면 앱 내의 그 다음 미들웨어 함수가 호출됩니다. next() 함수는 Node.js 또는 Express API의 일부가 아니지만, 미들웨어 함수에 전달되는 세 번째 인수입니다. next() 함수에는 어떠한 이름을 지정해도 좋지만,일반적으로 항상 “next”라는 이름을 갖습니다. 혼란을 방지하려면 항상 이러한 방식을 사용하십시오.
{: .notice}

