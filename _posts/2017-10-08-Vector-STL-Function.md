---
layout: post
title:  "Vector :: STL Function"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}


## Code

1. Find min Value in Vector
2. Delete min Value in Vector

``` cpp

vector<int> solution(vector<int> arr) {
    int nMin = *min_element(arr.begin(), arr.end());
    int pos = find(arr.begin(), arr.end(), nMin) - arr.begin();
    arr.erase(arr.begin() + pos);
    return arr;
}


```
