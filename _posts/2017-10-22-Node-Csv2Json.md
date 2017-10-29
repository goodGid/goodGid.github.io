---
layout: post
title:  " Node :: CSV to Json "
date:   2017-10-22
excerpt: " CSV to Json "
cate : "post"
tag:
- Node.js
---


## Code
{% highlight JavaScript %}

const Converter = require('csvtojson').Converter;
const fs = require('fs');
const http = require('http');

const server = http.createServer(function(req, res) {
  let converter = new Converter({}); // converter는 클래스라서 new로 객체를 만들어서 사용해야 한다 !
  let data = [];
  converter.fromFile('./music.csv', function(err, result) {
    if (err) {
      console.log("read csv file error : " + err);
    } else {
      console.log("successful read csv file");
      data = result;
      res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
      });
      res.end(JSON.stringify({
        msg: "success",
        data: data
      }));
    }
  });

}).listen(3000, function() {
  console.log("3000번 포트로 구동중!");
})

{% endhighlight %}


---

## File

[Csv2Json.js](https://github.com/goodGid/Node.js/blob/master/Source/Csv2Json.js)
