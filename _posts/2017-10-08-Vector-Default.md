---
layout: post
title:  "Vector :: Default Function"
date:   2017-10-07
excerpt: "Vector 사용법"
cate : "algorithm"
tag:
- Key Point
---

## Review


 
 ---

## Function

> **v.insert() vs v.push_back()**

You can use `insert` to perform the same job as `push_back` with `v.insert(v.end(), value)`

{% highlight cpp %}

ex 1)
    vector<int> v = {1, 3, 4};
    v.insert(next(begin(v)), 2);
    v.push_back(5);
    v --> now contains {1, 2, 3, 4, 5}


ex 2)
    v.insert(v.begin(), val );
    v2.push_back(val);

    N : 3 
    input : 1 3 2

    v --> { 2 3 1 }
    v2 --> { 1 3 2 }

{% endhighlight %}


---

## Code
{% highlight cpp %}

#include <iostream>
#include <vector>
#include <functional>
using namespace std;

// #include <functional> 선언
//  Reason : to use 'greater<int>()'
sort(v.begin(),v.end(),greater<int>() );

// 벡터에서 최대값을 구하는 함수
int getMax(const vector<int>& v){
    int max = -0x7fffffff -1; // 초기값을 int형 최소값으로 설정
    for(int i=0; i<v.size(); i++){
        if(max <v[i])
            max = v[i];
    }
    return max;
}

// 벡터에서 최소값을 구하는 함수
int getMin( const vector<int>& v){
    int min = 0x7fffffff; // 초기값을 int형 최대값으로 설정
    for(int i=0; i<v.size(); i++){
        if(min > v[i])
            min = v[i];
    }
    return min;
}

// 벡터에서 입력값의 인덱스를 찾는 함수
int getIndex( const vector<int>& v, int value){
    for(int i=0; i<v.size(); i++){
        if( v[i] == value)
            return i;
    }
    return -1; // 해당값 없음
}


// 벡터에서 특정값을 삭제하는 함수
void erase( vector<int>& v, int value){
    int index = getIndex(v, value);
    if( index == -1 ){
        cout << "입력값 " << value << "는 벡터에 없습니다.";
        return ;
    }
    v.erase(v.begin()+index);
}

// 벡터의 값들을 출력하는 함수
void print( vector<int>& v){
    for(int i=0; i<v.size(); i++){
        cout << v[i] << " ";
    }
    cout << endl;
}

int main(){
    vector<int> v;
    int num;
    cin >> num;
    for(int i=0; i<num; i++){
        int val;
        cin >> val;
        v.insert(v.begin(), val);
    }
    
    if(v.size() == 0)
        exit(-1);
    
    // 벡터에서 최소값 제거
    erase(v, getMin(v));
    
    // 벡터에서 남은 최대값 제거
    erase(v, getMax(v));
    
    // 새로운 벡터 생성
    vector<int> v2;
    v2.insert(v2.begin(), getMax(v)); // v벡터에서 최대값을 v2에 저장
    v2.insert(v2.begin(), getMin(v)); // v벡터에서 최소값을 v2에 저장
    print(v2);
    return 0;
}


{% endhighlight %}

---
## Input

{% highlight cpp %}

5
1 2 3 4 5

{% endhighlight %}

---
## Output

{% highlight cpp %}

2 4
Program ended with exit code: 0

{% endhighlight %}



