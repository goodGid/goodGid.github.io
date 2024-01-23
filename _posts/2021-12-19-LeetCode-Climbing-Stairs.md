---
layout: post
title:  " LeetCode : 70. Climbing Stairs "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs)

### Problem

```
You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
```


---

### Example

```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

---

### [1] Code (21. 12. 19) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 35.8 MB
class Solution {
    public int climbStairs(int n) {
        int[] dp = new int[46];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
```

---

> Review

* 처음엔 DFS 방식으로 접근했는데 시간 초과가 발생했다.

  그래서 DP 아이디어를 떠올렸다.

---

## Reference

* [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs)