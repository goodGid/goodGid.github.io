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
