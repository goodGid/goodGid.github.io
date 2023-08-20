---
layout: post
title: " LeetCode : 1502. Can Make Arithmetic Progression From Sequence "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1502. Can Make Arithmetic Progression From Sequence](https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence)

### Problem

```
A sequence of numbers is called an arithmetic progression if the difference between any two consecutive elements is the same.
Given an array of numbers arr, return true if the array can be rearranged to form an arithmetic progression. Otherwise, return false.
```


---

### Example

```
Input: arr = [3,5,1]
Output: true
Explanation: We can reorder the elements as [1,3,5] or [5,3,1] with differences 2 and -2 respectively, between each consecutive elements.
```

---

### [1] Code (23. 08. 20) (x)

``` java
// Runtime: 2 ms
// Memory Usage: 40.5 MB
// Ref : https://leetcode.com/submissions/detail/1026663909
class Solution {
    public boolean canMakeArithmeticProgression(int[] arr) {
        Arrays.sort(arr);
        int common = Math.abs(arr[1] - arr[0]);
        
        for (int i=2; i<arr.length; i++) {
            if (Math.abs(arr[i]- arr[i-1]) != common) {
                return false;
            }
        }
    
        return true;
    }
}
```

* 정말 Easy 했다.

  다시 풀 필요 X

---

## Reference

* [1502. Can Make Arithmetic Progression From Sequence](https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence)