---
layout: post
title:  " LeetCode : 5. Longest Palindromic Substring "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

### Problem

```
Given a string s, return the longest palindromic substring in s.
```


---

### Example

```
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

---

### [1] Code (22. 02. 15)

*Need to Retry -> 다른 아이디어가 좋았다.*

``` java
// Runtime: 450 ms
// Memory Usage: 52 MB
// Ref : https://leetcode.com/submissions/detail/641295125/
class Solution {
    public String longestPalindrome(String s) {
        String ans = "";
        int size = s.length();

        int[][] dp = new int[size][size];

        for (int i = 0; i < size; i++) {
            dp[i][i] = 1;
            ans = s.charAt(i) + ""; // ans가 String 타입이라 강제로 String 처리를 해줬다.
        }

        for (int i = 1; i < size; i++) {
            if (s.charAt(i - 1) == s.charAt(i)) {
                dp[i - 1][i] = 1;
                ans = s.substring(i - 1, i + 1);
            } else {
                dp[i - 1][i] = 0;
            }
        }

        for (int i = 2; i < size; i++) {
            for (int j = i; j < size; j++) {
                if (s.charAt(j - i) == s.charAt(j) && dp[j - i + 1][j - 1] == 1) {
                    dp[j - i][j] = 1;
                    ans = s.substring(j - i, j + 1);
                } else {
                    dp[j - i][j] = 0;
                }
            }
        }
        return ans;
    }
}
```

* Runtime이 오래 걸렸다.

  아무래도 문제에서 요구했던 접근 방법이 아니었던 거 같다.

* 또한 정답 코드들을 봐도 위 접근 방법이 보이진 않았다.

---

> Algorithm Description

* i와 i+1이 Palindromic인지 본다.

  그리고 [i-1 ~ i+2]이 Palindromic 인 지 확인을 할 때

  [i ~ i+1]이 Palindromic인 지 체크 && i-1과 i+2가 같은 값인지 본다.

* 이런 식으로 DP 값을 활용하여 최종적인 값을 구한다.

---

> Reference Code

``` java
// Runtime: 22 ms
// Memory Usage: 38.9 MB
// Ref : https://leetcode.com/submissions/detail/465148896/
class Solution {
    int index, maxLen;

    public String longestPalindrome(String s) {
        int len = s.length();
        if (len < 2) {
            return s;
        }

        for (int i = 0; i < len - 1; i++) {
            find(s, i, i);
            find(s, i, i + 1);
        }
        return s.substring(index, index + maxLen);
    }

    public void find(String s, int i, int j) {
        while (i >= 0 && j < s.length() && s.charAt(i) == s.charAt(j)) {
            i--;
            j++;
        }
        if (maxLen < j - i - 1) {
            index = i + 1;
            maxLen = j - i - 1;
        }
    }
}
```

* 나의 풀이보다 효율성이 좋다.

  위 코드에 대한 설명은 [블로그](https://haningya.tistory.com/111)를 참고하자.
  

---

## Reference

* [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
