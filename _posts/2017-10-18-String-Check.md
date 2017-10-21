---
layout: post
title:  "String Check"
date:   2017-10-18
excerpt: "String Check"
cate : "algorithm"
tag:
- Key Point
---

## Review

* 문자열 비교

{% highlight cpp %}

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
 
{% endhighlight %}

---

* 문자열에서 1개씩 컨트롤

{% highlight cpp %}

 string str1;
 int len = str1.length();
    for(int i = 0; i < len - 1; i++) {
        if(!(((str1[i] >= 'a') && (str1[i] <= 'z')) || 
	    ((str1[i] >= 'A') && (str1[i] <= 'Z'))))
	 // 필요 Logic 구현
	}

{% endhighlight %}

---

*  띄어 쓰기 단위로 문자열 자르기 (1)

{% highlight cpp %}

int main(){
    char input[100];
    int size;
    
    cin.getline(input,100);
    
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

{% endhighlight %}


---

*  띄어 쓰기 단위로 문자열 자르기 (2)

{% highlight cpp %}

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

{% endhighlight %}

```
input :
qwe asd zxc

output :
qwe Space 
asd Space 
zxc
Program ended with exit code: 0
```

