---
layout: post
title:  " Multipart/form-data "
categories: Node.js
author: goodGid
---
* content
{:toc}


## Problem

* PostMan으로 사진 업로드를 하려고 하는데 다음과 같은 Error가 떴다. 

![](/assets/img/node_js/multer_1.png)

---

## Cause

* 전송할 때 Header에서 형식이 [`Content Type`](https://goodgid.github.io/ContentType/)을 `application/x-www-form-urlencoded`으로 보내게 되기 때문이다.

![](/assets/img/node_js/multer_2.png)

> `application/x-www-form-urlencoded`이란 ?

1. Post로 데이터를 보낼 때 표준 MIME type이다.
2. Key - Value 형태로 인코딩 된다.
3. `application/x-www-form-urlencoded`을 사용한다면 Body를 인코딩해야 한다.
4. Request 처리하는 서버에서는 Request body를 읽어 Map 형태로 변환

---

## Solve

* Click되어 있는 Content Type값을 Unclick하면 된다 !

![](/assets/img/node_js/multer_3.png)