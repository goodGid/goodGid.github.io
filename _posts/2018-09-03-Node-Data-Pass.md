---
layout: post
title:  " URL을 이용한 데이터 전송 "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}

## ToDo 

* req.query와 req.params의 사용법을 익혀보자 !










``` js

## req.query

// GET /search?q=tobi+ferret
req.query.q
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

req.query.shoe.type
// => "converse"



## req.params

router.get('/topic/:id/:name', function(req, res){
	const id = req.params.id;
	const name = req.params.name;
	console.log('id : ' + id);
	console.log('name : ' + name);
});

<button type="submit" formaction="/topic/1">goodGid</button> // Not Found
<button type="submit" formaction="/topic/1/2">goodGid2</button> // 정상 실행

```



---

## Review

* 항상 헷갈렸던 **req.query**와 **req.params** 사용법 정리를 했다.