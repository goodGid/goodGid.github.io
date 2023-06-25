---
layout: post
title: " LeetCode : 909. Snakes and Ladders "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [909. Snakes and Ladders](https://leetcode.com/problems/snakes-and-ladders)

### Problem

```
You are given an n x n integer matrix board where the cells are labeled from 1 to n2 in a Boustrophedon style starting from the bottom left of the board (i.e. board[n - 1][0]) and alternating direction each row.
...
Return the least number of moves required to reach the square n2. If it is not possible to reach the square, return -1.
```


---

### Example

```
Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
Output: 4
```

---

### [1] Code (23. 06. 26)

*Need to Retry -> 문제 재밌다.*

``` java
// Runtime: 4 ms
// Memory Usage: 42.9 MB
// Ref : https://leetcode.com/submissions/detail/979611938
class Solution {
    public int snakesAndLadders(int[][] board) {
        boolean leftToRight = true;
        int idx = 0;

        int size = board.length;
        int[] map = new int[size * size];

        for (int i = size - 1; i >= 0; i--) {
            if (leftToRight) {
                for (int j = 0; j < size; j++) {
                    map[idx++] = board[i][j];
                }
            } else {
                for (int j = size - 1; j >= 0; j--) {
                    map[idx++] = board[i][j];
                }
            }
            leftToRight = !leftToRight;
        }

        Queue<Node> q = new LinkedList<>();
        int[] visit = new int[size * size];

        q.add(new Node(0, 0));
        visit[0] = 1;

        while (!q.isEmpty()) {
            Node node = q.poll();
            int curr = node.idx;
            int val = node.val;

            if (curr == size * size - 1) {
                return val;
            }

            for (int i = 1; i <= 6; i++) {
                int nPos = curr + i;

                if (nPos >= size * size) {
                    continue;
                }

                if (map[nPos] != -1) {
                    nPos = map[nPos] - 1; // [2]
                }

                if (visit[nPos] == 0) {
                    q.add(new Node(nPos, val + 1));
                    visit[nPos] = 1;
                }
            }
        }
        return -1;
    }

    class Node {
        int idx;
        int val;

        public Node(int idx, int val) {
            this.idx = idx;
            this.val = val;
        }
    }
}
```

* 처음에 지문이 이해가 안 가서 정답을 보고 역으로 이해를 하였다.

  정답 코드를 보고 이해하고 

  스스로 다시 풀어서 맞췄다.

* 문제의 핵심은 크게 2가지 파트로 나눌 수 있다.

1. 2차원 배열을 1차원 배열로 Flat 하게 펼치기

2. [2] 처럼 Index를 갖고 놀 때 "값 = Index-1" 이라는 속성 주의

---

> Review

* 평범한 BFS 문제 같은데

  map을 한 번 꼬은 듯한 느낌의 문제였다.

  신선한 BFS 문제라 생각이 들어서 재밌었다.


---

## Reference

* [909. Snakes and Ladders](https://leetcode.com/problems/snakes-and-ladders)