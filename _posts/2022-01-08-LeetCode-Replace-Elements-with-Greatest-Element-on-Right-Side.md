---
layout: post
title:  " LeetCode : 1299. Replace Elements with Greatest Element on Right Side "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1299. Replace Elements with Greatest Element on Right Side](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/)

### Problem

```
array with the greatest element among the elements to its right, and replace the last element with -1.
After doing so, return the array.
```


---

### Example

```
Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
```

---

### [1] Code (22. 01. 08) (x)

``` java
// Runtime: 2 ms
// Memory Usage: 51.7 MB
class Solution {
    public int[] replaceElements(int[] arr) {
        int size = arr.length;
        int[] ans = new int[size];
        ans[size - 1] = -1;

        int max = arr[size - 1];

        for (int i = size - 2; i >= 0; i--) {
            ans[i] = max;
            max = Math.max(max, arr[i]);
        }
        return ans;
    }
}
```

---

> Reference Code

``` java
class Solution {
    public int[] replaceElements(int[] arr) {
        int max = -1;
        int[] output = new int[arr.length];

        for (int i = arr.length - 1; i >= 0; i--) {
            output[i] = max;
            max = Math.max(max, arr[i]);
        }

        return output;
    }
}
```

* 추가로 공간을 사용하지 않고

  주어진 arr 배열만 사용해서도 답을 구할 수 있다.

---

> Review

* 10분 소요


---

## Reference

* [1299. Replace Elements with Greatest Element on Right Side](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/)