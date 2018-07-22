---
layout: post
title:  "각 자리수가 Int형 체크"
date:   2018-07-22
excerpt: "각 자리수가 Int형 체크"
cate : "algorithm"
tag:
- Key Point
---

## Problem

Problem URL : **[문자열 다루기 기본](https://programmers.co.kr/learn/courses/30/lessons/12918?language=cpp)**

{% capture images %}
    /assets/img/algorithm/check_digit_format_int_1.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=1 %}

---

## Code
{% highlight cpp %}

bool solution(string s) {
    for (int i = 0; i < s.length(); i++) {
        if (s[i] < 48 || s[i] > 57)
            return false;
    }
    return true;
}


{% endhighlight %}

---


## Feed Back 

* 각 자릿수가 Int형인지 체크 ! 