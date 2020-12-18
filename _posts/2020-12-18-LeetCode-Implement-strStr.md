---
layout: post
title:  " LeetCode : 28. Implement strStr() "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [28. Implement strStr()](https://leetcode.com/problems/implement-strstr/)

### Problem

```
Implement strStr().
Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Clarification:
What should we return when needle is an empty string? This is a great question to ask during an interview.
For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().
```





---

### Example

```
Input: haystack = "hello", needle = "ll"
Output: 2
```

---

### [1] Code (20. 12. 18)

``` java
class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.equals("")) {
            return 0;
        }

        if (!haystack.contains(needle)) {
            return -1;
        }

        for (int i = 0; i < haystack.length(); i++) {
            if (haystack.charAt(i) == needle.charAt(0)) {

                boolean isContain = true;
                for (int j = 0; j < needle.length(); j++) {
                    if (haystack.charAt(i + j) != needle.charAt(j)) {
                        isContain = false;
                        break;
                    }
                }

                if (isContain) {
                    return i;
                }
            }
        }

        return -1;
    }
}
```

* 하나하나씩 찾는다. 

  끝


---

### [2] Code (20. 12. 18)

``` java
class Solution {
    public int strStr(String haystack, String needle) {
        int len = needle.length();
        
        for (int i = 0; i < haystack.length() - len + 1; i++) {
            String s = haystack.substring(i, i + len);

            if (s.equals(needle)) {
                return i;
            }
        }     
        return -1;
    }
}
```

* haystack을 needle의 length만큼 substring해서 비교하는 아이디어도 있었다.


---


### [3] Code (20. 12. 18)

``` java
class Solution {
    public int strStr(String haystack, String needle) {
        int idx = 0;

        if (needle.length() == 0) {
            return 0;
        }

        idx = haystack.indexOf(needle, 0);

        return idx;
    }
}
```

* **.indexOf()** 메소드를 사용하면 해당 index를 바로 알 수 있다.




---

## Reference

* [28. Implement strStr()](https://leetcode.com/problems/implement-strstr/)