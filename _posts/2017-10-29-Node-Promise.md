---
layout: post
title:  " Promise "
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

* `Promise`를 사용하여 흐름제어를 하기. <br> (=Callback Hell 해결하기)

{% capture images %}
	/assets/img/posts/promise_1.png
	/assets/img/posts/promise_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}


---

## Code
``` js

const fs = require('fs');
const crypto = require('crypto');
const http = require('http');

http.createServer(function(req, res) {
  let beforeHashing = 'Example Password';

  return new Promise((fulfill, reject) => {
      crypto.randomBytes(32, function(err, buffer) {
        if (err) reject(err);
        else fulfill(buffer.toString('base64'));
      });
    })
    .catch(err => {
      console.log(err);
    })
    .then(salt => {
      return new Promise((fulfill, reject) => {
        crypto.pbkdf2(beforeHashing, salt, 100000, 64, 'sha512', function(err, hashed) {
          if (err) reject(err, null);
          else fulfill(hashed.toString('base64'));
        });
      });
    })
    .catch(err => {
      console.log(err);
    })
    .then(afterHashing => {
      return new Promise((fulfill, reject) => {
        fs.writeFile('./hashed.txt', afterHashing, 'utf-8', function(err) {
          if (err) reject(err);
          else fulfill("Successful save data!");
        });
      });
    })
    .catch(err => {
      console.log(err);
    })
    .then(msg => {
      return new Promise((fulfill, reject) => {
        res.writeHead(201, {
          "Content-Type": "text/plain"
        });
        res.end("successful save hashed data");
        console.log(msg);
      });
    });

}).listen(3000, function() {
  console.log("Server running on port 3000!");
});

```

---

## File

[Promise.js](https://github.com/goodGid/Node.js/blob/master/Source/promise.js)
