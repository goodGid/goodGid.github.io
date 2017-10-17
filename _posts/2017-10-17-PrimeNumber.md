---
layout: post
title:  "PrimeNumber"
date:   2017-10-17
excerpt: "PrimeNumber"
cate : "algorithm"
tag:
- Key Point
---

## The Key Point

* 제곱근을 이용한 소수 구하기 !

```
어떤 수 x가 소수인지를 판별하려면 
x를 2부터 x의 제곱근까지의 숫자로 나누어 떨어지는지 검사하면 된다.

제곱근까지의 수 중 한 개의 수에 대해서라도
나누어 떨어지면 소수가 아니다. 
```


---

## Code
{% highlight cpp %}
#include<iostream>
#include<cmath>
using namespace std;

int main(){
    int a,j;
    
    cin >> a;
    j = 2;
    
    while (1) {
        if ( j <= sqrt(a)){
            if ( a % j == 0){
                cout << "Not Prime Number " << endl;
                break;
            }
            else
                j++;
        }
        else{
            cout << "Prime Number " << endl;
            break;
        }
    }
}



{% endhighlight %}
