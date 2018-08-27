---
layout: post
title:  " 각 자릿수 더하기 (Add each digit) "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}



## Related Problem

Problem URL : **[분해합](https://www.acmicpc.net/problem/2231)**

---

``` cpp

int cal(int num) {
    int sum = 0;
    while (num!=0) {
        sum += num % 10;
        num /= 10;
    }
    return sum;
}

/*
input : 123
output : 6


input : 51515
output : 17

*/
 
```


## Review

* 주어진 n에 대해 각 자릿수의 합을 구하라와 같은 문제를 풀 때 유용한 Code

