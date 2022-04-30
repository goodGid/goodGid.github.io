---
layout: post
title:  " LeetCode : 73. Set Matrix Zeroes "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes)

### Problem

```
Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
You must do it in place.
```


---

### Example

```
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
```

---

### [1] Code (22. 04. 30)

*Need to Retry -> Follow Up 충족못했다.*

``` java
// Runtime: 1 ms
// Memory Usage: 44 MB
// Ref : https://leetcode.com/submissions/detail/690075028
class Solution {

    int[] dx = new int[] { 1, -1, 0, 0 };
    int[] dy = new int[] { 0, 0, -1, 1 };

    public void setZeroes(int[][] m) {
        List<Node> list = new ArrayList<>();

        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < m[0].length; j++) {
                if (m[i][j] == 0) {
                    list.add(new Node(i, j));
                }
            }
        }

        int size = list.size();

        for (int i = 0; i < size; i++) {
            Node node = list.get(i);

            for (int j = 0; j < 4; j++) {
                int nx = node.x + dx[j];
                int ny = node.y + dy[j];

                while (isRange(m, nx, ny)) {
                    m[nx][ny] = 0;
                    nx += dx[j];
                    ny += dy[j];
                }
            }
        }

        return;
    }

    private boolean isRange(int[][] m, int x, int y) {
        if (x < 0 || x >= m.length) {
            return false;
        }
        if (y < 0 || y >= m[0].length) {
            return false;
        }
        return true;
    }

    class Node {
        int x;
        int y;

        Node(int x, int y) {
            this.x = x;
            this.y = y;
        }

    }
}
```

* 문제에서 제시한 **Follow up(=Check Point)**을 충족시키진 못했다.

  충족된 코드는 **Code 1**을 참고하자.

* 그래도 내가 떠올린 아이디어를 바로 구현할 수 있어서 좋았다.

---

> Check Point

* A straightforward solution using O(mn) space is probably a bad idea.

* A simple improvement uses O(m + n) space, but still not the best solution.

* Could you devise a constant space solution?

---

> Reference Code

**Code 1**

``` java
// Runtime: 1 ms
// Memory Usage: 41.1 MB
// Ref : https://leetcode.com/submissions/detail/464576831
class Solution {

    public int setZeroes(int[][] matrix) {
        int ir = matrix.length;
        int ic = matrix[0].length;

        //(r, 0)에 0이 있는지 확인
        boolean goodgid = false;// 기용을 위해서 특별히 만든 변수

        for (int r = 0; r < ir; ++r) {
            if (matrix[r][0] == 0) {
                goodgid = true;
            }

            for (int c = 1; c < ic; ++c) {
                // c에 0으로 넣고
                if (matrix[r][c] == 0) {
                    matrix[r][0] = 0;
                    matrix[0][c] = 0;
                }
            }
        }

        for (int r = 1; r < ir; r++) {
            for (int c = 1; c < ic; c++) {
                //0인 것 있으면 쭈욱 0으로 채운다.
                if (matrix[r][0] == 0 || matrix[0][c] == 0) {
                    matrix[r][c] = 0;
                }
            }
        }
        //(0,0) 에 0이있으면 (c,0) 쭈욱 채운다.
        if (matrix[0][0] == 0) {
            for (int c = 0; c < ic; ++c) {
                matrix[0][c] = 0;
            }
        }
        //(r, 0)에 0이 있는지 확인해서 쭈욱 0으로 넣기
        if (goodgid) {
            for (int r = 0; r < ir; ++r) {
                matrix[r][0] = 0;
            }
        }

        return 0;
    }

    public void print(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[0].length; j++) {
                System.out.print(arr[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

* 문제에서 요구한 Follow up을 충족한 코드.


---

> Review

* 10분 소요

* 직관적인 아이디어로 풀었지만 Follow Up을 충족시키지 못했다.

  다음에는 제대로 풀어보자 !


---

## Reference

* [73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes)