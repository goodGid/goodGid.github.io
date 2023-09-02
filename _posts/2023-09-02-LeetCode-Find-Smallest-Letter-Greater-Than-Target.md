---
layout: post
title: " LeetCode : 744. Find Smallest Letter Greater Than Target "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [744. Find Smallest Letter Greater Than Target](https://leetcode.com/problems/find-smallest-letter-greater-than-target)

### Problem

```
You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.
Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.
```


---

### Example

```
Input: letters = ["c","f","j"], target = "a"
Output: "c"
Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.
```

---

### [1] Code (23. 09. 02) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 44.6 MB
// Ref : https://leetcode.com/submissions/detail/967028243
class Solution {
    public char nextGreatestLetter(char[] letters, char target) {
        for (char c : letters) {
            if (target < c) {
                return c;
            }
        }
        return letters[0];
    }
}
```

* 무난했던 문제

---

## Reference

* [744. Find Smallest Letter Greater Than Target](https://leetcode.com/problems/find-smallest-letter-greater-than-target)