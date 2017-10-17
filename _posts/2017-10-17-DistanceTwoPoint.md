---
layout: post
title:  "Distance between two points"
date:   2017-10-17
excerpt: "Distance between two points"
cate : "algorithm"
tag:
- Key Point
---

## Review

* 두 점 사이의 거리

---

## Code

{% highlight cpp %}

#include <iostream>
using namespace std;

struct Point{
    int x, y;
};

double Distance(const Point& p1, const Point& p2){
    return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
}

{% endhighlight %}
