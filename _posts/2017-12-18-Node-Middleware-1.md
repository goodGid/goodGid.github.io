---
layout: post
title:  " Middleware (1) "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}



## What is Middleware ?

* Express가 제공하는 가장 강력한 기능 중 하나다.

* 기본 개념은 서버로 전해지는 모든 요청에 적용되는 필터 스택과 같은 것이다.

* 모든 요청은 각각의 필터를 거치기 때문에, 각 필터는 다음 필터로 요청을 넘기기 전에 특정 작업을 수행할 수 있다.


---


## Middleware Type

* morgan : 로깅을 담당하는 모듈로, Debug를 하는데 아주 중요하다.

``` js
const logger = require('morgan');
app.use(logger('dev'));
```

* bodyParser : 브라우저의 HTML 양식을 통해 제출된 양식 데이터의 해석을 도와준다. <br> POST 요청을 통해 제출된 양식 데이터는 req.body 프로퍼티를 통해 접근 가능하다.

``` js
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```


* methodOverride : `REST API`를 위한 `UPDATE`와 `PUT`같은 HTTP 메소드를 지원하지 않는 구형 브라우저들을 위해서 methodOverride 미들웨어는 숨겨진 input 필드를 사용해 그러한 요청들을 흉내 낼 수 있게 한다.

* cookieParser : 쿠키를 보내고 받을 수 있게 해준다.

``` js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```


* errorHandler : 전체 미들웨어 프로세스 중에 발생하는 어떤 에러든 처리할 수 있게 해준다. <br> 일반적으로 자체 errorHandler를 작성해 기본 404 HTML 페이지를 반환하거나 데이터 저장소에 에러를 남기는 작업 등을 할 수 있다.

* Handlebars : 뷰를 위해 사용할 템플릿 엔진이다.

* express.static : 미리 정의도니 디렉토리의 정적 자원을 브라우저에 그려줄 때 사용한다.
``` js
app.use(express.static(path.join(__dirname, 'public')));
```

