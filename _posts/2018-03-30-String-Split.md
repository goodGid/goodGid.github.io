---
layout: post
title:  " 구분자로 String 구분하기"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## String Split : 모든 strTok 가능

``` cpp

#include<iostream>
#include<vector>
#define MAX_TOK 10000000
using namespace std;

string* strSplit(string strOrigin, string strTok){
    int cutAt;  // 자르는 위치
    int index = 0;  // 문자열 인덱스
    string* strResult = new string[MAX_TOK] ;// 결과 return 변수
    
    // strTok을 찾을 때까지 반복
    while ( (cutAt = strOrigin.find_first_of(strTok)) != strOrigin.npos){
        if (cutAt > 0){  // 자르는 위치가 0보다 크면
            // 결과 배열에 추가
            strResult[index++] = strOrigin.substr(0, cutAt);
        }
        // 원본은 자른 부분을 제외한 나머지
        strOrigin = strOrigin.substr(cutAt + 1);
    }
    
    if (strOrigin.length() > 0){ // 원본이 아직 남았으면
        // 나머지를 결과 배열에 추가
        strResult[index++] = strOrigin.substr(0, cutAt);
    }
    
    return strResult;
}

int main(){
    string s = "I,2017101,김재현,컴퓨터공학과,3,1234123412345";
    
    string* query = strSplit(s, ','); // [1] Error : ' ' (x)
    string* query = strSplit(s, ","); // [2] Good : " " (o)
    
    cout << query[0] << endl;
    cout << query[1] << endl;
    cout << query[2] << endl;
    cout << query[3] << endl;
    cout << query[4] << endl;
    cout << query[5] << endl;
    cout << query[6] << endl;
    
    if( query[6] == "" )
        cout << " empty " << endl;
    
    return 0;
}

Output :

I
2017101
김재현
컴퓨터공학과
3
1234123412345

 empty 
Program ended with exit code: 0 

```

### Review

* [1]은 Error가 발생한다.

* [ "," ]처럼 `쌍따옴표`로 묶어줘야한다.

* 함수 실행시 약간의 시간이 걸린다.


---



## String Split : Space 전용

``` cpp

#include <iostream>
#include <sstream>
#include <string>
#include <vector>

int main(){
    string sentence = "string to split";
    istringstream iss(sentence);
    

    // [1] - 1 : string
    vector<string> v;
    for(string s; iss >> s; ){
        v.push_back(s);
    }

    // [1] - 2 : int
    vector<int> v;
    for(int s; iss >> s; ){
        v.push_back(s);
    }

    
    // [2]
    vector<string> result{
        istream_iterator<string>(iss), {}
    };
    
    // 단어를 출력하려면
    copy(istream_iterator<string>(iss),
         istream_iterator<string>(),
         ostream_iterator<string>(cout, "\n"));

    // 단어를 container에 저장하려면
    vector<string> words;
    copy(istream_iterator<string>(iss),
         istream_iterator<string>(),
         back_inserter(words));
    
}
```

### Review

* Space 전용이다.