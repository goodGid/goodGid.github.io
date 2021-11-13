---
layout: post
title:  " LeetCode : 64. Minimum Path Sum "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)

### Problem

```
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.
Note: You can only move either down or right at any point in time.
```


---

### Example

```
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
```

---

### [1] Code (21. 10. 09) (x)

``` java
class Solution {
    public int minPathSum(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        
        int[][] dp = new int[n+1][m+1];
        
        for (int i=0; i<m-1; i++) {
            dp[n][i] = 987654321;
        }
        
        for (int i=0; i<n-1; i++) {
            dp[i][m] = 987654321;
        }
        
        
        for (int i=n-1; i>=0; i--) {
            for (int j=m-1; j>=0; j--) {
                dp[i][j] = Math.min(dp[i][j+1], dp[i+1][j]) + grid[i][j];
            }
        }        
        return dp[0][0];
    }
}
```

> FeedBack

* 처음에 초기화 값을 101로 했는데 60번째 테스트케이스에서 틀렸다.

  만약 dp[0][m-1] 값을 구하기 위해

  min(dp[0][m], dp[1][m-1]) 값을 구할 때

  dp[0][m]의 값이 101이고

  dp[1][m-1]의 값이 정상적으로 로직으로 101보다 큰 값이라면

  초기화 시 사용했던 101값이 최솟값으로 선정되어 틀리게 된다.

---

## Reference

* [64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)