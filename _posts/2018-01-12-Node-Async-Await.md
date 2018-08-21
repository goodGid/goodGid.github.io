---
layout: post
title:  "Async and Await "
categories: Node.js
tags: Node.js
author: goodGid
---
* content
{:toc}


## What is Async and Await ? 

* Async / Await 문법은 ES7에서 새롭게 지원하는 문법으로, Node.js v7에서부터 지원된다.

* Async / Await 를 사용하면, 기존 async 라이브러리나 Promise를 사용하지 않고도 비동기 콜백 지옥을 효과적으로 해결 할 수 있다.

* Async가 선언된 함수안에서만 Await가 사용 가능하다.

* 물론 Async/Await 를 사용하려면 Promise 함수가 사용되어야 한다.

---

## Method

* module/pool.js

``` js

module.exports = {
  queryParamCnt_None : async (...args) => {
    const query = args[0];
    let result;
    try {
      var connection = await pool.getConnection();
      result = await connection.query(query) || null;
    }
    catch(err) {
      console.log("mysql error! err log =>" + err);
      next(err);
    }
    finally {
      pool.releaseConnection(connection);

      return result;
    }
  },
  queryParamCnt_Arr : async (...args) => {
    const query = args[0];
    const data = args[1];
    let result;
    try {
      var connection = await pool.getConnection();
      result = await connection.query(query, data) || null;
    }
    catch(err) {
      console.log("mysql error! err log =>" + err);
      next(err);
    }
    finally {
      pool.releaseConnection(connection);
      return result;
    }
  }

```

* Usage

``` js

const db = require('../../module/pool.js');

router.get('/', async(req, res, next) => {
  
  var query = `
  SELECT *
  FROM user
  WHERE user.id = ?
  `

  let result = await db.queryParamCnt_Arr(query, [user_id]);

    res.status(200).send({
       "result" : result
    });
});

```

---

## Review

* Call Back 지옥을 해결하기 위해 Promise를 사용하는데 Promise도 코드가 간결하진 않았다.

* 그래서 그 다음 나온 개념이 Async / Await ! 

