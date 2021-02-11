---
layout: post
title:  " LeetCode : 79. Word Search "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [79. Word Search](https://leetcode.com/problems/word-search/)

### Problem

```
Given an m x n board and a word, find if the word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where "adjacent" cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.
```





---

### Example

* 문제 참고

---

### [1] Code (21. 02. 11)

``` java
class Solution {

    private int[] dx = { 0, 0, -1, 1 };
    private int[] dy = { -1, 1, 0, 0 };

    public boolean exist(char[][] board, String word) {

        boolean[][] isVisit = new boolean[board.length][board[0].length];

        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                if (board[i][j] != word.charAt(0)) {
                    continue;
                }
                for (int k = 0; k < 4; k++) {
                    if (solve(board, word, isVisit, i, j, Direction.getDirection(k), 1, board[i][j] + "")) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private boolean solve(char[][] board, String word, boolean[][] visitArr,
                          int x, int y,
                          Direction preDir,
                          int wordIdxToFind, String str) {
        if (word.equals(str)) {
            return true;
        }

        if (wordIdxToFind >= word.length()) {
            return false;
        }

        visitArr[x][y] = true;

        for (int i = 0; i < 4; i++) {
            if (i == preDir.getReverseDirection()) { // 방금 왔던 방향은 가지 않는다.
                continue;
            }

            int nx = x + dx[i];
            int ny = y + dy[i];

            if (isRange(board, nx, ny)
                && !isAlreadyVisit(visitArr, nx, ny)
                && isNextWord(board, word.charAt(wordIdxToFind), nx, ny)) {
                if (solve(board, word,
                          visitArr,
                          nx, ny,
                          Direction.getDirection(i),
                          wordIdxToFind + 1,
                          str + board[nx][ny])) {
                    return true;
                }
            }
        }
        visitArr[x][y] = false;
        return false;
    }

    private boolean isAlreadyVisit(boolean[][] visitArr, int nx, int ny) {
        return visitArr[nx][ny];
    }

    private boolean isRange(char[][] board, int nx, int ny) {
        int xLength = board.length;
        int yLength = board[0].length;
        return nx >= 0 && nx < xLength && ny >= 0 && ny < yLength;
    }

    private boolean isNextWord(char[][] board, char word, int nx, int ny) {
        return word == board[nx][ny];
    }

    enum Direction {
        LEFT(0),
        RIGHT(1),
        UP(2),
        DOWN(3);

        int code;

        Direction(int code) {
            this.code = code;
        }

        public static Direction getDirection(int code) {
            return Arrays.stream(values())
                         .filter(i -> i.getCode() == code)
                         .findFirst()
                         .get();
        }

        private int getCode() {
            return this.code;
        }

        public int getReverseDirection() {
            switch (this.code) {
                case 0:
                    return RIGHT.code;
                case 1:
                    return LEFT.code;
                case 2:
                    return DOWN.code;
                case 3:
                    return UP.code;
                default:
                    return -1;
            }
        }
    }
}
```

> Check Point

1. 동일 cell은 1번만 사용 가능

2. m과 n을 보면 n^2 가능

---

> Algorithm Description

* 구현 문제였다.

  따로 설명할 부분은 없고 DFS 방식으로 원하는 답을 찾아 여행을 떠나요 ~ 

---

## Reference

* [79. Word Search](https://leetcode.com/problems/word-search/)