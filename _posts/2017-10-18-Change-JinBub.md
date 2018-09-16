---
layout: post
title:  " 진법 변환하기 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## 10진수 -> 2진수 변환

``` cpp
 int tenConvertTwo(int num){
    int result = 0;
    for(int i=1; num>0; i*=10){
        int tmp = num % 2;
        result += tmp * i;
        num /= 2;
    }
    return result;
  }
```








---

## 2진수 -> 10진수 변환

``` cpp
int twoConvertTen(int num){
    int result = 0;
    for(int i=1; num>0; i*=2){
        int tmp = num % 2;
        result += tmp * i;
        num /= 10;
    }
    return result;
}
```



``` cpp
 int twoConvertTen(int num){
    int result = 0, mul = 1;
    while(num>0){
        if(num%2)
            result += mul;
        mul *= 2;
        num /= 10;
    }
    return result;
  }
```

---

## 특정 진법으로 바꾸기

``` cpp
#include <iostream>
#include <cstdlib>
using namespace std;

// b is base
// d is decimal
long long ChangeJinBub(int base, int decimal){
    int i=99;
    char c[17]="0123456789ABCDEF";
    char result[100];
    
    // result[] 마지막 위치에 Null 문자 넣기
    result[i] = '\0'; // i=99
    
    while( decimal !=0 ){
        result[--i] = c[ decimal % base ]; // result[] <-- 나머지
        decimal /= base; // 몫
    }
    return stol(&result[i]); // #include <cstdlib> 선언
}

/*
 ChangeJinBub의 Return Type을
 int로 하니까 1024를 2진법으로 바꾸면
 범위가 넘어가서 터진다.
 그래서 long long으로 선언 !
 */

int main(){
    long long ans;
    int b,d;
    cin >> b >> d;
    ans = ChangeJinBub(b,d);
    cout << ans << endl;
}


Input
2 10
4 10

Output
1010
22
```
