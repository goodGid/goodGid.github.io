---
layout: post
title:  " LeetCode : 279. Perfect Squares "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [279. Perfect Squares](https://leetcode.com/problems/perfect-squares/)

### Problem

```
Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.
```


---

### Example

```
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
```

---

### [1] Code (21. 12. 12)

*Need to Retry -> DP로 풀어보자*

``` java
// Runtime: 162 ms
// Memory Usage: 36.2 MB
class Solution {
    int ans = 10000;

    public int numSquares(int n) {

        List<Integer> list = new ArrayList<>();

        for (int i = n; i > 0; i--) {
            int sqrt = (int) Math.sqrt(i);
            if (sqrt * sqrt == i) {
                list.add(i);
            }
        }

        go(n, list, new ArrayList<>(), 0);

        return ans;
    }

    // sl = square list
    // al = answer list
    private void go(int n, List<Integer> sl, List<Integer> al, int idx) {
        if (n < 0) {
            return;
        }

        if (n == 0) {
            ans = Math.min(ans, al.size());
            return;
        }

        if (ans <= al.size()) {
            return;
        }

        for (int i = idx; i < sl.size(); i++) {
            al.add(sl.get(i));
            go(n - sl.get(i), sl, al, i);
            al.remove(al.size() - 1);
        }
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 23 ms
// Memory Usage: 37.9 MB
class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, n + 1);
        for (int i = 1; i * i <= n; i++) {
            dp[i * i] = 1;
            for (int j = i * i + 1; j <= n; j++) {
                dp[j] = Math.min(dp[j], dp[j - i * i] + 1);
            }
        }
        return dp[n];
    }
}
```

---

> Review

* 맞았는데 효율성 부분에서 너무 안좋다.



---

## Reference

* [279. Perfect Squares](https://leetcode.com/problems/perfect-squares/)