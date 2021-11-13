---
layout: post
title:  " LeetCode : 62. Unique Paths "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [62. Unique Paths](https://leetcode.com/problems/unique-paths/)

### Problem

```
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
How many possible unique paths are there?
```


---

### Example

```
Input: m = 3, n = 7
Output: 28
```

---

### [1] Code (21. 10. 10) (x)

``` java
public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    
    for (int i=0; i<m; i++) {
        dp[i][0] = 1;
    }
        
    for (int j=0; j<n; j++) {
        dp[0][j] = 1;
    }
        
    for (int i=1; i<m; i++) {
        for (int j=1; j<n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    return dp[m-1][n-1];
}
```

> Review

* 너무 흔한 DP 문제였다.

  다시 풀 필요도 없어 보인다.



---

## Reference

* [62. Unique Paths](https://leetcode.com/problems/unique-paths/)