---
layout: post
title: " LeetCode : 994. Rotting Oranges "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [994. Rotting Oranges](https://leetcode.com/problems/rotting-oranges)

### Problem

```
You are given an m x n grid where each cell can have one of three values:
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
```


---

### Example

```
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
```

---

### [1] Code (23. 08. 06) (x)

``` java
// Runtime: 2 ms
// Memory Usage: 41.2 MB
// Ref : https://leetcode.com/submissions/detail/1013360044
class Solution {
    public int orangesRotting(int[][] grid) {
        int[] dx = { 0, 0, 1, -1 };
        int[] dy = { 1, -1, 0, 0 };

        int row = grid.length;
        int col = grid[0].length;
        int[][] visit = new int[row][col];
        int orange_cnt = 0;
        int time = 0;

        Queue<int[]> q = new LinkedList<>();

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (grid[i][j] == 1) {
                    orange_cnt++;
                } else if (grid[i][j] == 2) {
                    q.add(new int[] { i, j });
                }
            }
        }

        while (!q.isEmpty()) {
            int size = q.size();
            boolean isWork = false;
            for (int s = 0; s < size; s++) {
                int[] node = q.poll();
                int x = node[0];
                int y = node[1];

                for (int i = 0; i < 4; i++) {
                    int nx = x + dx[i];
                    int ny = y + dy[i];
                    if (isAccess(nx, ny, grid, visit)) {
                        isWork = true;
                        orange_cnt--;
                        visit[nx][ny] = 1;
                        q.add(new int[] { nx, ny });
                    }
                }
            }
            if (isWork) {
                time++;
            }
        }

        if (orange_cnt == 0) {
            return time;
        } else {
            return -1;
        }
    }

    private boolean isAccess(int x, int y, int[][] grid, int[][] visit) {
        int row = grid.length;
        int col = grid[0].length;

        if (x < 0 || x >= row || y < 0 || y >= col) {
            return false;
        }

        if (visit[x][y] == 1) {
            return false;
        }

        if (grid[x][y] != 1) {
            return false;
        }
        return true;
    }
}
```

> Review

* 무난한 구현문제

  한 방에 패스

---

### [2] Code (24. 03. 02)

*Retry* 

``` java
// 
// Runtime: 2 ms
// Memory Usage: 42.2 MB
// Ref : https://leetcode.com/submissions/detail/1191070055
class Solution {
    public int orangesRotting(int[][] map) {
        int[] dx = {1,-1,0,0};
        int[] dy = {0,0,1,-1};
        int n = map.length;
        int m = map[0].length;
        
        Queue<int[]> q = new LinkedList<>();
        
        int freshCnt = 0;
        for (int i=0; i<n; i++) {
            for (int j=0; j<m; j++) {
                if (map[i][j] == 1) {
                    freshCnt++;
                }
                if (map[i][j] == 2) {
                    q.add(new int[]{i,j});
                }
            }
        }
        
        int cnt = -1;
        while (!q.isEmpty()) {
            int size = q.size();
            if (size > 0) {
                cnt++;
            }
            
            for (int i=0; i<size; i++) {
                int[] node = q.poll();
                int x = node[0];
                int y = node[1];
                
                for (int k=0; k<4; k++) {
                    int nx = x + dx[k];
                    int ny = y + dy[k];
                    
                    if (!isFresh(map, nx, ny)) {
                        continue;
                    }
                    freshCnt--;
                    map[nx][ny] = 2;
                    q.add(new int[] {nx, ny});
                }
            }
        }
        if (freshCnt == 0 && cnt == -1) {
            return 0;
        }
        if (freshCnt == 0) {
            return cnt;
        }
        return -1;
    }
    
    private boolean isFresh(int[][] map, int x, int y) {
        int n = map.length;
        int m = map[0].length;
        
        if (x < 0 || y < 0 || x >= n || y >= m) {
            return false;
        }
        
        if (map[x][y] != 1) {
            return false;
        }
        
        return true;
    }
}
```

---

> Review

* 무난 무난 구현 문제

---

## Reference

* [994. Rotting Oranges](https://leetcode.com/problems/rotting-oranges)