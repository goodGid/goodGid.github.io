---
layout: post
title:  " 조합 (Combination) "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}



## Related Problem

Problem URL : **[다리 놓기](https://www.acmicpc.net/problem/1010)**






---

``` cpp

//[1]
int a,b,n,r;
    a = b =1;
    scanf("%d%d",&n,&r);
    
    for(int i=n-r+1; i<=n; i++){
        b = ( b * i ) / a++ ;
    }
    cout << b << endl;

// 4 2를 입력하면 b=6 출력 
// 10 3을 입력하면 b=120 출력 


//[2]
int d[31][31];
int C(int n, int r) {
    if(n==r || r==0) return 1;
    if(d[n][r]>=0) return d[n][r];
    return d[n][r]=C(n-1,r)+C(n-1,r-1);
}


```


## Review

* [2]재귀함수를 이용한 조합을 [1]은 단순식으로 해결 가능 !

