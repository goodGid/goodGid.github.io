---
layout: post
title:  "Upper_bound vs Lower_bound "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## Related Problem
Problem URL : **[숫자 카드 2](https://www.acmicpc.net/problem/10816)**

---


## Review

* `upper_bound()`와 `lower_bound()`는 컨테이너의 정렬 상태를 깨지 않고 원소를 삽입할 수 있는 위치를 찾아주는 함수이다. 

* 물론 `바이너리 검색 알고리즘`으로 검색한다.

* `upper_bound()`는 해당 컨테이너에서 목표보다 큰 최소 원소를 반환해준다.

* `lower_bound()`는 해당 컨테이너에서 목표보다 작지 않은 최소 원소를 반환해준다.

* 반환값은 `iterator` Type이다.

```
예를 들어, {1, 2, 3, 3, 3, 4, 5}에서 3을 각각 
lower_bound, upper_bound로 검색했을 때

lower_bound는 세 개의 3 중 첫 번째 3의 위치를 반환해주며
upper_bound는 세 개의 3 중 세 번째 3의 위치를 반환해준다.
```

``` cpp

#include<iostream>
#include<algorithm>
#include<vector>
using namespace std;

int main(void) {
    int n;
    scanf("%d", &n);
    vector<int> v;
    for (int i = 0; i < n; i++) {
        int num;
        scanf("%d", &num);
        v.push_back(num);
    }
    sort(v.begin(), v.end());
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int num;
        scanf("%d", &num);
        if (binary_search(v.begin(), v.end(), num) == 0) {
            continue;
        }
        else{
            // Sector 1
            auto a = upper_bound(v.begin(), v.end(), num);
            auto b = lower_bound(v.begin(), v.end(), num);
            cout << "&a 와 &b 주소값" << endl;
            cout << &a << " " << &b << endl;
            cout << "a - b를 통한 Vector에서 Index 차이값 " << endl;
            cout << a - b  << endl << endl;
          
        }
    }
}

 
```


* Sector 1 부분이 핵심이다.

```
Input
10
6 3 2 10 10 10 -10 -10 7 3 이라면


Output
찾는 값 : 10
&a 와 &b 주소값
0x7ffeefbfef60 0x7ffeefbfef48
a - b를 통한 Vector에서 Index 차이값 
3

찾는 값 : 2
&a 와 &b 주소값
0x7ffeefbfef60 0x7ffeefbfef48
a - b를 통한 Vector에서 Index 차이값 
1

찾는 값 : 3
&a 와 &b 주소값
0x7ffeefbfef60 0x7ffeefbfef48
a - b를 통한 Vector에서 Index 차이값 
2

찾는 값 : -10
&a 와 &b 주소값
0x7ffeefbfef60 0x7ffeefbfef48
a - b를 통한 Vector에서 Index 차이값 
2
```
