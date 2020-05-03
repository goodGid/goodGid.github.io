---
layout: post
title:  "Insert + Update"
categories: DB
author: goodGid
---
* content
{:toc}

## Concept

Query : Table에 PK값이 있으면 Update 없으면 Insert

```
INSERT INTO table_name (a, b) VALUES (?, ?) ON DUPLICATE KEY UPDATE a = ? , b = ?
```