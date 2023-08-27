---
layout: post
title: " LeetCode : 2090. K Radius Subarray Averages "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [2090. K Radius Subarray Averages](https://leetcode.com/problems/k-radius-subarray-averages/)

### Problem

```
You are given a 0-indexed array nums of n integers, and an integer k.
The k-radius average for a subarray of nums centered at some index i with the radius k is the average of all elements in nums between the indices i - k and i + k (inclusive). If there are less than k elements before or after the index i, then the k-radius average is -1.
Build and return an array avgs of length n where avgs[i] is the k-radius average for the subarray centered at index i.
```


---

### Example

```
Input: nums = [7,4,3,9,1,8,5,2,6], k = 3
Output: [-1,-1,-1,5,4,4,-1,-1,-1]
```

---

### [1] Code (23. 08. 27)

*Need to Retry*

``` java
// Runtime: 4 ms
// Memory Usage: 60.2 MB
// Ref : https://leetcod e.com/submissions/detail/1032957510
class Solution {
    public int[] getAverages(int[] nums, int k) {
        long sum = 0; // [1]
        int size = nums.length;
        
        int[] ans = new int[size];
        for (int i=0; i<size; i++) {
            ans[i] = -1;
        }
        
        for (int i=0; i<k*2 && i<size; i++) {
            sum += nums[i];
        }
        
        for (int i=k; i<size-k && i<size; i++) {
            sum += nums[i+k];
            ans[i] = (int) (sum / (k*2+1)); // [2]
            sum -= nums[i-k];
        }
        
        return ans;
    }
}
```

* 이번에(=230827) 문제를 풀기 전에

  [230620](https://leetcode.com/submissions/detail/975621483/)에 문제를 풀었는데

  정말 똑같은 실수를 하였고 그래서 문제를 틀렸다.

* [1] : int로 선언을 했었는데 long으로 해야 한다.

```
Constraints:
n == nums.length
1 <= n <= 105
0 <= nums[i], k <= 105
```

* [2] : int로 형변환을 했는데 sum에만 적용이 되도록 하는 실수를 범했다.

``` java
// AS-IS
ans[i] = (int) sum / (k*2+1);
```


---

> Review

* int형 자리를 벗어나는 조건에 대해 아무렇지 않게 넘기면 틀릴 수 있다.


---

## Reference

* [2090. K Radius Subarray Averages](https://leetcode.com/problems/k-radius-subarray-averages/)