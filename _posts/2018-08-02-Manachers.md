---
layout: post
title:  "Manachers Algorithm"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## Problem 
Problem URL : **[가장 긴 팰린드롬](https://programmers.co.kr/learn/courses/30/lessons/12904)**


{% capture images %}
    /assets/img/algorithm/manachers_1.png
    /assets/img/algorithm/manachers_2.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=2 %}



* [10174 팰린드롬](https://www.acmicpc.net/problem/10174)

* [13275 가장 긴 팰린드롬 부분 문자열]({{site.url}}/BOJ-13275/)

* [11046 팬린드롬??](https://www.acmicpc.net/problem/11046)

* [10942 팰린드롬?]({{site.url}}/BOJ-10942/)










---




## Code


* 입력이 string 타입으로 주어지는 경우


``` cpp

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

```




* 입력이 int 타입으로 주어지는 경우


``` cpp
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <string>
#include <memory.h>
using namespace std;

const int MAXN = 1000001 * 2;
string tmp, str;
int A[1000001];

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

int main(){
    int n;
    scanf("%d", &n);
    
    for (int i = 0; i < n; i++){
        int val;
        scanf("%d", &val);
        
        /*
         tmp += val
         이렇게 하게되면
         val값이 1일 때
         tmp에는 \x01이 들어간다.
         그렇기 때문에 + '0'을 해줘서
         int형인 val값을 string처럼 바꾼다.
         */
        
        // [1] 또는 [2]
        // 둘 다 가능하다.
        tmp += val + '0'; // [1]
//        tmp.push_back(val + '0'); // [2]
    }
    int len = (int)tmp.size();
    str = tmp[0];
    
    for (int i = 1; i < len; i++){
        str += '#';
        str += tmp[i];
    }
    
    manachers(str, (int)str.size());
    
    int q;
    scanf("%d", &q);
    while (q--){
        int s, e;
        scanf("%d %d", &s, &e);
        s--; e--;
        s *= 2;
        e *= 2;
        
        int r = A[(s + e) / 2];
        if ((s + e) / 2 + r >= e)
            printf("1\n");
        else
            printf("0\n");
    }
    
    return 0;
}
```

---

## Feed Back 

* [Algorithm 설명](http://www.crocus.co.kr/1075)
