---
layout: post
title:  " 큰 숫자 문자열로 표현하기  "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## To Do

* int 혹은 long long가 표현할 수 없는 숫자를 표현하려면 문자열로 나타내야한다. 




---

## Problem

Problem URL : **[하노이 탑](https://www.acmicpc.net/problem/1914)**

![](/assets/img/algorithm/1914_1.png)

![](/assets/img/algorithm/1914_2.png)


---

## Code

``` cpp
char data[100];
int main(){
    int n;
    scanf("%d",&n);
    
    data[0]='1';
    int cnt = 0;
    /*
     [1] or [2] 둘 다 사용 가능
     [3]에서 초기화 해줄 때
     data 변수의 타입이 char이기 때문에
     ASCII 값을 넣어도 어차피 char형
     char 형을 넣어도 어차피 char형이다.
     */
    int ctmp; // [1]
//    char ctmp; // [2]
    for(int i=1; i<=n; i++){
        int tmp=0;
        for(int j=cnt; j>=0; j--){
            /*
             *2 : 2제곱
             *3 : 3제곱
             *n : n제곱
             */
            tmp += ( data[j]-'0' ) * 2;
            data[j] = tmp % 10 + '0';
            tmp /= 10;
        }
        
        if(tmp>0){
            ctmp = tmp + '0';
            cnt++;
            for(int j=cnt; j>=1; j--){
                data[j] = data[j-1];
            }
            data[0] = ctmp; // [3]
        }
    }
    
    data[cnt]--;
    printf("%s\n",data);
}
```

---

## Reivew

* 코드를 이해하는데 시간이 걸렸지만 그래도 숙지하도록 하자 ! 