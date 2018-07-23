---
layout: post
title:  "각 자리수 Format 체크 : String"
date:   2018-07-22
excerpt: "각 자리수 Format 체크 : String"
cate : "algorithm"
tag:
- Key Point
---

## Problem

Problem URL : **[문자열 다루기 기본](https://programmers.co.kr/learn/courses/30/lessons/12917)**

{% capture images %}
    /assets/img/algorithm/check_digit_format_int_1.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=1 %}

---

## Code
{% highlight cpp %}

bool solution(string s) {
    for (int i = 0; i < s.length(); i++) {
        if (s[i] >= 97 && s[i] <= 122) { // Lower Case
            lower.push_back(s[i]);
        }
        if (s[i] >= 65 && s[i] <= 90) { // Upper Case
            upper.push_back(s[i]);
        }
    }
    return true;
}


{% endhighlight %}

---


## Feed Back 

* 각 자릿수가 소/대문자인지 체크 ! 