---
layout: post
title:  " 다이아몬드 출력하기 "
date:   2018-06-01
excerpt: "  Print Diamond  "
cate : "algorithm"
tag:
- Key Point
---


## Related Problem

Problem URL : **[별찍기-7](https://www.acmicpc.net/problem/2444)**

---

{% highlight cpp %}

void printDiamond(int n){
    for(int i = 1; i <= n; i++){
        for(int j = n - i; j > 0; j--)
            printf(" ");
        
        for(int j = 1; j <= i * 2 - 1; j++)
            printf("*");
        puts("");
    }
    
    for(int i = n - 1; i > 0; i--){
        for(int j = n - i; j > 0; j--)
            printf(" ");
        
        for(int j = 1; j <= i * 2 - 1; j++)
            printf("*");
        
        puts("");
    }
}
 
{% endhighlight %}


## Review

* 다이아몬드형식 출력하기

