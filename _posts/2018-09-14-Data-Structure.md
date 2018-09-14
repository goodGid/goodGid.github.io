---
layout: post
title:  " 자료 구조 구현 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## To Do

* STL을 사용하지 않고 자료 구조를 구현해보자.








---

## Stack

``` cpp
#include <iostream>
using namespace std;

int stack[10001];
int top = -1;

void push(int x){
    stack[++top] = x;
}

int empty() {
    if( top < 0 )
        return 1;
    else
        return 0;
}

void pop() {
    if (empty() == 1)
        cout << "-1" << "\n";
    else {
        cout << stack[top] << "\n";
        stack[top--] = 0;
    }
}

void size(){
    cout << top + 1 << "\n";
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        
        if( s == "push"){
            int x;
            cin >> x;
            push(x);
        }
        else if ( s == "top") {
            if (empty() == 1)
                cout << "-1" << "\n";
            else
                cout << stack[top] << "\n";
        }
        else if ( s == "pop") {
            pop();
        }
        else if ( s == "empty") {
            cout << empty() << "\n";
        }
        else if ( s == "size") {
            size();
        }
    }
    return 0;
}
```

* [출처](http://coding-all.tistory.com/3)

---