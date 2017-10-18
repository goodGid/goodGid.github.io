---
layout: post
title:  "String Input"
date:   2017-10-18
excerpt: "String Input"
cate : "algorithm"
tag:
- Key Point
---

## Review

* <cin>

{% highlight cpp %}

int main(){
         char a, b;
         char str[10];
         cin >> a;                      //1
         cout << a << endl;             //2
         
         cin >> a;                      //3
         cin >> b;                      //4
         cout << a << " " << b << endl; //5
         
         cin >> str;                    //6
         cout << str << endl;;          //7
     }


{% endhighlight %}

```
solve)
     1번 p를 입력하고 엔터
     2번 출력 결과 => p
 
     3,4번에서,
     x입력후 엔터, y입력후 엔터
     5번 출력 결과 => x y
     
     6번에서 loving you 엔터
     7번에서 출력 결과 =>loving
```     
 
* cin은 엔터가 나오면 입력 종료로 간주.
 
 
