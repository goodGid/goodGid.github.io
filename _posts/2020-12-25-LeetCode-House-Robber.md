---
layout: post
title:  " LeetCode : 198. House Robber "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [198. House Robber](https://leetcode.com/problems/house-robber/)

### Problem

* Need to Retry

```
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.
```





---

### Example

```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.
```

---

### [1] Code (20. 12. 25)

``` java
class Solution {

    public int rob(int[] nums) {
        if (nums.length == 0) {
            return 0;
        } else if (nums.length == 1) {
            return nums[0];
        }

        nums[1] = Math.max(nums[0], nums[1]);

        for (int i = 2; i < nums.length; i++) {
            nums[i] = Math.max(nums[i - 1], nums[i] + nums[i - 2]);
        }
        return nums[nums.length - 1];
    }
}
```

* 처음에 접근을 dp + dfs로 해버렸더니 너무 오래 걸리고 결국 풀지 못했다.

  분명 이렇게 어렵지 않을 텐데... 라는 생각이 너무 들었고

  정답을 보고 다시 풀었다.

* 물론 정답 코드를 보자마자

  비슷한 문제를 풀었던 기억이 떠올랐고 

  왜 떠올리지 못했을까? 라는 아쉬움이 너무 남았다.

* 다음에 다시 풀어봐야겠다.

---

### [2] Code (22. 01. 30) (x)

``` java
// Runtime: 1 ms
// Memory Usage: 42.2 MB
// Ref : https://leetcode.com/submissions/detail/630100126/
class Solution {
    public int rob(int[] n) {
        int size = n.length;

        if (size == 0) {
            return 0;
        } else if (size == 1) {
            return n[0];
        } else if (size == 2) {
            return Math.max(n[0], n[1]);
        }

        int[] dp = new int[size];
        dp[0] = n[0];
        dp[1] = Math.max(n[0], n[1]);

        for (int i = 2; i < size; i++) {
            dp[i] = Math.max(n[i] + dp[i - 2], dp[i - 1]);
        }

        return dp[size - 1];

    }
}
```

---

> Review

* 보자마자 어렵지 않게 풀었다.

---

## Reference

* [198. House Robber](https://leetcode.com/problems/house-robber/)