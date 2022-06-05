---
layout: post
title:  " LeetCode : 1143. Longest Common Subsequence "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence)

### Problem

```
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.
```


---

### Example

```
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
```

---

### [1] Code (22. 06. 05)

*Need to Retry -> LCS 구현 실패*

``` java
// Runtime: 13 ms
// Memory Usage: 46.2 MB
// Ref : https://leetcode.com/submissions/detail/714926831
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int t1l = text1.length();
        int t2l = text2.length();

        int[][] dp = new int[t1l + 1][t2l + 1];

        for (int i = 1; i <= t1l; i++) {
            for (int j = 1; j <= t2l; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[t1l][t2l];
    }
}
```

---

> Review

* LCS 관련 문제를 이전에도 풀어봤지만 기억이 나지 않아

  정답을 보고 다시 풀었다.

* 다음번에는 꼭 기억나길 !

---

## Reference

* [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence)