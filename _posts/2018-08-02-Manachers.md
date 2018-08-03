---
layout: post
title:  "Manachers Algorithm"
date:   2018-08-02
excerpt: "Manachers Algorithm"
cate : "algorithm"
tag:
- Key Point
---

## Problem 
Problem URL : **[가장 긴 팰린드롬](https://programmers.co.kr/learn/courses/30/lessons/12904)**


{% capture images %}
    /assets/img/algorithm/manachers_1.png
    /assets/img/algorithm/manachers_2.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=2 %}

---




## Code

{% highlight cpp %}

const int MAXN = 100001 * 2;
int A[MAXN];

string str;

void manachers(string S, int N){
    int r = 0, p = 0;
    for (int i = 0; i < N; i++){
        if (i <= r)
            A[i] = min(A[2 * p - i], r - i);
        else
            A[i] = 0;
        
        while (i - A[i] - 1 >= 0 && i + A[i] + 1 < N && S[i - A[i] - 1] == S[i + A[i] + 1])
            A[i]++;
        
        if (r < i + A[i]){
            r = i + A[i];
            p = i;
        }
    }
}

int solution(string s){
    int len = (int)s.size();
    
    for (int i = 0; i < len; i++)
    {
        str += '#';
        str += s[i];
    }
    str += '#';
    
    manachers(str, (int)str.size());
    
    len = (int)str.size();
    int ans = -1;
    for (int i = 0; i < len; i++)
        ans = max(ans, A[i]);
    
    return ans;
}

{% endhighlight %}


---

## Feed Back 

* [Algorithm 설명](http://www.crocus.co.kr/1075)
