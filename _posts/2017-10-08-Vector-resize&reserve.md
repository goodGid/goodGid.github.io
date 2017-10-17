---
layout: post
title:  "Vector :: Resize vs Reserve"
date:   2017-10-07
excerpt: "Vector 사용법"
cate : "algorithm"
tag:
- Key Point
---

## Review

 STL 컨테이너는 데이터 삽입시 메모리의 크기를 부족한 경우 메모리를 2의 증가율 만큼 크기를 늘리도록 구현하고 있다.
 
 재할당시 컨테이너가 원래 가지고 있었던 메모리에 저장된 모든 요소 데이터를
 
 새 메모리에 `복사`하고 원래의 메모리에 저장된 모든 객체를 `소멸`시키고 원래 메모리를 `해제`한다.
 
 `할당 - 복사 - 소멸 - 해제`의 비용이 들어간다.
 
 즉 효율성이 떨어진다.
 
 ---

## Function

 * resize(n) : 할당된 n값만큼 메모리를 무조건 차지한다.

 * reserve(n) : 어느정도 메모리를 할당함으로써 재할당 횟수를 최소화 시킨다.

---

## Code
{% highlight cpp %}

#include <iostream>
#include <vector>
using namespace std;

vector<int> v;

void print(){
    for(int i=0; i<v.size(); i++)
        cout << v[i] << " ";
    cout << endl;
}
int main(){
    // resize
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    v.resize(5);
    print();
    
    // resize
    v.clear();
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    v.push_back(4);
    v.push_back(5);
    v.resize(3);
    print();
    
    // reserve
    v.clear();
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    v.reserve(5);
    print();
    
    // reserve
    v.clear();
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    v.push_back(4);
    v.push_back(5);
    v.reserve(3);
    print();
    
    return 0;
}

{% endhighlight %}

---
## Output

{% highlight cpp %}

1 2 3 0 0 
1 2 3 
1 2 3 
1 2 3 4 5 
Program ended with exit code: 0

{% endhighlight %}



