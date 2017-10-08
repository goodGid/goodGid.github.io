---
layout: post
title:  "DataBse :: Trigger"
date:   2017-10-07
excerpt: "Trigger 개념"
cate : "post"
tag:
- Key Point
---

## Review

 
 새 메모리에 `복사`하고 원래의 메모리에 저장된 모든 객체를 `소멸`시키고 원래 메모리를 `해제`한다.
 
 ---


|  | Old | New |
|:-------:|:-------:|:-------:|
| Insert   | Null   | 입력된 값   |
|----
| Update   | 변경 전 값   | 변경 후 값   |
|----
| Delete   | 삭제 전 값   | Null   |
|=====
{: rules="groups"}

