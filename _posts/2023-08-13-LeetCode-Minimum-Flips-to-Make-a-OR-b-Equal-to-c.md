---
layout: post
title: " LeetCode : 1318. Minimum Flips to Make a OR b Equal to c "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1318. Minimum Flips to Make a OR b Equal to c](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c)

### Problem

```
Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation).
Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.
```


---

### Example

```
Input: a = 2, b = 6, c = 5
Output: 3
Explanation: After flips a = 1 , b = 4 , c = 5 such that (a OR b == c)
```

---

### [1] Code (23. 08. 13)

*Need to Retry -> 정답 보고 다시 풀었다.*

``` java
// Runtime: 0 ms
// Memory Usage: 38.9 MB
// Ref : https://leetcode.com/submissions/detail/1020289727
class Solution {
    public int minFlips(int a, int b, int c) {

        int ans = 0;

        while (a != 0 || b != 0 || c != 0) {
            if ((c & 1) == 1) {
                if ((a & 1) == 1 || (b & 1) == 1) {
                    // n/a
                } else {
                    ans += 1;
                }
            } else {
                if ((a & 1) == 1) {
                    ans++;
                }
                if ((b & 1) == 1) {
                    ans++;
                }
            }
            a >>= 1;
            b >>= 1;
            c >>= 1;
        }

        return ans;
    }
}
```

* 재밌는 문제였다.

  DFS로 처음에 생각했었는데 그럴 필요 없이 비트를 갖고 놀았으면 됐다.


---

> Review

* 처음에 아이디어를 못 떠올려서 정답을 보고 다음날 다시 풀었다.

  다시 풀어보려고 할 때 아주 조금 막혔다.

  그래도 수월하게 풀었다.

---

## Reference

* [1318. Minimum Flips to Make a OR b Equal to c](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c)