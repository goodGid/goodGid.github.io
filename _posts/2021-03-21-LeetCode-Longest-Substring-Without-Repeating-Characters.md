---
layout: post
title:  " LeetCode : 3. Longest Substring Without Repeating Characters "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

## Problem

```
Given a string s, find the length of the longest substring without repeating characters.
```





---

## Example

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

---

## [1] Code (21. 03. 21)

``` java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        
        Set<Character> set = new HashSet<>();
        
        int l = 0;
        int r = 0;
        int ans = 0;
        
        while (r <s.length()){
            if (set.contains(s.charAt(r))){
                set.remove(s.charAt(l));
                l++;
            } else {
                set.add(s.charAt(r));
                ans = Math.max(ans, r-l+1);
                r++;
            }
        }       
        return ans;        
    }
}
```

> Algorithm Description

* 2 Pointer

```
left와 right를 사용

right가 움직일 때
Set에 해당하는 char가 존재하면
left를 오른쪽으로 이동시켰다.
그와 동시에 set에서 제거를 해주었다.
```

---

> Review

* 무난했던 문제



---

## Reference

* [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)