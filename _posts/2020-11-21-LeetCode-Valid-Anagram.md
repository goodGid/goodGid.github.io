---
layout: post
title:  " LeetCode : 242. Valid Anagram "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)

### Problem

```
Given two strings s and t , write a function to determine if t is an anagram of s.
```

---

### Example

```
Input: s = "anagram", t = "nagaram"
Output: true
```



---

### Code (20. 11. 21)

``` java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        char[] s_charArray = s.toCharArray();
        char[] t_charArray = t.toCharArray();

        Arrays.sort(s_charArray);
        Arrays.sort(t_charArray);

        for (int i = 0; i < s_charArray.length; i++) {
            if (s_charArray[i] != t_charArray[i]) {
                return false;
            }
        }

        return true;
    }
}
```

* 자잘한 조건들을 위해 추가되어있는 코드들을

  미리 정의되어 있는 메소드를 사용하면 코드가 더 깔끔해진다.

``` java

class Solution {
    public boolean isAnagram(String s, String t) {
        char[] s_charArray = s.toCharArray();
        char[] t_charArray = t.toCharArray();

        Arrays.sort(s_charArray);
        Arrays.sort(t_charArray);
        
        return Arrays.equals(s_charArray, t_charArray);
    }
}
```


---

## Reference

* [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)

