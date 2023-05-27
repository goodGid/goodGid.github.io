---
layout: post
title: " LeetCode : 374. Guess Number Higher or Lower "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [374. Guess Number Higher or Lower](https://leetcode.com/problems/guess-number-higher-or-lower)

### Problem

```
We are playing the Guess Game. The game is as follows:
I pick a number from 1 to n. You have to guess which number I picked.
Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.
You call a pre-defined API int guess(int num), which returns three possible results:
    -1: Your guess is higher than the number I picked (i.e. num > pick).
    1: Your guess is lower than the number I picked (i.e. num < pick).
    0: your guess is equal to the number I picked (i.e. num == pick).
Return the number that I picked.
```


---

### Example

```
Input: n = 10, pick = 6
Output: 6
```

---

### [1] Code (23. 05. 27) (X)

``` java
// Runtime: 0 ms
// Memory Usage: 39.1 MB
// Ref : https://leetcode.com/submissions/detail/958216373
public class Solution extends GuessGame { // [1]
    public int guessNumber(int n) {
        int l = 1;
        int r = n;
        int m;

        int ans = 0;
        while (l <= r) {
            m = l + (r - l) / 2;
            int result = guess(m);
            if (result == -1) {
                r = m - 1;
            } else if (result == 1) {
                l = m + 1;
            } else {
                ans = m;
                break;
            }
        }

        return ans;
    }
}
```

* [1] : Solution 클래스 GuessGame를 extends 하고 있다.

  GuessGame 클래스에는 guess( )가 존재한다.

---

> Review

* 이런 유형의 문제는 처음 풀어봤는데 굉장히 어색하다.


---

## Reference

* [374. Guess Number Higher or Lower](https://leetcode.com/problems/guess-number-higher-or-lower)