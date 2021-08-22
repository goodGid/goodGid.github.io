---
layout: post
title:  " LeetCode : 647. Palindromic Substrings "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

### Problem

```
Given a string s, return the number of palindromic substrings in it.
A string is a palindrome when it reads the same backward as forward.
A substring is a contiguous sequence of characters within the string.
```


---

### Example

```
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
```

---

### [1] Code (21. 08. 22)

*Need to Retry*

``` java
class Solution {

    public int countSubstrings(String s) {
        int ans = 0;
        final char[] chars = s.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            for (int j = i; j < chars.length; j++) {
                if (isPalindrom(chars, i, j)) {
                    ans++;
                }
            }
        }
        return ans;
    }

    private boolean isPalindrom(char[] chars, int st, int end) {
        while (st <= end) {
            if (chars[st] != chars[end]) {
                return false;
            }
            st++;
            end--;
        }
        return true;
    }
}
```

> Algorithm Description

* input의 n값을 보고 $O(N^2)$ 으로 풀어도 되겠구나 싶어서 $O(N^2)$으로 풀었다.

  하지만 이게 베스트는 아니었음은 알고 풀었다.

> FeedBack

> Reference Code

* [이성온님 Code](https://github.com/so3500/problem-solving/blob/81b158823d633e6b4b647f267c63d5199cb503a1/src/main/java/leetcode/LC_647_PalindromicSubstrings.java)

* [강상우님 Code](https://github.com/sangwoo0727/LeetCode/blob/main/palindromic-substrings/palindromic-substrings.java)

* [이상도님 Code](https://github.com/sangdo913/leetcode/blob/main/palindromic-substrings/palindromic-substrings.kt)

> Review

* 다양한 접근 방법이 있어서 다른 분들의 코드를 보는 데 시간이 오래 걸렸다.

  Palindrom은 잘 알려진 문제이지만 볼 때마다 새롭다.


---

## Reference

* [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)