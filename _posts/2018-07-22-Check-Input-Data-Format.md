---
layout: post
title:  "Check Input Data Format "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## Problem : Alphabet

Problem URL : **[문자열 내림차순으로 배치하기](https://programmers.co.kr/learn/courses/30/lessons/12917)**

{% capture images %}
    /assets/img/algorithm/check_digit_format_int_1.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=1 %}

---

## Code
``` cpp

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


```

---

## Problem : Int

Problem URL : **[문자열 다루기 기본](https://programmers.co.kr/learn/courses/30/lessons/12918)**

{% capture images %}
    /assets/img/algorithm/check_digit_format_int_1.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=1 %}

---

## Code
``` cpp

bool solution(string s) {
    for (int i = 0; i < s.length(); i++) {
        if (s[i] < 48 || s[i] > 57)
            return false;
    }
    return true;
}


```

---

## Feed Back 

* 각 자릿수가 소/대문자, 인트인지 체크 ! 