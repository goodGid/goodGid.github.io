---
layout: post
title:  " String을 Int로 변환하기 "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## To Do

* String을 Int로 변환하는 방법에 대해 알아보자.






---

## [1] Problem

Problem URL : **[네 수](https://www.acmicpc.net/problem/10824)**

{% capture images %}
    /assets/img/algorithm/10824_1.png
    /assets/img/algorithm/10824_2.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=2 %}



---


## [1] Code (17. 10. 17)

``` cpp

#include <iostream>
#include <string>
using namespace std;

int main() {
    int a, b, c, d;
    cin >> a >> b >> c >> d;
    
    string s1 = to_string(a) + to_string(b);
    string s2 = to_string(c) + to_string(d);
    
    long long l1 = stoll(s1);
    long long l2 = stoll(s2);
    
    cout<< l1 << endl;
    cout<< l2 << endl;
    cout << l1 + l2 << endl;
    return 0;
}

```

### Input

``` cpp

12 23 34 45

```

---

### Output

``` cpp

1223
3445
4668
Program ended with exit code: 0

```


---


## [2] Problem

Problem URL : **[문자열을 정수로 바꾸기](https://programmers.co.kr/learn/courses/30/lessons/12925)**

{% capture images %}
    /assets/img/algorithm/type_conversion_1.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=1 %}


## [2] Code (18. 07. 23)

``` cpp

int solution(string s) {
    int answer = 0;
    int flag = 1;
    if(s[0] == '+' ){
        flag = 1;
        s = s.substr(1,s.length());
    }
    else if ( s[0] == '-'){
        flag = -1;
        s = s.substr(1,s.length());
    }


    /*
    string to int - string에서 int로 변환
    
    #include <string> (o)
    #include <cstring> (x)

    atoi()함수 사용 -> atio(char*)
    인자가 char*형이기 때문에
    c_str()함수로 변환해주어야함

    그런데
    그냥 stoi(s)를 해도 된다. 
    이유는 모르겠다.
    */
    
    int ans = stoi(s.c_str());
    answer = ans * flag;
    
    return answer;
}


// [2]
#include <sstream>
int solution(string s) {
    int answer = 0;
    stringstream ss;
    ss.str(s);
    ss >> answer;

    return answer;
}


//[3]
int solution(string s) {
    int answer = 0;
    int m = 1;
    for(int i = 0; i < s.size();i++)
    {
        if(s[i] >= '0' && s[i] <= '9')
        {
        answer *= 10;
        answer += (s[i] - 48);
        }
        else if(s[i] == '-')
            m = -1;
    }
    return answer*m;
}

```

