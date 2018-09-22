---
layout: post
title:  "String Push and Pop"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## To Do

* String에 삽입 삭제를 배워보자.

``` cpp
string ss = "123";
cout << ss << endl;
ss += "i";
cout << ss << endl;
ss.pop_back();
cout << ss << endl;

/*
Output
123
123i
123
*/
```

---

## Review

* string에 **pop_back()** 함수는 주어진 string에서 끝자리 값을 삭제한다.