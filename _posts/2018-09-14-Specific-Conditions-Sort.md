---
layout: post
title:  " 특정 조건으로 정렬하기 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## To Do

* 특정한 조건으로 정렬을 시킬 필요가 있다.







---

## 정렬시키기

> Vector first 값이 같을 때 second 값으로 정렬하기

## Code

``` cpp
#define p pair<double, int>
bool compare(p &p1, p &p2){
    if( p1.first == p2.first)
        return p1.second < p2.second;
    return p1.first > p2.first;
}

sort(v.begin(), v.end(), compare);
```

``` cpp
struct game{
    double value;
    int row;
};

vector<game> v;

bool compare(game &p1, game &p2){
    if( p1.value == p2.value)
        return p1.row < p2.row;
    return p1.value > p2.value;
}

sort(v.begin(), v.end(), compare);
```

* pair의 first값으로 정렬을 하고 같을 땐 second로 정렬을 한다. 

---

> A,B가 있을때 AB와 BA 중 큰 수로 정렬하기

``` cpp
bool compare(int a, int b){
    string str1 = to_string(a)+to_string(b);
    string str2 = to_string(b)+to_string(a);
    
    cout << "Vecotr List : " ;
    for(int i=0; i<v.size(); i++)
        cout << v[i] << " ";
    cout << endl;
    cout << "체크할 값 : " << str1 << " " << str2 << endl;
    if( str1 > str2 ){
        cout << "Swap 시킨다. " << endl;
    }
    else{
        cout << "Swap 시키지 않는다. " << endl;
    }
    cout << endl;

    return str1 > str2;
}

int main(void){
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    
    v.push_back(6);
    v.push_back(10);
    v.push_back(2);
    v.push_back(15);
    sort(v.begin(), v.end(),compare);
    
    /*
    // 가리키는 Index가 Swap이 안된다면 Index + 1로 옮긴다.
    // Swap이 된다면 Index위치가 아닌 값을 기준으로 
    // 좌측으로 비교를 한다.

    Vecotr List : 6 10 2 15  // 현재 2번째 Index를 가리킨다.
    체크할 값 : 106 610
    Swap 시키지 않는다. // Swap X : 기존에 2번째 위치에서 체크를 시작하였기 때문에 이젠 3번째 Index를 가리킨다.

    Vecotr List : 6 10 2 15  // 현재 3번째 Index를 가리킨다.
    체크할 값 : 210 102
    Swap 시킨다.      // Swap O : 10과 2를 Swap하고 가리키는 값(2)가 위치한 Index를 가리키는 상태가 된다.

    Vecotr List : 6 2 10 15  // 현재 2번째 Index를 가리킨다.
    체크할 값 : 26 62
    Swap 시키지 않는다. // Swap X : 기존에 3번째 위치에서 체크를 시작하였기 때문에 이젠 4번째 Index를 가리킨다.

    Vecotr List : 6 2 10 15  // 현재 4번째 Index를 가리킨다.
    체크할 값 : 1510 1015
    Swap 시킨다.      // Swap O : 10과 15를 Swap하고 가리키는 값(15)가 위치한 Index를 가리키는 상태가 된다.

    Vecotr List : 6 2 15 10  // 현재 3번째 Index를 가리킨다.
    체크할 값 : 152 215
    Swap 시키지 않는다. 
    */

    v.push_back(2);
    v.push_back(6);
    v.push_back(10);
    v.push_back(15);
    sort(v.begin(), v.end(),compare);
    /*
    Vecotr List : 2 6 10 15 
    체크할 값 : 62 26
    Swap 시킨다. 

    Vecotr List : 6 2 10 15 
    체크할 값 : 102 210
    Swap 시키지 않는다. 

    Vecotr List : 6 2 10 15 
    체크할 값 : 1510 1015
    Swap 시킨다. 

    Vecotr List : 6 2 15 10 
    체크할 값 : 152 215
    Swap 시키지 않는다. 
    */
    
    return 0;
}
```

* 관련 문제로 [PGM 42746. 가장 큰 수]({{site.url}}/PGM_42746/)를 풀어보도록 하자.

