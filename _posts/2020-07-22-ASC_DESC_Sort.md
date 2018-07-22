---
layout: post
title:  "오름/내림 차순"
date:   2018-07-22
excerpt: "오름/내림 차순"
cate : "algorithm"
tag:
- Key Point
---

## Problem

Problem URL : **[문자열 다루기 기본](https://programmers.co.kr/learn/courses/30/lessons/12917)**

{% capture images %}
    /assets/img/algorithm/asc_desc_sort_1.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=1 %}

---

## Code
{% highlight cpp %}
#include <functional>

string solution(string s) {
    // [1]
    sort (s.begin(), s.end(), greater<char>());

    // [2]
    sort(s.rbegin(),s.rend());

    return s;
}


{% endhighlight %}

---


## Feed Back 

* [2] 방법은 진짜 신세계였다. <br> 내림차순으로 정렬을 해준다.