---
layout: post
title:  "String Check"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## To Do

* 주어진 문자열에 대해 다양한 조작을 해보자.











---




## 문자열 비교

``` cpp

#include <cstring> // toupper 사용

 bool cmpStr(string s1, string s2) {
    if(s1.length() != s2.length()) {
        return false;
    }
    int len = s1.length();
    for(int i = 0; i < len; i++) {
        if(toupper(s1[i]) != toupper(s2[i]))
            return false;
    }
    return true;
 }
 
```

---

## 문자열에서 1개씩 컨트롤

``` cpp

 string str1;
 int len = str1.length();
    for(int i = 0; i < len - 1; i++) {
        if(!(((str1[i] >= 'a') && (str1[i] <= 'z')) || 
	    ((str1[i] >= 'A') && (str1[i] <= 'Z'))))
	 // 필요 Logic 구현
	}

```

---

## 띄어 쓰기 단위로 문자열 자르기 (1)

### **char**형 변수 사용 

``` cpp
int main(){
    char input[100];
    int size;
    
    cin.getline(input,100);

    /*
    // [1]
    for(int i=0; i<100; i++){
        input[i] = cin.get();
        if( input[i] == '\n')
            break;
    }
    */
    
    // 입력받은 문자열 길이 구하기
    int i=0;
    while (1) {
        if(input[i] == '\0'){
            size = i ;
            break;
        }
        i++;
    }
    
    for (int i = 0; i < size; i++) {
        if(input[i] == ' '){
            input[i] = '\n';
        }
    }
    printf("%s\n",input);
    
    return 0;
}
```


* cin.getline(input,100); 이렇게 입력을 받으면 <br> while 안에 if(input[i] == '\0')로 해야한다. <br> 만약 if(input[i] == '\n')으로 하면 에러가난다. <br> why? <br> cin.getline(input,100)로 입력받고 디버깅을 해보면 <br> qwer asdf 입력 후 엔터를 하게 되면 <br> f까지만 입력을 받고 f의 index가 9라면 input[10]에는 \0 값이 들어간다. <br> 그 [이유]({{site.url}}/String-Input(1)/#cin.getline())는 cin.getline은 마지막 1문자는 null문자 삽입하는 특징이 있기 때문이다.

* if(input[i] == '\n')으로 하고 싶다면 <br> [1]처럼 입력을 받으면 된다.



---

##  띄어 쓰기 단위로 문자열 자르기 (2)

### **string**형 변수 사용 

``` cpp

int main(){
    string s;
    getline(cin,s);

    int size = (int)s.size();
    for(int i=0; i<size; i++){
        if( s[i] == ' '){
            cout << " Space " << endl;
        }
        else {
            cout << s[i];
        }
    }
    cout << endl;
    return 0;
}

```

```
input :
qwe asd zxc

output :
qwe Space 
asd Space 
zxc
Program ended with exit code: 0
```

