---
layout: post
title: " LeetCode : 1461. Check If a String Contains All Binary Codes of Size K "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1461. Check If a String Contains All Binary Codes of Size K](https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/)

### Problem

```
Given a binary string s and an integer k, return true if every binary code of length k is a substring of s. Otherwise, return false.
```


---

### Example

```
Input: s = "00110110", k = 2
Output: true
```

---

### [1] Code (23. 02. 05)

*Need to Retry -> 시간 초과 발생으로 인한 포기*

``` java
// Time Limit Exceeded
// Ref : https://leetcode.com/submissions/detail/891737371
class Solution {
    private HashSet<String> kSubStringSet = new HashSet<>();
    private HashSet<String> sSubStringSet = new HashSet<>();

    public boolean hasAllCodes(String s, int k) {
        initializeSet(k, new StringBuffer());

//        for (int i = k; i <= s.length(); i++) {
//            String subString = s.substring(i - k, i);
//            sSubStringSet.add(subString);
//        }

        for (String subString : kSubStringSet) {
            if (!s.contains(subString)) {
                return false;
            }
        }
        return true;
    }

    private void initializeSet(int k, StringBuffer sb) {
        if (sb.toString().length() == k) {
            kSubStringSet.add(sb.toString());
            return;
        }

        for (int i = 0; i < 2; i++) {
            sb.append(i);
            initializeSet(k, sb);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
```

* 시간 초과 발생... ㅠㅠ

* 처음엔 [k와 s의 subString을 다 구하는 방식](https://leetcode.com/submissions/detail/891736474/)으로 했는데 시간 초과가 떠서

  k의 subString만 구하는 방식으로 변경했는데도 시간 초과가 발생한다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 151 ms
// Memory Usage: 71.6 MB
// Ref : https://leetcode.com/submissions/detail/892051395
class Solution {
    public boolean hasAllCodes(String s, int k) {
        int need = 1 << k;
        Set<String> got = new HashSet<String>();

        for (int i = k; i <= s.length(); i++) {
            String a = s.substring(i - k, i);
            if (!got.contains(a)) {
                got.add(a);
                need--;
                // return true when found all occurrences
                if (need == 0) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

* 코드에 대한 설명은 [Solution](https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/solution)을 참고하자.

---

> Review

* 시간 초과를 발생시켰던 

  k의 subString을 구하는 방법으로
  
  재귀 함수 방식이 아니라

  shift 연산을 사용하여 구할 수 있었다.


---

## Reference

* [1461. Check If a String Contains All Binary Codes of Size K](https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/)