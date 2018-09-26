---
layout: post
title:  "BinarySearch"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## Problem
Problem URL : **[수 찾기](https://www.acmicpc.net/problem/1920)**













![](/assets/img/algorithm/1920_1.png)

![](/assets/img/algorithm/1920_2.png)

---

## The Key Point

* [BinarySearch]라는 Method가 있다.
    

---

## Code
``` cpp

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;
vector<int> v;

int main(){
    int n, tc, value;
    cin >> n;
    for(int i=0; i<n; i++){
        scanf("%d",&value);
        v.push_back(value);
    }
    sort(v.begin(),v.end());
    
    cin >> tc;
    for(int i=0; i<n; i++){
        scanf("%d",&value);
        
        if( binary_search(v.begin(), v.end(), value) )
            printf("Exist\n");
        else
            printf("Not Exist\n");
    }
    return 0;
}


```

---


## Feed Back 

* 이진 탐색을 직접 구현할 줄도 알아야하는데 STL에도 있다는걸 기억하자.

* value 값이 탐색할 배열에 존재 유/무를 `이진 탐색`으로 검색한다.

