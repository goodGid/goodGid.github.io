---
layout: post
title:  " 조합 (Combination) "
date:   2018-04-15
excerpt: "  Combination "
cate : "algorithm"
tag:
- Key Point
---


## Related Problem

Problem URL : **[다리 놓기](https://www.acmicpc.net/problem/1010)**

---

{% highlight cpp %}


//[1]
int a,b,n,r;
    a = b = 1;
    scanf("%d%d",&r,&n);
        
    for(int i=n-r+1; i<=n; i++)
        b = ( b * i ) / a++ ;
        

//[2]
int d[31][31];
int C(int n, int r) {
    if(n==r || r==0) return 1;
    if(d[n][r]>=0) return d[n][r];
    return d[n][r]=C(n-1,r)+C(n-1,r-1);
}


{% endhighlight %}


## Review

* [2]재귀함수를 이용한 조합을 [1]은 단순식으로 해결 가능 !

