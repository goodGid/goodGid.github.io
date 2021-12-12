---
layout: post
title:  " LeetCode : 17. Letter Combinations of a Phone Number "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

### Problem

```
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
```


---

### Example

```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

---

### [1] Code (21. 12. 04) (x)

``` java
class Solution {
    public List<String> letterCombinations(String digits) {
        if (digits.equals("")) {
            return new ArrayList<>();
        }
        List<String> ans = new ArrayList<>();
        go(digits, "", 0, ans);
        return ans;
    }

    private void go(String digits, String s, int idx, List<String> ans) {
        if (idx == digits.length()) {
            ans.add(s);
            return;
        }

        List<String> mappedString = getMappedString(digits.charAt(idx));

        for (int i = 0; i < mappedString.size(); i++) {
            go(digits, s + mappedString.get(i), idx + 1, ans);
        }
    }

    private List<String> getMappedString(char c) {
        if (c == '2') {
            return Arrays.asList("a", "b", "c");
        } else if (c == '3') {
            return Arrays.asList("d", "e", "f");
        } else if (c == '4') {
            return Arrays.asList("g", "h", "i");
        } else if (c == '5') {
            return Arrays.asList("j", "k", "l");
        } else if (c == '6') {
            return Arrays.asList("m", "n", "o");
        } else if (c == '7') {
            return Arrays.asList("p", "q", "r", "s");
        } else if (c == '8') {
            return Arrays.asList("t", "u", "v");
        } else {
            return Arrays.asList("w", "x", "y", "z");
        }
    }

}
```

---

> Concern Point

**[List 선언과 동시에 값 할당]({{site.url}}/Java-Algorithm-Skill-Collection/#list-사용)**

``` java
// 1. JDK 5 이상에서 사용 가능
List<String> list = Arrays.asList("Amsterdam", "Paris", "London");

// 2.
List<String> list = Arrays.asList(new String[] { "a", "b", "c" });

// 3.
List<String> list = new ArrayList<>() {% raw  %}{{ ... }}{% endraw  %} // Compile Error 발생
List<String> list = new ArrayList<String>() {
    { 
        add("A");
        add("B");
        add("C");
    }
};
```

---

**[String에서 i번째 값 읽어오기]({{site.url}}/Java-Algorithm-Skill-Collection/#string-문법)**

``` java
String s = "abc";
System.out.println(s.charAt(0)); // a
```

---

> Review

* 단순 구현 + DFS 문제




---

## Reference

* [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)