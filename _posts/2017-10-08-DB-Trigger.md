---
layout: post
title:  "DataBse :: Trigger"
date:   2017-10-08
excerpt: "Trigger 개념"
cate : "post"
tag:
- DB
- 정처기
---

## Concept

Trigger는 이벤트가 발생 시 자동적으로 수행되는 사용자 정의 프로시저이다.

 ```
Create Trigger 트리거명 [After | Before] [Insert | Update | Delete ] on 테이블명
Referencing [New | Old ] Table as 테이블명
For Each Row
When 조건식
트리거 Body
```    


 ---


|  | Old | New |
|:-------:|:-------:|:-------:|
| Insert   | Null   | 입력 값   |
|----
| Update   | 변경 前 값   | 변경 後 값   |
|----
| Delete   | 삭제 前 값   | Null   |
|=====
| Foot1   | Foot2   | Foot3


