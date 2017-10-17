---
layout: post
title:  "Type Conversion"
date:   2017-10-17
excerpt: "Type Conversion"
cate : "algorithm"
tag:
- Key Point
---

## Problem
Problem URL : **[네 수](https://www.acmicpc.net/problem/10824)**

{% capture images %}
    /assets/img/algorithm/10824_1.png
    /assets/img/algorithm/10824_2.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=2 %}

---


## The Key Point
    [문자열 - 숫자] 형 변환

---


## Code
{% highlight cpp %}


#include <iostream>
#include <string>
using namespace std;

int main() {
    int a, b, c, d;
    cin >> a >> b >> c >> d;
    
    string s1 = to_string(a) + to_string(b);
    string s2 = to_string(c) + to_string(d);
    
    long long l1 = stoll(s1);
    long long l2 = stoll(s2);
    
    cout<< l1 << endl;
    cout<< l2 << endl;
    cout << l1 + l2 << endl;
    return 0;
}

{% endhighlight %}

## Input

{% highlight cpp %}

12 23 34 45

{% endhighlight %}

---
## Output

{% highlight cpp %}

1223
3445
4668
Program ended with exit code: 0

{% endhighlight %}



