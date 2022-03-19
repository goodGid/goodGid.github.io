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

### [2] Code (22. 03. 20)

*Need to Retry -> 장고끝에 풀었지만 다시 풀어보자.*

``` java
// Runtime: 2 ms
// Memory Usage: 45.1 MB
// Ref : https://leetcode.com/submissions/detail/663091562
class Solution {
    public int maxProduct(int[] nums) {
        int ans = -11;
        int max = 1;
        int min = 1;

        for (int i : nums) {
            int tempMax = max;
            int tempMin = min;
            max = Math.max(i, Math.max(tempMax * i, tempMin * i));
            min = Math.min(i, Math.min(tempMax * i, tempMin * i));
            ans = Math.max(ans, max);
        }

        return ans;
    }
}
```

* 총 30분 + @ 소요

* [2,-5,-2,-4,3] 케이스에서 **또** 막혔다.

  그리고 로직을 수정했다.

  그리고 포기하려 했다가 다시 붙잡았는데 풀었다. !!!
  
---

> Review

* 포기하려 했지만 포기하지 않고 성공했더니 매우 뿌듯하다. 😀


---

## Reference

* [152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)