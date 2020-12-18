---
layout: post
title:  " LeetCode : 14. Longest Common Prefix "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)

### Problem

```
Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string ""
```





---

### Example

```
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

---

### [1] Code (20. 12. 18)

``` java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) {
            return "";
        }

        int minSize = strs[0].length();
        String minStr = strs[0];

        for (int i = 1; i < strs.length; i++) {
            if (strs[i].length() < minSize) {
                minSize = strs[i].length();
                minStr = strs[i];
            }
        }

        StringBuilder sb = new StringBuilder();
        char[] chars = minStr.toCharArray();

        for (int i = 0; i < minSize; i++) {
            for (int j = 0; j < strs.length; j++) {
                if (!strs[j].startsWith(String.valueOf(chars[i]), i)) {
                    return sb.toString();
                }
            }
            sb.append(chars[i]);
        }

        return sb.toString();
    }
}
```

* 직관적인 코드

  minStr을 찾는다.

  그리고 minStr을 기준으로 나머지 문자열을 비교해준다.

* 다른 코드들을 보는데 

  **포인터** 느낌으로 접근한 코드가 있어서 정리해본다.

  참고로 언어는 c++이다.

``` c++
class Solution {
    public:
    string longestCommonPrefix(vector<string>&strs) {
        if (strs.size() == 0) { return ""; }
        int l = 0;
        while (true) {
            if (strs[0].size() == l) { return strs[0]; }
            for (int j = 1; j < strs.size(); ++j) {
                if (strs[j].size() == l) { return strs[0].substr(0, l); }
                if (strs[j][l] != strs[0][l]) { return strs[0].substr(0, l); }
            }
            ++l;
        }
        return "";
    }
}
```

* 어렵지 않은 코드이니 

  꼭 이해해보도록 하자 ! 

---

## Reference

* [14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)