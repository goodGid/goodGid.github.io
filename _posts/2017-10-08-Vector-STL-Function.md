---
layout: post
title:  "Vector :: STL Function"
date:   2018-07-25
excerpt: "Vector :: STL Function"
cate : "algorithm"
tag:
- Key Point
---

## Code

1. Find min Value in Vector
2. Delete min Value in Vector

{% highlight cpp %}

vector<int> solution(vector<int> arr) {
    int nMin = *min_element(arr.begin(), arr.end());
    int pos = find(arr.begin(), arr.end(), nMin) - arr.begin();
    arr.erase(arr.begin() + pos);
    return arr;
}


{% endhighlight %}
