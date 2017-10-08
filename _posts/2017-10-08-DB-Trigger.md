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

---
## Example

*test*
**test**
You can also add notices by appending `{: .notice}` to a paragraph.
{: .notice}

Q. <학생> 테이블에 새로운 레코드가 삽인될 때, 삽입되는 레코드에 학년 정보가 누락됐으면 학년 필드에

"신입생"을 치환하는 트리거를 '학년정보_tri'라는 이름으로 정의하시오


```    
Create Trigger 학년정보_tri Before Insert On 학생
Referencing New Table AS new_table
For Each Row
When new_table.학년 = ''
Begin
    Set new_table.학년 = '신입생';
End;
```    

