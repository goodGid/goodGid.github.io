---
layout: post
title:  "DataBase :: Insert + Update"
date:   2017-07-25
excerpt: "Insert + Update"
cate : "post"
tag:
- DB
---

## Concept

Query : Table에 PK값이 있으면 Update 없으면 Insert

```
INSERT INTO table_name (a, b) VALUES (?, ?) ON DUPLICATE KEY UPDATE a = ? , b = ?
```