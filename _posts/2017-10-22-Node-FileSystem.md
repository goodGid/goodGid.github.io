---
layout: post
title:  " File System "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}



## Code
``` js

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

```

``` js

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

```

---

## File

[FileSystem.js](https://github.com/goodGid/Node.js/blob/master/Source/FileSystem.js)

---

## Review

* readFile은 function(err, data) // err와 data가 있다.

* writeFile은 function(err) // err만 있다.
 
