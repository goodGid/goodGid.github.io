---
layout: post
title:  "Vector :: Vector 선언"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## [1] Review (17. 10. 07)

Vector를 사용하여 2차원 배열을 구현하는 법을 알아보자.

2차원이니까  `vector<vector<int>>  v` 로 선언을 해주고

`v.assign(row, vector<int>(col, 7))` 할당을 해주면 된다.

<br>

환경에 따라서 `<vector<vector<int>> v`로 선언을 하면

 `>>`를 Shift 연산자로 해석하여

에러가 날 경우가 있으니 

`vector<vector < int > > v` 확실하게 띄어쓰기를 하도록 하자.

<br>

## [2] Review (18. 02. 19)

참고로 [1]이랑 중복되는 내용이 있다. 


### 1차원 Vector


``` cpp
vector<T> v(5)
```

기본적인 vector의 선언 방식이다. 

T는 데이터 타입이다. 

이 때 T는 기본 데이터타입 뿐만 아니라 

사용자가 정의한 구조체나 클래스를 원소로 가질 수 있다.

T형 데이터 타입을 원소로 갖는 

크기가 5인 vector가 생성된다.


``` cpp
vector<int> v(5,7)
```

int형 타입을 원소로 가지고 

크기가 5이고 

모든 원소의 값이 7인 vector가 생성된다.

---


### 2차원 Vector

``` cpp
vector<vector<int> > v
```


기본적인 2차원 벡터의 선언 방식이다. 

vector<int> 라는 일반적인 1차원 벡터를 선언하고 

다시 그 vector를 원소로 하는 

vector를 선언함으로써 

2차원 배열과 같은 구조의 벡터를 선언하는 방식이다.


``` cpp
vector<vector<int> > v(5)
```

위와 같이 vector를 선언하면 

vector의 크기를 5로 선언해준 것이 아니라 

vector를 원소로 갖는 vector의 크기를 정해준 것이다.

말이 안되지만 

배열을 예로 들면 arr[5][]과 같은 상태라고 생각하면 된다. 

vector의 공간을 5개 마련했지만 

아직 int형에 공간은 할당이 되어있지 않다.


``` cpp
vector<vector<int> > v(5, vector<int>(3,-1))
```

일단 int형을 원소로 가지는 vector를 

초기값 -1, 크기 3으로 초기화 해주고, 

이와 같은 vector를 5개 만들어 주게 된다. 

즉 arr[5][3]크기의 배열을 모두 -1을 초기화 해준것과 같다.

_위 내용은 [해당 Blog](http://canna90.tistory.com/41)에서 발췌하였다._

---

## Code
``` cpp

#include <iostream>
#include <vector>
using namespace std;

int n,m;
vector<vector<int>> v;

int main(){
    int row = 5;
    int col = 3;
    
    v.assign(row, vector<int>(col, 7));
    
    for (int i=0; i<row; i++) {
        for (int j=0; j<col; j++) {
            cout << v[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}

```

---
## Output

``` cpp

7 7 7 
7 7 7 
7 7 7 
7 7 7 
7 7 7 
Program ended with exit code: 0

```



