---
layout: post
title:  "ASCII Value "
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## Problem 
Problem URL : **[시저 암호](https://programmers.co.kr/learn/courses/30/lessons/12926)**









{% capture images %}
    /assets/img/algorithm/ascii_value_1.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=1 %}

---

## Code

``` cpp

string solution(string s, int n) {
    string answer = "";
   
    for(int i=0; i<s.length(); i++){
        if (s[i] >= 97 && s[i] <= 122) { // Lower Case
            if( s[i] + n > 122){
                s[i] = ( s[i] + n ) - 26;
            }else {
                s[i] = s[i] + n;
            }
        }
        else if (s[i] >= 65 && s[i] <= 90) { // Upper Case
            if( s[i] + n > 90){
                s[i] = ( s[i] + n ) - 26;
            }else {
                s[i] = s[i] + n;
            }
        }
    }

    return answer;
}

```


``` cpp
int main(){
    // [1], [2] 어느걸로 해도 상관 없다.
    char s[5] = "aAzZ"; // [1]
    string s = "aAzZ"; // [2]
    
    printf("%d \n", s[0] - 'a'); // 0
    printf("%d \n", s[1] - 'A'); // 0
    printf("%d \n", s[2] - 'z'); // 0
    printf("%d \n", s[3] - 'Z'); // 0
    
    // 0의 ASCII값은 48이다.
    // 그렇기 때문에  [ A - '0' + 48 ]을 해주게 되면
    // A의 ASCII값을 알 수 있다.
    printf("%d \n", s[0] - '0' + 48); // 97
    printf("%d \n", s[1] - '0' + 48); // 65
    printf("%d \n", s[2] - '0' + 48); // 122
    printf("%d \n", s[3] - '0' + 48); // 90
    
    
    return 0;
}
```
