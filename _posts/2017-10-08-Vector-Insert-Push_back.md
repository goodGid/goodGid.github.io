---
layout: post
title:  "Vector :: Insert vs Push_back"
date:   2018-07-25
excerpt: "Vector :: Insert vs Push_back"
cate : "algorithm"
tag:
- Key Point
---

## Function

> **v.insert() vs v.push_back()**

You can use `insert` to perform the same job as `push_back` with `v.insert(v.end(), value)`

{% highlight cpp %}

ex 1)
    vector<int> v = {1, 3, 4};
    
    int val = 5;
    
    // [1]
    v.insert(v.begin(), val );
    v --> {5,1,3,4}
    v.push_back(6);
    v --> {5,1,3,4,6}

    // [2]
    v.insert(next(v.begin()), val );
    v --> {1,5,3,4}
    v.push_back(6);
    v --> {5,1,3,4,6}
    

{% endhighlight %}




