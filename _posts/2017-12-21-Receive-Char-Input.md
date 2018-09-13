---
layout: post
title:  " Char 타입 입력 받기 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}



## Problem
Problem URL : **[트리 순회](https://www.acmicpc.net/problem/1991)**

{% capture images %}
    /assets/img/algorithm/1991_1.png
    /assets/img/algorithm/1991_2.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=2 %}








---

## Code

``` cpp

#include<iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    for(int i=0; i<n; i++){
        char m,l,r;

        // To Do
        // A B C를 입력하고 싶다.


        /*
        Case 1 
        3
        A B C

        --> 1st '%c'를 1칸 Space해줘야 한다.
        */
        scanf(" %c %c %c",&m,&l,&r);

        /*
        Case 2
        3ABC
        */
        scanf("%c%c%c",&m,&l,&r);


        /*
        Case 3
        3A
        B C
        */
        scanf("%c %c %c",&m,&l,&r);

        /*
        Case 4
        3
        ABC
        m = '\n'
        l = 'A'
        r = 'B' 
        이렇게 들어간다.
        */
        scanf("%c %c %c",&m,&l,&r);

    }
    return 0;
}

```
