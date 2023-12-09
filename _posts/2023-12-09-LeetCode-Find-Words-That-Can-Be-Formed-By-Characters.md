---
layout: post
title: " LeetCode : 1160. Find Words That Can Be Formed by Characters "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1160. Find Words That Can Be Formed by Characters](https://leetcode.com/problems/find-words-that-can-be-formed-by-characters)

### Problem

```
You are given an array of strings words and a string chars.
A string is good if it can be formed by characters from chars (each character can only be used once).
Return the sum of lengths of all good strings in words.
```


---

### Example

```
Input: words = ["cat","bt","hat","tree"], chars = "atach"
Output: 6
Explanation: The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.
```

---

### [1] Code (23. 12. 09)

``` java
// Runtime: 6 ms
// Memory Usage: 44.2 MB
// Ref : https://leetcode.com/submissions/detail/1115418854
class Solution {
    public int countCharacters(String[] words, String chars) {
        int ans = 0;
        char[] pivot = new char[26];
        
        for (char c : chars.toCharArray()) {
            pivot[c-'a']++;
        }
        
        for (String s : words) {
            char[] wordsChars = new char[26];
            for (char c : s.toCharArray()) {
                wordsChars[c-'a']++;
            }
            boolean isGood = true;
            for (int i=0; i<26; i++) {
                if (pivot[i] < wordsChars[i]) {
                    isGood = false;
                    break;
                }
            }
            
            if (isGood) {
                ans += s.length();
            }
        }       
        return ans;
    }
}
```

* 어렵지 않았던 문제

  다른 코드를 참고해도 크게 다를게 없었다.


---

## Reference

* [1160. Find Words That Can Be Formed by Characters](https://leetcode.com/problems/find-words-that-can-be-formed-by-characters)