---
layout: post
title:  " LeetCode : 125. Valid Palindrome "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

### Problem

```
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
Note: For the purpose of this problem, we define empty string as valid palindrome.
```




---

### Example

```
Input: "A man, a plan, a canal: Panama"
Output: true
```
---

### [1] Code (20. 12. 14)

``` java
class Solution {
    public boolean isPalindrome(String input) {
        char[] charArray = input.replaceAll("[^0-9a-zA-Z]", "").toLowerCase().toCharArray();

        int l = 0;
        int r = charArray.length - 1;

        while (l < r) {
            if (charArray[l] != charArray[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

* 체크할 값 세팅을 다 하고 비교를 하는 게 가장 깔끔했다.

  비교를 하면서 조건을 태우려고 하니 복잡성이 너무 높아졌다.

  최대한 Simple 하게 풀어내도록 연습이 필요함을 느꼈다.

---

## Summary

* 위 문제를 풀면서 정규 표현식(Regex)에 대해 정리를 해보았다.

  관련해서는 [[Java] 정규 표현식(Regex)으로 [숫자 / 소문자 / 대문자]를 찾아보자.]({{site.url}}/Regex-Java-Find-Digit-Alphanumeric) 글을 참고하도록 하자.


---

## Reference

* [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)