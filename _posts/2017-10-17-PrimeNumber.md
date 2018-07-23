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

## [1] Code - Check if a specific value is a prime number

{% highlight cpp %}

#include<iostream>
#include<cmath>
using namespace std;

bool eratos(int num){
    if( num < 2) return false;
    int j=2;
    while (1) {
        if ( j <= sqrt(num)){
            if ( num % j == 0){
                // Not Prime Number
                return false;
            }
            else
                j++;
        }
        else{
            // Prime Number
            return true;
        }
    }
}

int main(){
    int n;
    cin >> n;
    
    int num,cnt=0;
    
    for (int i=1; i<=n; i++) {
        scanf("%d",&num);
        if( eratos(num) )
            cnt ++;
    }
    cout << cnt <<endl;

    return 0;    
}



{% endhighlight %}

---


## [2] Code - Determine a fractional value in a specific range

{% highlight cpp %}


// [1]
int arr[1000000];
int solution(int n) {
    int answer = 0;
    for (int i = 2; i <= n; i++) {
        arr[i] = i;
    }
    for (int i = 2; i <= n; i++)
    {
        if (arr[i] == 0)
            continue;
        for (int j = i + i; j <= n; j += i)
            arr[j] = 0;
    }
    for (int i = 2; i <= n; i++)
        if (arr[i] != 0)
            answer++;
    return answer;
}

// [2]
int solution(int n) {
    int answer = 0;
    vector<int> num(n+1);
    
    for(int i=2; i <=n ; i++) {
        if(num[i]==1) {
            continue;
        }
        else {
            answer++;
            for(int j=i; j < num.size(); j+=i) {
                num[j]=1;
            }
        }
    }
    return answer;
}


{% endhighlight %}
