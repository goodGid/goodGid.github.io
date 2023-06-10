---
layout: post
title: " LeetCode : 1189. Maximum Number of Balloons "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1189. Maximum Number of Balloons](https://leetcode.com/problems/maximum-number-of-balloons)

### Problem

```
Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.
You can use each character in text at most once. Return the maximum number of instances that can be formed.
```


---

### Example

```
Input: text = "loonbalxballpoon"
Output: 2
```

---

### [1] Code (23. 06. 10) (x)

``` java
// Runtime: 1 ms
// Memory Usage: 41.3 MB
// Ref : https://leetcode.com/submissions/detail/968079668
class Solution {
    public int maxNumberOfBalloons(String text) {
        int[] cs = new int[26];
        char pivot = 'a';

        for (char c : text.toCharArray()) {
            cs[c - pivot]++;
        }

        int ans = 0;
        while (cs['b' - pivot] > 0
               && cs['a' - pivot] > 0
               && cs['l' - pivot] > 1
               && cs['o' - pivot] > 1
               && cs['n' - pivot] > 0) {
            ans++;
            cs['b' - pivot]--;
            cs['a' - pivot]--;
            cs['l' - pivot] -= 2;
            cs['o' - pivot] -= 2;
            cs['n' - pivot]--;
        }
        return ans;
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 3 ms
// Memory Usage: 40.7 MB
// Ref : https://leetcode.com/submissions/detail/968086118
class Solution {
    public int maxNumberOfBalloons(String text) {
        int[] count = new int[26];
        for (int i = 0; i < text.length(); i++) {
            count[text.charAt(i) - 'a']++;
        }
        int min = count['b' - 'a'];
        min = Math.min(min, count['a' - 'a']);
        min = Math.min(min, count['l' - 'a'] / 2);
        min = Math.min(min, count['o' - 'a'] / 2);
        min = Math.min(min, count['n' - 'a']);
        return min;
    }
}
```

* Math.min을 사용해서 풀 수도 있다.

---

> Review

* 매우 쉬웠던 문제

  다양한 아이디어를 보면서 이렇게도 풀 수 있구나 학습


---

## Reference

* [1189. Maximum Number of Balloons](https://leetcode.com/problems/maximum-number-of-balloons)