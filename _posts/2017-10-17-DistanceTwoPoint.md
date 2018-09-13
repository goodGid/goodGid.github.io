---
layout: post
title:  "두 점 사이 거리 구하기"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## The Key Point

* 두 점 사이의 거리 구하기









---

## Code

``` cpp

#include <iostream>
using namespace std;

struct Point{
    int x, y;
};

double Distance(const Point& p1, const Point& p2){
    return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
}

```
