---
layout: post
title: " LeetCode : 576. Out of Boundary Paths "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [576. Out of Boundary Paths]({{site.url}}/https://leetcode.com/problems/out-of-boundary-paths)

### Problem

```
There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn]. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply at most maxMove moves to the ball.

Given the five integers m, n, maxMove, startRow, startColumn, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it modulo 109 + 7.
```


---

### Example

```
Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
Output: 6
```

---

### [1] Code (24. 02. 12)

*Retry*

``` java
// 87 / 94 test cases passed.
// Ref : https://leetcode.com/submissions/detail/1171340657
class Solution {
    int n;
    int m;
    int[][][] dp;
    int[] dx = {1,-1, 0, 0};
    int[] dy = {0, 0, 1,-1};
    int mod = (int) 1e9 + 7;
    
    public int findPaths(int _m, int _n, int maxMove, int startRow, int startColumn) {
        n = _m;
        m = _n;
        
        dp = new int[n][m][maxMove+1];
        for (int i=0; i<n; i++) {
            for (int j=0; j<m; j++) {
                for (int k=0; k<=maxMove; k++) {
                    dp[i][j][k] = -1;
                }
            }
        }
        
        go(startRow, startColumn, maxMove);
        
        if (dp[startRow][startColumn][maxMove] == -1) { 
            return 0;
        }
        return dp[startRow][startColumn][maxMove];
    }
    
    private int go(int x, int y, int mvCnt) {
        if (mvCnt == 0) {
            return 0;
        }
        if (dp[x][y][mvCnt] != -1) {
            return dp[x][y][mvCnt];
        }
        
        int cnt = 0;
        for (int i=0; i<4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            
            if (!isRange(nx,ny)) {
                cnt++;
            } else {
                cnt += (go(nx, ny, mvCnt-1) % mod); // [1]
            }
        }
            
        return dp[x][y][mvCnt] = cnt;
    }
    
    private boolean isRange(int x, int y) {
        if (x < 0 || x == n || y < 0 || y == m) {
            return false;
        }
        return true;
    }
}
```

* [1] : 87/94 Test Cases까지 통과하고 틀렸다.

  분명 로직에는 크게 문제가 없을텐데 하고 봤더니 

  cnt 값에 go() 결과를 더한 후 mod 연산을 해주면 [AC](https://leetcode.com/submissions/detail/1172798377)를 받을 수 있다.

* 게다가 시간/공간 복잡도도 아래 Reference Code보다 효율적이다.

  Runtime: 5 ms / Memory Usage: 42 MB

``` java
cnt += (go(nx, ny, mvCnt-1) % mod); // [1]
cnt %= mod;
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 10 ms
// Memory Usage: 42 MB
// Ref : https://leetcode.com/submissions/detail/1171478276
class Solution {
  public int findPaths(int m, int n, int N, int x, int y) {
    int M = 1000000000 + 7;
    int dp[][] = new int[m][n];
    dp[x][y] = 1;
    int count = 0;
    for (int moves = 1; moves <= N; moves++) {
      int[][] temp = new int[m][n];
      for (int i = 0; i < m; i++) { // [1]
        for (int j = 0; j < n; j++) {
          if (i == m - 1) count = (count + dp[i][j]) % M;
          if (j == n - 1) count = (count + dp[i][j]) % M;
          if (i == 0) count = (count + dp[i][j]) % M;
          if (j == 0) count = (count + dp[i][j]) % M;
          temp[i][j] = (
              ((i > 0 ? dp[i - 1][j] : 0) + (i < m - 1 ? dp[i + 1][j] : 0)) % M +
              ((j > 0 ? dp[i][j - 1] : 0) + (j < n - 1 ? dp[i][j + 1] : 0)) % M
          ) % M;
        }
      }
      dp = temp;
    }
    return count;
  }
}
```

* [1] : for문이 끝나면 dp = temp 코드가 동작한다.

  즉 moves 값이 1번 올라가면 dp 값을 업데이트 한다는 뜻이다.

---

> Review

* 240127에 풀어보고 다시 풀어봐야겠다 생각해서

  240211에 풀었던 건데 자잘한 실수들이 있었다.

  역시 못 풀어서 정답을 보는 건 완벽한 내 것이 아니었다.

  못 푼 문제는 다시 풀어보는 게 중요함을 다시 한번 깨닫는다.

```
https://leetcode.com/submissions/detail/1171340102
-> -1로 초기화 했고 만약 탈출이 불가능하다면 0을 반환해야하는데 -1을 리턴하게 하는 실수를 하였다.
```


---

## Reference

* [576. Out of Boundary Paths]({{site.url}}/https://leetcode.com/problems/out-of-boundary-paths)