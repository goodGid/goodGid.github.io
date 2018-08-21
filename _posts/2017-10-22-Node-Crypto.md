---
layout: post
title:  " Crypto "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}


## Code
``` js


const crypto = require('crypto');
let string = 'This is password';

//1. 단순 해싱으로 비밀번호 해싱
let hashAlgorithm = crypto.createHash('sha512');
//crypto.createHash(); 메소드로 해싱알고리즘 선택.

let hashing = hashAlgorithm.update(string);
//선택된 알고리즘으로 해싱
console.log(" === hasing === ")
console.log(hashing);
let hashedString = hashing.digest('base64');
//표시할 인코딩 설정. 

console.log(" === Hashed String === ")
console.log(hashedString);

//2. salting, key stratching을 적용한 해싱
crypto.randomBytes(32, function(err, buffer){
	//32bit 길이의 random byte 생성
	if(err){
		console.log(err);
	} else{
		crypto.pbkdf2(string, buffer.toString('base64'), 100000, 64, 'sha512', function(err, hashed){
			if(err){
				console.log(err);
			} else{
				console.log(" === hashed value === ")
				console.log(hashed);
				
				console.log(" === hashed.toString('base64') === ");
				console.log(hashed.toString('base64'));
			}
		});
	}
});


```

---

## Review

* 암호화에는 2가지 방법이 있다.
    1. 단순 해싱으로 비밀번호 해싱
    2. salting, key stratching을 적용한 해싱

---


## Output

{% capture images %}
    /assets/img/posts/crypto_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


---

## File

[Crypto.js](https://github.com/goodGid/Node.js/blob/master/Source/crypto.js)
