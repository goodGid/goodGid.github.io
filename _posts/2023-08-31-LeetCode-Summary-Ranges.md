---
layout: post
title: " LeetCode : 228. Summary Ranges "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [228. Summary Ranges](https://leetcode.com/problems/summary-ranges)

### Problem

```
You are given a sorted unique integer array nums.

A range [a,b] is the set of all integers from a to b (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.
```


---

### Example

```
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
```

---

### [1] Code (23. 08. 31) (x)

``` java
// Runtime: 5 ms
// Memory Usage: 40.9 MB
// Ref : https://leetcode.com/submissions/detail/969647222
class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> ans = new ArrayList<>();
        int lenght = nums.length;
        
        for (int i=0; i<lenght; i++) {
            int st=i;
            while (i+1 < lenght && nums[i+1]-nums[i]==1) {
                i++;
            }
            if (st == i) {
                ans.add(nums[st] + "");
            } else {
                ans.add(nums[st] + "->" + nums[i]);
            }
        }
        
        return ans;
    }
}
```

* 무난하게 풀었던 Easy한 문제

---

## Reference

* [228. Summary Ranges](https://leetcode.com/problems/summary-ranges)