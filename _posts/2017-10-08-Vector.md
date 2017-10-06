---
layout: post
title:  "Vector :: 2차원 동적 할당"
date:   2017-10-07
excerpt: "Vector 사용법"
cate : "algorithm"
tag:
- Key Point
---

## Review
Vector를 사용하여 2차원 배열을 구현하는 법을 알아보자.

2차원이니까  `vector<vector<int>>  v` 로 선언을 해주고

`v.assign(row, vector<int>(col, 7))` 할당을 해주면 된다.

환경에 따라서 `<vector<vector<int>> v`로 선언을 하면 `>>`를 Shift 연산자로 해석하여

에러가 날 경우가 있으니 `vector<vector < int > > v` 확실하게 띄어쓰기를 하도록 하자.


---

## Code
{% highlight cpp %}

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

{% endhighlight %}

---
## Output

{% highlight cpp %}

7 7 7 
7 7 7 
7 7 7 
7 7 7 
7 7 7 
Program ended with exit code: 0

{% endhighlight %}



