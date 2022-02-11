---
layout: post
title:  " LeetCode : 3. Longest Substring Without Repeating Characters "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

### Problem

```
Given a string s, find the length of the longest substring without repeating characters.
```





---

### Example

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

---

### [1] Code (21. 03. 21)

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

### [2] Code (22. 02. 11) (x)

``` java
// Runtime: 16 ms
// Memory Usage: 44.6 MB
// Ref : https://leetcode.com/submissions/detail/639287953/
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int l = 0;
        int r = 0;
        int ans = 0;
        Map<Character, Integer> map = new HashMap<>();

        while (r < s.length()) {

          if (map.getOrDefault(s.charAt(r), 0) > 0) {
                map.put(s.charAt(l), Math.max(0, map.getOrDefault(l, 0) - 1));
                l++;
            } else {
                ans = Math.max(ans, (r - l + 1));
                map.put(s.charAt(r), map.getOrDefault(s.charAt(r), 0) + 1);
                r++;
            }
        }

        return ans;
    }
}
```

---

> Review

* 2 포인터로 접근하여 풀었다.

* 이런 유형의 문제는 항상 제출하기 전에 불안하다.


---

## Reference

* [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)