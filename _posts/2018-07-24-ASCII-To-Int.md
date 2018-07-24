---
layout: post
title:  "ASCII to Int "
date:   2018-07-24
excerpt: "ASCII to Int"
cate : "algorithm"
tag:
- Key Point
---

## Problem 
Problem URL : **[시저 암호](https://programmers.co.kr/learn/courses/30/lessons/12926)**


{% capture images %}
    /assets/img/algorithm/ascii_to_int_1.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=1 %}

---

## Code

{% highlight cpp %}

string solution(string s, int n) {
    string answer = "";
   
    for(int i=0; i<s.length(); i++){
        if (s[i] >= 97 && s[i] <= 122) { // Lower Case
            if( s[i] + n > 122){
                s[i] = ( s[i] + n ) - 26;
            }else {
                s[i] = s[i] + n;
            }
        }
        else if (s[i] >= 65 && s[i] <= 90) { // Upper Case
            if( s[i] + n > 90){
                s[i] = ( s[i] + n ) - 26;
            }else {
                s[i] = s[i] + n;
            }
        }
    }

    return answer;
}

{% endhighlight %}


---

## Feed Back 

* ASCII값을 갖고 노는 법 !