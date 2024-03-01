---
layout: post
title:  " LeetCode : 200. Number of Islands "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)

### Problem

```
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
```


---

### Example

```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

---

### [1] Code (21. 12. 05) (x)

``` java
class Solution {
    int[] dx = new int[] { 0, 0, 1, -1 };
    int[] dy = new int[] { 1, -1, 0, 0 };

    public int numIslands(char[][] grid) {
        int r = grid.length;
        int c = grid[0].length;
        int[][] visit = new int[r][c];

        Queue<Node> q = new LinkedList<>();
        int ans = 0;

        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (grid[i][j] == '0') {continue;}
                if (visit[i][j] == 1) {continue;}
                ans++;

                q.add(new Node(i, j));
                visit[i][j] = 1;

                while (!q.isEmpty()) {
                    Node node = q.poll();

                    for (int k = 0; k < 4; k++) {
                        int nx = node.x + dx[k];
                        int ny = node.y + dy[k];

                        if (nx < 0 || nx >= r || ny < 0 || ny >= c) {continue;}

                        if (grid[nx][ny] != '0' && visit[nx][ny] != 1) {
                            visit[nx][ny] = 1;
                            q.add(new Node(nx, ny));

                        }
                    }
                }

            }
        }
        return ans;
    }

    class Node {
        int x;
        int y;

        public Node(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
}
```

---

> Review

* 단순 구현 + BFS 풀이

---

### [2] Code (24. 03. 01)

*Retry -> 풀긴했는데 코드가 더럽다.*

``` java
// Runtime: 9 ms
// Memory Usage: 54.1 MB
// Ref : https://leetcode.com/submissions/detail/1190639057
class Solution {
    public int numIslands(char[][] _grid) {
        int[] dx = { 1, -1, 0, 0 };
        int[] dy = { 0, 0, 1, -1 };

        int n = _grid.length;
        int m = _grid[0].length;

        Queue<int[]> q = new LinkedList<>();
        int[][] grid = new int[n][m];
        int[][] visit = new int[n][m];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                grid[i][j] = _grid[i][j] - '0';
                if (grid[i][j] == 1) {
                    q.add(new int[] { i, j });
                }
            }
        }

        int cnt = 2;

        while (!q.isEmpty()) {
            int[] _node = q.poll();
            int _x = _node[0];
            int _y = _node[1];

            if (grid[_x][_y] != 1) {
                continue;
            }
            grid[_x][_y] = cnt;
            Queue<int[]> q2 = new LinkedList<>();
            q2.add(new int[] { _x, _y });

            while (!q2.isEmpty()) {
                int[] node = q2.poll();
                int x = node[0];
                int y = node[1];

                for (int i = 0; i < 4; i++) {
                    int nx = x + dx[i];
                    int ny = y + dy[i];

                    if (!isLand(grid, nx, ny)) {
                        continue;
                    }
                    grid[nx][ny] = cnt;
                    q2.add(new int[] { nx, ny });
                }
            }
            cnt++;
        }
        return cnt - 2;
    }

    private boolean isLand(int[][] map, int x, int y) {
        int n = map.length;
        int m = map[0].length;
        if (x < 0 || x >= n || y < 0 || y >= m) {
            return false;
        }

        if (map[x][y] == 0 || map[x][y] != 1) {
            return false;
        }

        return true;
    }
}
```

* 풀긴했는데 코드가 깔끔하지 못해서 마음에 안든다.

  [1]에 풀었던 코드를 보니 훨씬 깔끔하다.

  ~~코드를 깔끔하게 짜는 설계 능력이 퇴보했다.~~

* 위안을 삼자면 그나마 제출 1번에 바로 맞췄다.

---

## Reference

* [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)