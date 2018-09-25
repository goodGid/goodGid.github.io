---
layout: post
title:  "소수 (PrimeNumber)"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

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

``` cpp

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

```

---


## [2] Code - Determine a fractional value in a specific range

Problem URL : **[Programmers : 소수 찾기](https://programmers.co.kr/learn/courses/30/lessons/12921)**

``` cpp
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
            /*
            소수의 배수들은 무조건 소수가 아니다.
            ex) 3일 경우
            3의 배수 6,9,12,15 등등
            (= 소수 x 2,3,4,5 등등 )
            그렇기 때문에
            j에는 소수인 i의 2배값을 넣어주고
            j += i 를 해줌으로써 배수들을 다 제거해준다.
            */
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
    /*
    num(n)으로 해도 되지만
    n=10일때
    num[9]가 10값을 뜻하게 되므로 
    num(n+1)로 해준다.
    대신 이러면 num[0]은 사용하지 않는다.
    */
    vector<int> num(n+1);
    
    for(int i=2; i <=n ; i++) {
        if(num[i]==1) {
            continue;
        }
        else {
            answer++;
            for(int j=i*2; j < num.size(); j+=i) {
                num[j]=1;
            }
        }
    }
    return answer;
}
```

---

## [소수 - 특정값 소수 판단]({{site.url}}/PrimeNumber/#1-code---check-if-a-specific-value-is-a-prime-number)

``` cpp
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
```
---

## [소수 - 특정범위 소수 갯수]({{site.url}}/PrimeNumber/#2-code---determine-a-fractional-value-in-a-specific-range)

``` cpp
int solution(int n) {
    int answer = 0;
    /*
    num(n)으로 해도 되지만
    n=10일때
    num[9]가 10값을 뜻하게 되므로 
    num(n+1)로 해준다.
    대신 이러면 num[0]은 사용하지 않는다.
    */
    vector<int> num(n+1);
    
    for(int i=2; i <=n ; i++) {
        if(num[i]==1) {
            continue;
        }
        else {
            answer++;
            /*
            소수의 배수들은 무조건 소수가 아니다.
            ex) 3일 경우
            3의 배수 6,9,12,15 등등
            (= 소수 x 2,3,4,5 등등 )
            그렇기 때문에
            j에는 소수인 i의 2배값을 넣어주고
            j += i 를 해줌으로써 배수들을 다 제거해준다.
            */
            for(int j=i*2; j < num.size(); j+=i) {
                num[j]=1;
            }
        }
    }
    return answer;
}
```