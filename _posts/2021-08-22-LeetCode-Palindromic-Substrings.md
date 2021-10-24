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

---

> Reference Code

* [이성온님 Code](https://github.com/so3500/problem-solving/blob/81b158823d633e6b4b647f267c63d5199cb503a1/src/main/java/leetcode/LC_647_PalindromicSubstrings.java)

* [강상우님 Code](https://github.com/sangwoo0727/LeetCode/blob/main/palindromic-substrings/palindromic-substrings.java)

* [이상도님 Code](https://github.com/sangdo913/leetcode/blob/main/palindromic-substrings/palindromic-substrings.kt)

---

> Review

* 다양한 접근 방법이 있어서 다른 분들의 코드를 보는 데 시간이 오래 걸렸다.

  Palindrom은 잘 알려진 문제이지만 볼 때마다 새롭다.

---

### [2] Code (21. 10. 24)

*Need to Retry -> 만족스럽지 못한 나의 풀이*

``` java
class Solution {
    public int countSubstrings(String input) {
        List<String> ans = new ArrayList<>();
        for (int i = 0; i < input.length(); i++) {
            go(input, "", ans, i);
        }

        return ans.size();
    }

    private void go(String input, String s, List<String> ans, int idx) {
        if (input.length() == idx) {
            if (isPalindrom(s)) {
                ans.add(s);
            }
            return;
        }

        if (isPalindrom(s)) {
            ans.add(s);
        }

        go(input, s + input.charAt(idx), ans, idx + 1);

    }

    private boolean isPalindrom(String s) {
        if (s.equals("")) {
            return false;
        }

        int left = 0;
        int right = s.length() - 1;

        while (left <= right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

> Concern Point

**String의 equals( ) 철자**

``` java
equlas 철차를 제대로 몰라서 컴파일 에러 발생
```

<br>

**String에서 특정 Index의 값 가져오는 방법**

``` java
string.charAt( )
```

<br>

**String의 길이를 구하는 메소드 사용법**

``` java
string.length( )
// length인지 length( )인지 자꾸 헷갈린다 -ㅂ-
```

---


> Reference Code

* [이성온님 Code](https://github.com/so3500/problem-solving/blob/81b158823d633e6b4b647f267c63d5199cb503a1/src/main/java/leetcode/LC_647_PalindromicSubstrings.java)

* [강상우님 Code](https://github.com/sangwoo0727/LeetCode/blob/main/palindromic-substrings/palindromic-substrings.java)

* [이상도님 Code](https://github.com/sangdo913/leetcode/blob/main/palindromic-substrings/palindromic-substrings.kt)

---

> FeedBack

* 매우 많은 부분에서 막혔다.

  여러가지로 기본기가 부족함을 많이 느끼게 해준 문제이다.

---

> Review

* 30분 소요

* 스스로 힘으로 맞아서 기쁘나 시간/공간 복잡도가 굉장히 안 좋다.

  다시 풀어보도록 하자 !


---

## Reference

* [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)