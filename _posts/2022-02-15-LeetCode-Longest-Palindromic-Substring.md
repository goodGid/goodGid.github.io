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

*Need to Retry -> Palindromic 유형 문제 관련해서 Reference Code 아이디어를 기억해두자.*

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

### [2] Code (22. 03. 26)

*Need to Retry -> 도전했으나 실패...*

``` java
// Ref : https://leetcode.com/submissions/detail/667601387
class Solution {
    public String longestPalindrome(String s) {
        int size = s.length();
        int l = 0;
        int r = 0;
        int max = 0;
        String ans = null;

        Set<Character> set = new HashSet<>();

        while (r < size) {
            char head = s.charAt(r);
            if (l == r) {
                if (max < 1) {
                    max = 1;
                    ans = head + "";
                }
                set.add(head);
                r++;
                continue;
            }

            if (set.contains(head)) {
                String subS = s.substring(l, r + 1);
                if (isPal(subS)) {
                    r++;
                    if (max < subS.length()) {
                        max = subS.length();
                        ans = subS;
                    }
                } else {
                    set.remove(s.charAt(l));
                    l++;
                }
            } else {
                set.add(head);
                r++;
            }
        }

        return ans;
    }

    private boolean isPal(String s) {
        int size = s.length();

        int l = 0;
        int r = size - 1;

        while (l <= r) {
            char leftChar = s.charAt(l);
            char rightChar = s.charAt(r);

            if (leftChar == rightChar) {
                l++;
                r--;
            } else {
                return false;
            }
        }
        return true;
    }
}
```

---

> Algorithm Description

```
- 좌/우 index가 같으면 우측++
- 우측이 범위를 벗어나면 종료
- 우측에 중복 값이 O -> 계산 -> 조건 충족 O -> 우측 ++
- 우측에 중복 값이 O -> 계산 -> 조건 충족 X -> 좌측 ++
- 우측에 중복 값이 X -> 우측 ++
```

* 중복 값 체크는 Set 자료구조를 사용

---

> Wrong Reason

* "abcba" 케이스에 대해서 "bcb"만 출력을 하였다.

---

> Reference Code

* [[1] Code -> Reference Code]({{site.url}}/LeetCode-Longest-Palindromic-Substring/#1-code-22-02-15)를 참고하자.

---

> Review

* Palindromic 유형에 대한 솔루션 코드를 잘 숙지하자 !


---

## Reference

* [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
