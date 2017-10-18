---
layout: post
title:  "10진수를 임의의 진수로 변환"
date:   2017-10-18
excerpt: "진수 변환"
cate : "algorithm"
tag:
- Key Point
---

## Review

> 많이 사용되는 진수 변환

1. 10진수 -> 2진수 변환

{% highlight cpp %}
 int tenConvertTwo(int num)
  {
    int result = 0;
    for(int i=1; num>0; i*=10)
    {
        int binary = num % 2;
        result += binary*i;
        num /= 2;
    }
    return result;
  }

{% endhighlight %}


2. 2진수 -> 10진수 변환

{% highlight cpp %}

 int twoConvertTen(int num)
  {
    int result = 0, mul = 1;
    while(num>0)
    {
        if(num%2)
            result += mul;
        mul *= 2;
        num /= 10;
    }
    return result;
  }

{% endhighlight %}

---

## Code
{% highlight cpp %}

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
    
    while( decimal !=0 )
    {
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

{% endhighlight %}
