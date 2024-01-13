---
layout: post
title: " LeetCode : 3. Longest Substring Without Repeating Characters "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters)

### Problem

```
Given a string s, find the length of the longest substring without repeating characters.
```


---

### Example

```
Input: s = "abcabcbb"
Output: 3
```

---

### [1] Code (24. 01. 13) (x)

``` java
// Runtime: 6 ms
// Memory Usage: 43.6 MB
// Ref : https://leetcode.com/submissions/detail/1139933946
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int ans = 0;
        int len = s.length();
        char[] ch = s.toCharArray();
        Map<Character, Integer> map = new HashMap<>();

        int l = 0;
        int r = -1;

        while (true) {
            r++;
            if (r == len) {
                break;
            }
            char c = ch[r];

            while (map.getOrDefault(c, 0) > 0) {
                int leftVal = map.get(ch[l]);
                map.put(ch[l], leftVal - 1);
                l++;
            }
            map.put(c, 1);
            ans = Math.max(ans, r - l + 1);
        }

        return ans;
    }
}
```

* 2 포인터가 생각났고 무난하게 풀었다.

---

## Reference

* [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters)