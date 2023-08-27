---
layout: post
title: " LeetCode : 1351. Count Negative Numbers in a Sorted Matrix "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1351. Count Negative Numbers in a Sorted Matrix](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix)

### Problem

```
Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in grid.
Follow up: Could you find an O(n + m) solution?
```


---

### Example

```
Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
Explanation: There are 8 negatives number in the matrix.
```

---

### [1] Code (23. 08. 27)

*Need to Retry -> 다채로운 아이디어*

``` java
// Runtime: 1 ms
// Memory Usage: 43.8 MB
// Ref : https://leetcode.com/submissions/detail/1032925057
class Solution {
    public int countNegatives(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        
        int x = -1;
        int y = -1;
        for (int i=n-1; i>=0; i--) {
            for (int j=m-1; j>=0; j--) {
                if (grid[i][j] < 0 ) {
                    x = i;
                    y = j;
                    break;
                }
            }
            if (x != -1) {
                break;
            }
        }
        
        if (x == -1) { // 만약 grid에 0보다 작은 수가 없을 경우
            return 0;
        }
        
        int x2 = x;
        int y2 = y;
                
        for (int j=y; j>=0; j--) {
            if (grid[x][j] > 0) {
                break;
            }
            y2 = j;
        }
        
        for (int i=x; i>=0; i--) {
            if (grid[i][y] > 0) {
                break;
            }
            x2 = i;
        }

        int cnt = 0;
        for (int i=x2; i<n; i++) {
            for (int j=y2; j<m; j++) {
                if (grid[i][j] < 0 ) {
                    cnt++;
                }
            }
        }
        
        return cnt;
    }
}
```

* 조건을 충족하는 좌표를 

  가장 마지막 [n-1][m-1] -> [n-1][0] 방향으로 찾는다.

  그렇게 찾은 좌표가 [x][y]라면

  x축을 기준으로 row-1 방향으로 0보다 작은 x2를 찾고

  y축도 마찬가지로 col-1 방향으로 0보다 작은 y2를 찾는다.

  그렇게 각 좌표들을 구했으면

  [x2][y2] ~ [x][y]를 순회하면서 카운트를 세준다.

* 해당 풀이는 안타깝게도 **Follow up: Could you find an O(n + m) solution?**를 충족시키지 못한다. ㅠㅠ 

---

> Reference Code

**Code 1**

``` java
// Ref : https://leetcode.com/submissions/detail/966675086
class Solution {
    public int countNegatives(int[][] grid) {
        
    int count = 0;
    int n = grid[0].length;
    int currRowNegativeIndex = n - 1;

    // Iterate on all rows of the matrix one by one.
    for (int[] row : grid) {
        // Decrease 'currRowNegativeIndex' so that it points to current row's last positive element.
        while (currRowNegativeIndex >= 0 && row[currRowNegativeIndex] < 0) {
            currRowNegativeIndex--;
        }
        // 'currRowNegativeIndex' points to the last positive element,
        // which means 'n - (currRowNegativeIndex + 1)' is the number of all negative elements.
        count += (n - (currRowNegativeIndex + 1));
    }
    return count;        
    }
}
```

* **Follow up: Could you find an O(n + m) solution?** 조건을 충족하는 코드

* 각 row의 가장 오른쪽부터 순회를 한다.

  그런데 가장 상단에 있는 row에서 0보다 작은 수를 찾으면

  그 아래 row에서는 해당 좌표에서 왼쪽으로만 체크를 하면 된다.

  그렇게 순회를 함으로써 $O(n+m)$ 조건을 충족시킬 수 있게 된다.

---

> Review

* Easy문제였지만 Easy 하게 풀 지 못했다.

  그래도 좋은 아이디어를 배웠다.


---

## Reference

* [1351. Count Negative Numbers in a Sorted Matrix](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix)