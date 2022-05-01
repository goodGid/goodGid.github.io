---
layout: post
title:  " LeetCode : 680. Valid Palindrome II "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [680. Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii)

### Problem

```
Given a string s, return true if the s can be palindrome after deleting at most one character from it.
```


---

### Example

```
Input: s = "abca"
Output: true
```

---

### [1] Code (22. 05. 02)

*Need to Retry -> 아이디어는 떠올렸는데 시간복잡도 때문에 틀리지 않을까란 생각에 실패*

``` java
// Runtime: 6 ms
// Memory Usage: 42.6 MB
// Ref : https://leetcode.com/submissions/detail/691007310
class Solution {
    public boolean validPalindrome(String s) {
        return check(s, 0, s.length() - 1, false);
    }

    private boolean check(String s, int l, int r, boolean removed) {
        if (l > r) {
            return true;
        }

        while (l <= r) {
            if (s.charAt(l) == s.charAt(r)) {
                l++;
                r--;
            } else {
                if (removed) {
                    return false;
                }
                break;
            }
        }
        return check(s, l + 1, r, true) || check(s, l, r - 1, true);
    }
}
```

---

> Review

* 처음에 아이디어를 떠올렸는데 시간복잡도에서 터지지 않을까?란 생각 때문에 풀이를 포기했다.

  그래서 정답 코드를 보니 내 아이디어랑 같았다.

  시간 복잡도 계산에 대해 다시 학습해야겠다.

---

## Reference

* [680. Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii)