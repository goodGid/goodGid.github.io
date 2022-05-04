---
layout: post
title:  " LeetCode : 496. Next Greater Element I "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i)

### Problem

```
The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
```


---

### Example

```
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
```

---

### [1] Code (22. 05. 04)

*Need to Retry -> 너무 오래걸렸다.*

``` java
// Runtime: 2 ms
// Memory Usage: 43.6 MB
// Ref : https://leetcode.com/submissions/detail/693009892
class Solution {
    public int[] nextGreaterElement(int[] n1, int[] n2) {
        int n1l = n1.length;
        int n2l = n2.length;
        int[] ans = new int[n1l];
        int[] dp = new int[10001];

        Arrays.fill(dp, -1);

        for (int i = 0; i < n2l - 1; i++) {
            for (int j = i + 1; j < n2l; j++) {
                if (n2[i] < n2[j]) {
                    dp[n2[i]] = n2[j];
                    break;
                }
            }
        }

        for (int i = 0; i < n1l; i++) {
            ans[i] = dp[n1[i]];
        }

        return ans;
    }
}
```

---

> Review

* 쉽게 느껴졌는데 실수가 잦아 너무 오래 걸렸다.

---

## Reference

* [496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i)