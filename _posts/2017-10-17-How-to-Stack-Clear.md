---
layout: post
title:  "Stack 초기화 하는 법"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## Key Point

* Stack Clear 하는 법









---

## Code
``` cpp

#include <iostream>
#include <stack>
using namespace std;

stack<int> s;

int main(){
    s.push(1);
    s.push(2);
    s.push(3);
    
    
    /*
     Stack Clear !
     */
    while( !s.empty() ) 
        s.pop();
    
    return 1;
}

```
