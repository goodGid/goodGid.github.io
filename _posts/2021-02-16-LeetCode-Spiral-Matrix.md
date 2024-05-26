---
layout: post
title:  " LeetCode : 54. Spiral Matrix "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

### Problem

```
Given an m x n matrix, return all elements of the matrix in spiral order.
```





---

### Example

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

---

### [1] Code (21. 02. 16)

``` java
class Solution {

    int[] dx = { 0, 1, 0, -1 };
    int[] dy = { 1, 0, -1, 0 };

    public List<Integer> spiralOrder(int[][] matrix) {

        List<Integer> answer = new LinkedList<>();
        boolean[][] isVisit = new boolean[matrix.length][matrix[0].length];

        return solve(answer, matrix, isVisit, 0, 0, 0);
    }

    private List<Integer> solve(List<Integer> answer, int[][] matrix, boolean[][] isVisit,
                                int dir, int x, int y) {

        isVisit[x][y] = true;
        answer.add(matrix[x][y]);

        int nx = x + dx[dir];
        int ny = y + dy[dir];

        int nextDir = getNextDirection(dir + 1);
        int nx2 = x + dx[nextDir];
        int ny2 = y + dy[nextDir];

        if (isInRange(matrix, nx, ny)
            && isVisit[nx][ny] == false) {
            solve(answer, matrix, isVisit, dir, nx, ny);

        } else if (isInRange(matrix, nx2, ny2)
                   && isVisit[nx2][ny2] == false) {
            solve(answer, matrix, isVisit, nextDir, nx2, ny2);
        }

        return answer;

    }

    private int getNextDirection(int dir) {
        return dir % 4;
    }

    private boolean isInRange(int[][] matrix, int x, int y) {
        return x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
    }
}
```

> Check Point

1. 달팽이 모양으로 순회하면서 인자 값 출력

2. input 값에 대해서는 고려하지 않아도 됨

3. 코너 케이스는 따로 없어 보임

---

> Algorithm Description

* 단순 구현문제

---

### [2] Code (22. 05. 02) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 41.7 MB
// Ref : https://leetcode.com/submissions/detail/691398557
class Solution {
    int[] dx = { 0, 1, 0, -1 };
    int[] dy = { 1, 0, -1, 0 };
    int d = 0;

    public List<Integer> spiralOrder(int[][] m) {

        int x = 0;
        int y = 0;
        List<Integer> ans = new ArrayList<>();

        while (isRange(m, x, y) && m[x][y] != -101) {
            ans.add(m[x][y]);
            m[x][y] = -101;

            int tempNx = x + dx[d];
            int tempNy = y + dy[d];

            if (!isMoveable(m, tempNx, tempNy)) {
                d = (d + 1) % 4;
            }

            x = x + dx[d];
            y = y + dy[d];
        }

        return ans;
    }

    private boolean isMoveable(int[][] m, int x, int y) {
        if (!isRange(m, x, y)) {
            return false;
        }

        if (m[x][y] == -101) {
            return false;
        }

        return true;
    }

    private boolean isRange(int[][] m, int x, int y) {
        if (x >= m.length || x < 0) {
            return false;
        }

        if (y >= m[0].length || y < 0) {
            return false;
        }
        return true;
    }

}
```

---

> Review

* 10~15분 소요

* 단순 구현문제

---

### [3] Code (24. 05. 26)

*Retry -> 재밌게 다시 풀어보자*

``` java
// Runtime: 0 ms
// Memory Usage: 41.6 MB
// Ref : https://leetcode.com/submissions/detail/1268442237
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> ans = new ArrayList<>();
        List<int[]> list = new LinkedList<>();
        int[][] visit = new int[matrix.length][matrix[0].length];
        
        int[] dx = {0, 1, 0, -1};
        int[] dy = {1, 0, -1, 0};
        int dir = 0;
        
        list.add(new int[]{0,0});
        
        while(!list.isEmpty()) {
            int[] node = list.get(0);
            int x = node[0];
            int y = node[1];
            list.remove(0);
            visit[x][y] = 1;
            ans.add(matrix[x][y]);
            
            for (int i=0; i<=1; i++) {
                dir = (dir+i) % 4;
                int nx = x + dx[dir];
                int ny = y + dy[dir];
                
                if (isRange(matrix, nx, ny)) {
                    if (visit[nx][ny] == 0) {
                        list.add(new int[]{nx, ny});
                        break;
                    }
                }
            }
        }
        return ans;
    }
    
    private boolean isRange(int[][] map, int x, int y) {
        int xLen = map.length;
        int yLen = map[0].length;
        
        if (x >= 0 && x < xLen && y >= 0 && y < yLen) {
            return true;
        }
        return false;
    }
}
```

---

> Review

* 무난하게 풀었다.


---

## Reference

* [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)