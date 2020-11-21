---
layout: post
title:  " LeetCode : 171. Excel Sheet Column Number "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [171. Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/)

### Problem

```
Given a column title as appear in an Excel sheet, return its corresponding column number.
```

---

### Example

```
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 

Input: "AB"
Output: 28
```



---

### Code (20. 11. 21)

``` java
class Solution {
    public int titleToNumber(String s) {
        char[] charArray = s.toCharArray();

        int ans = 0;
        int digit = 1;
        for (int i = s.length() - 1; i >= 0; i--) {
            ans += getIntValueBy(charArray[i], digit);
            digit++;
        }
        return ans;
    }

    private int getIntValueBy(char c, int digit) {
        int value = (int) c - 64;

        int defaultValue = 26;
        for (int i = 0; i < digit - 1; i++) {
            defaultValue *= 26;
        }

        return defaultValue * value;
    }
}
```

* 공식 찾는게 관건이였다.

  ex) ABC라면 다음과 같다.

  (26^2)*1 + (26^1)*2 + (26^0)*3

  = 676 + 52 + 3

  = 731

  --> 26^(자릿수-1) * Value

---

## Reference

* [171. Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/)
