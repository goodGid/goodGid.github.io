---
layout: post
title:  " LeetCode : 934. Shortest Bridge "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [934. Shortest Bridge](https://leetcode.com/problems/shortest-bridge)

### Problem

```
You are given an n x n binary matrix grid where 1 represents land and 0 represents water.
An island is a 4-directionally connected group of 1's not connected to any other 1's. There are exactly two islands in grid.
You may change 0's to 1's to connect the two islands to form one island.
Return the smallest number of 0's you must flip to connect the two islands.
```


---

### Example

```
Input: grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
Output: 1
```

---

### [1] Code (22. 05. 29)

*Need to Retry*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// ref : https://leetcode.com/problems/shortest-bridge/discuss/1448914/Java-oror-Easy-Approach-with-Explanation-oror-BFS-oror-DFS-oror-Preorder-oror-Graph
class Solution {
    public int shortestBridge(int[][] grid) {
        Queue<int[]> q = new LinkedList<>();
        boolean flag = false;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j]
                    == 1)  //  finding one island cell, to traverse the whole component and add it to the Queue
                {
                    dfs(grid, i, j, q);  //  Connected island cells
                    flag = true;
                    break;
                }
            }
            if (flag == true) {break;}
        }

        return findNearestIslandBFS(grid, q);
    }

    private void dfs(int[][] grid, int i, int j,
                     Queue<int[]> q) { // Preorder DFS is used to add the sub-land of island into the queue
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == -1 || grid[i][j] == 0) {
            return; // base case 1)index out of  bound 2)not visiting the visited node  3)not visiting the water cell
        }

        grid[i][j] = -1; // marking the node as visited, so that we don't traverse the node again
        q.offer(new int[] { i, j }); // adding the sub-land of the island into the Queue

         // CSS Border Order
        dfs(grid, i - 1, j, q); // Top
        dfs(grid, i, j + 1, q); // Right
        dfs(grid, i + 1, j, q); // Bottom
        dfs(grid, i, j - 1, q); // Left

        return;
    }

    private int findNearestIslandBFS(int[][] grid,
                                     Queue<int[]> q) { // BFS finds the shortest path length between the two points, so we use here to find the minimum distance between two point of island  // Top to Bottom Approach  // Multiple Variate BFS
        int[][] trav = { { -1, 0 }, { 0, 1 }, { 1, 0 }, { 0, -1 } }; // Traversing in 4 Direction

        int level = 0; // current level // source starting island level

        while (!q.isEmpty()) {
            int size = q.size(); // Level popping constraint
            while (size-- > 0) // Radially traversing breadth wise
            {
                int[] temp = q.poll(); // polling the current node
                for (int[] dirc : trav) {
                     // new co-ordinate
                    int i_ = temp[0] + dirc[0];
                    int j_ = temp[1] + dirc[1];
                    if (i_ >= grid.length || i_ < 0 || j_ >= grid[0].length || j_ < 0 || grid[i_][j_] == -1) {
                        continue; // base case 1)index out of bound 2)not visiting the visited node again
                    }

                    if (grid[i_][j_] == 1) // when we find a island cell, we return the current level(n-1)
                    {
                        return level; // previous level of the destination level // 0 1 2 ... (n-1) n, [1 -> n-1] swap required // returning the n-1 level  // n -> level of the destination level, 0 -> source starting island level
                    } else { // water cell case, we are adding it to the next level of the queue, to expand the search and to find the min path length between two island
                        grid[i_][j_] = -1; // marking it as visited, so that we dont traverse it again
                        q.offer(new int[] { i_, j_ }); // adding the the water cell into the Queue
                    }
                }
            }
            level += 1; // increasing the level
        }
        return -1; // base case
    }
} // Please do Upvote, it helps a lot
```

---

> Review

* 으... BFS로 1개의 섬을 찾는 아이디어까지는 떠올렸는데

  다른 섬을 찾는 아이디어를 떠올리지 못했다.

* 정답 코드를 보니 다른 섬을 찾는 아이디어가 어렵진 않네 ㅎㅎ

---

### [2] Code (23. 03. 11)

*Need to Retry -> 시간 초과 발생 !!!*

``` java
// Ref : https://leetcode.com/submissions/detail/913044029 
class Solution {
    private int ans = 1000000;
    private int size;
    private int[] dx = { -1, 1, 0, 0 }; // 상 하 좌 우
    private int[] dy = { 0, 0, -1, 1 };

    public int shortestBridge(int[][] grid) {
        size = grid.length;
        visitFirstIsland(grid); // [1]
        // pritn(grid);
        findShortestBridge(grid); // [2]

        return ans;
    }

    private void findShortestBridge(int[][] grid) {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                int val = grid[i][j];
                if (val == 1) {
                    dfs(grid, i, j, -1);
                }
            }
        }
    }

    private void dfs(int[][] grid, int x, int y, int cnt) {
        if (grid[x][y] == 2 || ans <= cnt) {
            ans = Math.min(ans, cnt);
            return;
        }

        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];

            if (isRange(grid, nx, ny) && grid[nx][ny] != 1) {
                dfs(grid, nx, ny, cnt + 1);
            }
        }
    }

    private void visitFirstIsland(int[][] grid) {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                int val = grid[i][j];
                if (val == 1) {
                    changeColor(grid, i, j);
                    return;
                }
            }
        }
    }

    private void changeColor(int[][] grid, int x, int y) {

        grid[x][y] = 2;

        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];

            if (isRange(grid, nx, ny) && grid[nx][ny] == 1) {
                changeColor(grid, nx, ny);
            }
        }

    }

    private boolean isRange(int[][] grid, int x, int y) {
        if (x < 0 || x >= size) {
            return false;
        }

        if (y < 0 || y >= size) {
            return false;
        }
        return true;
    }

    private void pritn(int[][] grid) {

        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                System.out.print(grid[i][j] + " ");
            }
            System.out.println("");
        }
    }
}
```

* [1] : visitFirstIsland에서 첫 번째 섬을 2로 바꿔준다.

  그 이유는 두 번째 섬과의 구분을 하기 위해서이다.

* [2] : 두 번째 섬에서 첫 번째 섬을 찾기 위한 코드

  DFS로 접근했는데 정답 코드를 보니 BFS로 접근했어야 했다. ㅠㅠ

---

> Review

* 아이디어 + 구현까지 30분 정도 소요

* BFS + DFS의 조합을 요구하는 재미있는 문제였다.


---

## Reference

* [934. Shortest Bridge](https://leetcode.com/problems/shortest-bridge)