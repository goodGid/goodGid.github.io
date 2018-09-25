---
layout: post
title:  "입력된 Input의 자릿 수 구하기"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## Problem
Problem URL : **[반복 수열](https://www.acmicpc.net/problem/2331)**













![](/assets/img/algorithm/2331_1.png)

![](/assets/img/algorithm/2331_2.png)

---

``` cpp
#include <iostream>
#include <cmath>
using namespace std;

int CntPosNumber(int value){
        int pos_number;
        // 방법 1. 로그함수를이용한자리수계산
        pos_number = (int)log10((double)value)+1; // #include<cmath> 선언
        cout << pos_number << endl;
        
        // 방법 2. 직접계산
        pos_number = 0;
        while (value != 0)
        {
            value /= 10;
            pos_number++;
        }
        
        cout << pos_number << endl;
    
    return pos_number;
}


int main(){
    int value;
    cin >> value;
    CntPosNumber(value);
    
    return 1;
}
```
