---
layout: post
title:  " Vector first 값이 같을 때 second 값으로 정렬하기 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## To Do

* vector정렬을 할 때 first값이 같을 때 second로 정렬할 필요가 있다.







---


## Code

``` cpp
#define p pair<double, int>
bool compare(p &p1, p &p2){
    if( p1.first == p2.first)
        return p1.second < p2.second;
    return p1.first > p2.first;
}

sort(v.begin(), v.end(), compare);

```


---

## Review

* pair의 first값으로 정렬을 하고 같을 땐 second로 정렬을 한다. 
