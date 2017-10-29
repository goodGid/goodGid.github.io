---
layout: post
title:  " Node :: File System "
date:   2017-10-22
excerpt: " File System "
cate : "post"
tag:
- Node.js
---


## Code
{% highlight JavaScript %}

const fs = require('fs');

const readFile = function(){
	fs.readFile('./test.txt', 'utf-8', function(err, data){
		if(err){
			console.log("read file error : "+ err);
		} else{
			console.log("successful read file!");
            // Readed Value 처리 Logic 
			console.log(data);
		}
	});
}
readFile();

{% endhighlight %}

{% highlight JavaScript %}

const fs = require('fs');

const writeFile = function(){
	let data = 'write file!';
	fs.writeFile('./test.txt', data, 'utf-8', function(err){
		if(err){
			console.log("write file error : " + err);
		}	else{
			console.log("successful write file!");
		}
	});
}

writeFile();

{% endhighlight %}

---

## File

[FileSystem.js](https://github.com/goodGid/Node.js/blob/master/Source/FileSystem.js)

---

## Review

* readFile은 function(err, data) // err와 data가 있다.

* writeFile은 function(err) // err만 있다.
 
