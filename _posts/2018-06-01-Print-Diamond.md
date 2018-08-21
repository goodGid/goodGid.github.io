---
layout: post
title:  " 다이아몬드 출력하기 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}



## Related Problem

Problem URL : **[별찍기-7](https://www.acmicpc.net/problem/2444)**

---

``` cpp

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
 
```


---


Problem URL : **[홈 방범 서비스](https://www.swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5V61LqAf8DFAWu)**

``` cpp


void check_Diamond(int x,int y, int K) {
    Cnt = 0;
    for (int i = x - K + 1; i <= x + K - 1; i++)
        for (int j = y - K + 1; j <= y + K - 1; j++)
            if (i >= 0 && j >= 0 && i < N && j < N &&
                i >= x - K + 1 + Abs(j - y) &&
                i <= x + K - 1 - Abs(j - y) &&
                (map[i][j] == 1))
                Cnt++;
}


```


---

## Review

* 다이아몬드형식 출력하기

