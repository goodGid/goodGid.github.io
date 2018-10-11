---
layout: post
title:  " Vector에서 중복 값 삭제하기 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## To Do

* Vector안에서 중복된 값을 삭제해보자.








---

## Code

``` cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v;
    v.push_back(1);
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    v.push_back(3);
    v.push_back(2);
    v.push_back(1);
    
    for(int i=0; i<v.size(); i++)
        cout << v[i] << " ";
    cout << endl;
    
    sort(v.begin(),v.end());
    v.erase(unique(v.begin(),v.end()),v.end());
    for(int i=0; i<v.size(); i++)
        cout << v[i] << " ";
    cout << endl;
    
    return 0;
}
```

```
1 1 2 3 3 2 1 
1 2 3 
```

* 방법은 굉장히 간단하다.

* sort와 unique 사용을 위해서 **algorithm 헤더**를 선언한 후 

* **sort()** -> **v.erase(unique(v.begin(),v.end()), v.end())**만 하면 끝 !

* 물론 int 타입뿐 아니라 **다른 타입**도 가능하다.

``` cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<string> v;
    v.push_back("a");
    v.push_back("a");
    v.push_back("B");
    v.push_back("b");
    v.push_back("A");
    v.push_back("b");
    v.push_back("F");
    
    for(int i=0; i<v.size(); i++)
        cout << v[i] << " ";
    cout << endl;
    
    sort(v.begin(),v.end());
    v.erase(unique(v.begin(),v.end()),v.end());
    for(int i=0; i<v.size(); i++)
        cout << v[i] << " ";
    cout << endl;
    
    return 0;
}
```

```
a a B b A b F 
A B F a b 
```


---

## 참고

* [[C++]벡터 중복제거(sort,unique,erase)](http://dpdpwl.tistory.com/39)