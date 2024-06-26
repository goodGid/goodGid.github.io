---
layout: post
title:  " LeetCode : 20. Valid Parentheses "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

### Problem

```
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
```





---

### Example

```
Input: s = "()[]{}"
Output: true
```

---

### [1] Code (20. 12. 16)

``` java
class Solution {

    private static final Map<Character, Character> MAPS = new HashMap<Character, Character>() {
        {
            put('{', '}');
            put('[', ']');
            put('(', ')');
            put('}', '{');
            put(']', '[');
            put(')', '(');
        }
    };

    public boolean isValid(String input) {

        char[] chars = input.toCharArray();

        Stack<Character> stack = new Stack<>();

        char[] openList = { '{', '[', '(' };
        char[] closeList = { '}', ']', ')' };

        for (int i = 0; i < chars.length; i++) {
            if (stack.empty() && isContain(chars[i], closeList)) {
                return false;
            }

            if (isContain(chars[i], openList)) {
                stack.push(chars[i]);
            }

            if (isContain(chars[i], closeList)) {
                Character pop = stack.pop();
                if (chars[i] != MAPS.get(pop)) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }

    private boolean isContain(char c, char[] targetList) {
        for (char cc : targetList) {
            if (c == cc) {
                return true;
            }
        }
        return false;
    }
}
```

* 어렵지 않게 풀었다.

  다만 HashMap 선언과 동시에 Data 삽입을 하는 방식으로 하다 보니 코드가 다소 장황해졌다.

``` java
private static final Map<Character, Character> MAPS = new HashMap<Character, Character>() {
        {
            put('{', '}');
            put('[', ']');
            put('(', ')');
            put('}', '{');
            put(']', '[');
            put(')', '(');
        }
    };
```

---

### [2] Code (24. 06. 02)

*Retry*

``` java
// Runtime: 2 ms
// Memory Usage: 37 MB
// Ref : https://leetcode.com/submissions/detail/431285981
class Solution {
    public boolean isValid(String s) {
        Map<Character, Character> map = Map.of(')', '(', '}', '{', ']', '[');
        Stack<Character> stack = new Stack<>();

        for (Character c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else if (stack.isEmpty() || stack.pop() != map.get(c)) {
                return false;
            }
        }

        return stack.isEmpty();
    }
}
```

> Review

* 스무스하게 풀었다.


---

## Reference

* [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)