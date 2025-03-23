---
layout: post
title: " LeetCode : 1299. Replace Elements with Greatest Element on Right Side "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1299. Replace Elements with Greatest Element on Right Side](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/description/)

### Problem

```
Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.
After doing so, return the array.
```


---

### Example

```
Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
```

---

### [1] Code (25. 03. 24)

``` java
// Ref : https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/submissions/1579951969
class Solution {
    public int[] replaceElements(int[] arr) {
        int size = arr.length;
        int max = -1;

        for (int i=size-1; i>=0 ;i--) {
            int val = arr[i];
            max = Math.max(max, val);
            arr[i] = max;
        }
        for (int i=0; i<size-1; i++) {
            arr[i] = arr[i+1];
        }
        arr[size-1] = -1;
        return arr;
    }
}
```

* 쉽게 접근해서 풀었다.

---

## Reference

* [1299. Replace Elements with Greatest Element on Right Side](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/description/)