---
layout: post
title: " LeetCode : 459. Repeated Substring Pattern "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [459. Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern)

### Problem

```
Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.
```


---

### Example

```
Input: s = "abab"
Output: true
Explanation: It is the substring "ab" twice.
```

---

### [1] Code (23. 10. 08)

*Retry*

``` java
// Runtime: 42 ms
// Memory Usage: 44.2 MB
// Ref : https://leetcode.com/submissions/detail/1067270115
class Solution {
    public boolean repeatedSubstringPattern(String s) {
        int n = s.length();

        for (int i = 1; i <= n/2; i++) {
            String key = s.substring(0, i);
            // System.out.println("key : " + key);
            if (check(n, s, i, key)) {
                return true;
            }
        }
        return false;
    }

    private boolean check(int n, String s, int i, String key) {
         if (n % i != 0) {
             return false;
         }

        for (int idx = i; idx + i <= n; ) {
            String target = s.substring(idx, idx + i);
            // System.out.println("target : " + target);
            idx += i;
            if (!key.equals(target)) {
                return false;
            }
        }
        return true;
    }
}
```

* 깔끔한 구현 능력을 필요로 했던 문제

---

## Reference

* [459. Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern)