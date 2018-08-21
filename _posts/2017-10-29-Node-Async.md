---
layout: post
title:  " Async "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}


## Problem

* 단순 Callback으로만 비동기를 동기화 시키려면 너무나 많은 중첩 Callback이 필요하다.

``` js

http.createServer(function(req, res) {
  let beforeHashing = 'Example Password';

  crypto.randomBytes(32, function(err, buffer) {
    if (err) {
      console.log(err);
    } else {
      crypto.pbkdf2(beforeHashing, buffer.toString('base64'), 100000, 64, 'sha512', function(err, hashed) {
        if (err) {
          console.log(err);
        } else {
          let afterHashing = hashed.toString('base64');
          fs.writeFile('./hashed.txt', afterHashing, 'utf-8', function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successful save data!");
              res.writeHead(201, {
                "Content-Type": "text/plain"
              });
              res.end("successful save hashed data");
            }
          });
        }
      });
    }
  });
}).listen(3000, function(){
	console.log("Server running on port 3000!");
})

```

---

## Solve 

* `Async`를 사용하여 흐름제어를 하기. <br> (=Callback Hell 해결하기)

{% capture images %}
	/assets/img/posts/async_1.png
	/assets/img/posts/async_2.png
	/assets/img/posts/async_3.png
	/assets/img/posts/async_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=4 %}


---

## Code
``` js

const fs = require('fs');
const crypto = require('crypto');
const http = require('http');
const async = require('async');

http.createServer(function(req, res) {
  let beforeHashing = 'Example Password';

  let taskArray = [
    function(callback) {
      crypto.randomBytes(32, function(err, buffer) {
        if (err) callback(err, null);
        else callback(null, buffer.toString('base64'));

        // else callback(null, buffer.toString('base64'), a,b,c ); 이렇게 보낸다면        
        // function(salt, a,b,c, callback) { 로 받아야한다. 
        // --> callback은 무조건 마지막에 위치한다 생각하면 됨 !

      });
    },
    function(salt, callback) {
      crypto.pbkdf2(beforeHashing, salt, 100000, 64, 'sha512', function(err, hashed) {
        if (err) callback(err, null);
        else callback(null, hashed.toString('base64'));
      });
    },
    function(afterHashing, callback) {
      fs.writeFile('./hashed.txt', afterHashing, 'utf-8', function(err) {
        if (err) callback(err, null);
        else callback(null);
      });
    },
    function(callback) {
      res.writeHead(201, {
        "Content-Type": "text/plain"
      });
      res.end("successful save hashed data");
      callback(null, "Successful save data!");
    }
  ];


  async.waterfall(taskArray, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}).listen(3000, function() {
  console.log("Server running on port 3000!");
});

```

---

## File

[Async.js](https://github.com/goodGid/Node.js/blob/master/Source/async.js)
