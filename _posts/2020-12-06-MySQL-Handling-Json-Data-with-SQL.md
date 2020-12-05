---
layout: post
title:  " [MySQL] SQL로 Json 데이터 조작하기 : How to manipulate Json with SQL? "
categories: MySQL
author: goodGid
---
* content
{:toc}

## Goal

* MySQL DB에서 Json을 저장하였을 경우

  해당 Json에 접근하여 데이터를 조작하는 SQL에 대해 알아본다.

  *ex) {"name": "goodGid", "money": "1234", "position": "Back Dev"}*

  


---


## Case

### Json에서 Key로 Value 찾기

``` sql
SELECT raw_body,
       json_unquote(json_extract(raw_body, '$.name')) AS without_quote,
       json_extract(raw_body, '$.name')               AS with_quote
FROM target_table_name
where seq = target_seq;
```

![](/assets/img/mysql/MySQL-Handling-Json-Data_1.png)

---

### Json에서 데이터를 읽은 후 해당 값을 실수로 나타내기

``` sql
SELECT raw_body,
       money                                                          as AS_IS,
       SUBSTR(t.money, 1, LENGTH(t.money) - 2)                        as SUBSTR_money,
       CAST(SUBSTR(t.money, 1, LENGTH(t.money) - 2) as decimal(4, 2)) as TO_BE
FROM (
         SELECT raw_body,
                json_unquote(json_extract(raw_body, '$.money')) AS money
         FROM target_table_name
         where seq = target_seq
     ) AS t;
```

![](/assets/img/mysql/MySQL-Handling-Json-Data_2.png)


---

### Json에서 특정 Key의 Value 수정하기

``` sql
update target_table_name
set raw_body = JSON_SET(raw_body, '$.position', 'Back Dev')
where seq = target_seq;
```

> Before Update 

![](/assets/img/mysql/MySQL-Handling-Json-Data_3.png)

> After Update 

![](/assets/img/mysql/MySQL-Handling-Json-Data_4.png)


---