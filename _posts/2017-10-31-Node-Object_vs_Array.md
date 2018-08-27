---
layout: post
title:  " Object vs Array "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}


## Example

``` js

router.get('/', function(req, res)
{

  var array_1 = {}; // 객체 선언
  var array_2 = []; // 배열 선언

  var object_1 = {};
    object_1.name = "1 name";
    object_1.pwd = "1 pwd";
    object_1.age = "1 age";
  var object_2 = [];
    object_2.name = "2 name";
    object_2.pwd = "2 pwd";
    object_2.age = "2 age";


array_1.push(object_1);
array_1.push(object_2);
console.log("array_1[0] : " + array_1[0]);
console.log("array_1[1] : " + array_1[1]);
/*
Output
TypeError: array_1.push is not a function 
--> 객체에는 .push가 없다. 
*/

array_2.push(object_1);
array_2.push(object_2);
console.log("array_2[0] : " + array_2[0].name);
console.log("array_2[1] : " + array_2[1].name);
/*
Output
array_2[0] : 1 name
array_2[1] : 2 name
*/
res.status(200).send({
  data : array_2
});
});

```

{% capture images %}
	/assets/img/posts/node_object_vs_array_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


## Review

* `.push`를 사용하려면 `[]`로 선언해라. 
