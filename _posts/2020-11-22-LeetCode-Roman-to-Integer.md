---
layout: post
title:  " LeetCode : 13. Roman to Integer "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/)

### Problem

```
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

* 문제가 너무 길기 때문에 [13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/)를 참고하자.

---

### Example

```
Input: s = "III"
Output: 3

```



---

### Code (20. 11. 22)

``` java
class Solution {
    private static final Map<Character, Integer> NUMS = new HashMap<Character, Integer>() {
        {
            put('I', 1);
            put('V', 5);
            put('X', 10);
            put('L', 50);
            put('C', 100);
            put('D', 500);
            put('M', 1000);
        }
    };

    public int romanToInt(String s) {
        int ans = 0;
        int prev = 0;

        for (char c : s.toCharArray()) {
            int value = NUMS.get(c);
            ans = ((value > prev) ? ans - prev + (value - prev) : ans + value);
            prev = value;
        }

        return ans;
    }
}
```

* 그냥 문제 조건대로 푸는 구현 문제

  다만 여기서 챙겨갈 만한 부분은 **NUMS**를 선언하는 부분이다.

  *HashMap 선언 && Data 삽입* 코드는 좋은 코드라고 생각이 든다.

---

## Reference

* [13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/)