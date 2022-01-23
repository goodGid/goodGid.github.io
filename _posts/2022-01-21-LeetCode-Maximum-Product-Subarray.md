---
layout: post
title:  " LeetCode : 152. Maximum Product Subarray "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)

### Problem

```
Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.
The test cases are generated so that the answer will fit in a 32-bit integer.
A subarray is a contiguous subsequence of the array.
```


---

### Example

```
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
```

---

### [1] Code (22. 01. 21)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
// Wrong Code
class Solution {
    public int maxProduct(int[] nums) {
        int ans = nums[0]; 
        int pivot = nums[0];
        int st = nums[0];
        
        for (int i = 1; i < nums.length; i++ ) {
            
            if ( pivot <= 0 ) {
                pivot = nums[i];
            } else { 
                pivot *= nums[i];
            }
            
            if ( st == 0 ) {
                st = nums[i];
            } else {
                st *= nums[i];
            }

            if ( st>pivot) {
                pivot = st;
            }
            
            ans = Math.max(ans, pivot);
            ans = Math.max(ans, st);
           
        }
        
        return ans;
    }
}
```

* 위 코드로 제출 시 다음 케이스에서 실패를 한다.

``` 
Input : [2,-5,-2,-4,3]
Output : 20
Expected : 24
```

---

> Reference Code

``` java
// Runtime: 1 ms
// Memory Usage: 38.4 MB
class Solution {
    public int maxProduct(int[] nums) {
        int ans, max, min;
        ans = max = min = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < 0) {
                int temp = max;
                max = min;
                min = temp;
            }
            max = Math.max(max * nums[i], nums[i]);
            min = Math.min(min * nums[i], nums[i]);
            ans = Math.max(max, ans);
        }
        return ans;
    }
}
```

---


> Review

* 이 문제를 풀면서 현타가 왔다.

  과연 이걸 스스로 힘으로 풀 수 있었을까?... ㅠ ㅠ

---

## Reference

* [152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)