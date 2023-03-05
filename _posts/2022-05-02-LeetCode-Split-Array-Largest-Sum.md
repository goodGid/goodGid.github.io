---
layout: post
title:  " LeetCode : 410. Split Array Largest Sum "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [410. Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum)

### Problem

```
Given an array nums which consists of non-negative integers and an integer m, you can split the array into m non-empty continuous subarrays.
Write an algorithm to minimize the largest sum among these m subarrays.
```


---

### Example

```
Input: nums = [7,2,5,10,8], m = 2
Output: 18
Explanation:
There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8],
where the largest sum among the two subarrays is only 18.
```

---

### [1] Code (22. 04. 30)

*Need to Retry -> 흠... 시간초과 발생 !!!*

``` java
n/a
```

* 아이디어 생각 : 15분

  코딩 : 10분

* [12번 TC에서 Time Limit](https://leetcode.com/submissions/detail/690195210) 발생

---

> Reference Code

``` java
// Runtime: 47 ms
// Memory Usage: 48.9 MB
// Ref : https://leetcode.com/submissions/detail/690202852
class Solution {
    // Defined it as per the maximum size of array and split count
    // But can be defined with the input size as well
    Integer[][] memo = new Integer[1001][51];
    
    private int getMinimumLargestSplitSum(int[] prefixSum, int currIndex, int subarrayCount) {
        int n = prefixSum.length - 1;
        
        // We have already calculated the answer so no need to go into recursion
        if (memo[currIndex][subarrayCount] != null) {
            return memo[currIndex][subarrayCount];
        }
        
        // Base Case: If there is only one subarray left, then all of the remaining numbers
        // must go in the current subarray. So return the sum of the remaining numbers.
        if (subarrayCount == 1) {
            return memo[currIndex][subarrayCount] = prefixSum[n] - prefixSum[currIndex];
        }
        
        // Otherwise, use the recurrence relation to determine the minimum largest subarray
        // sum between currIndex and the end of the array with subarrayCount subarrays remaining.
        int minimumLargestSplitSum = Integer.MAX_VALUE;
        for (int i = currIndex; i <= n - subarrayCount; i++) {
            // Store the sum of the first subarray.
            int firstSplitSum = prefixSum[i + 1] - prefixSum[currIndex];
            
            // Find the maximum subarray sum for the current first split.
            int largestSplitSum = Math.max(firstSplitSum, 
                                      getMinimumLargestSplitSum(prefixSum, i + 1, subarrayCount - 1));
            
            // Find the minimum among all possible combinations.
            minimumLargestSplitSum = Math.min(minimumLargestSplitSum, largestSplitSum);
             
            if (firstSplitSum >= minimumLargestSplitSum) {
                break;
            }
        }
        
        return memo[currIndex][subarrayCount] = minimumLargestSplitSum;
    }
    
    public int splitArray(int[] nums, int m) {
        // Store the prefix sum of nums array.
        int n = nums.length;
        int[] prefixSum = new int[n + 1];
        
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
        
        return getMinimumLargestSplitSum(prefixSum, 0, m);
    }
}
```

> Review

* 흠... 접근 방법에 대해 다시 공부해보자 !


---

### [2] Code (23. 03. 05)

*Need to Retry -> 접근조차 정답을 봐도 이해가 안갔다.*

``` java
n/a
```

> Review

* 사고력이 많이 부족한듯 ㅠㅠ

  정답 코드를 봐도 이해가 안갔다.

---

## Reference

* [410. Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum)