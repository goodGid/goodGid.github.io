---
layout: post
title:  " LeetCode : 150. Evaluate Reverse Polish Notation "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [150. Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

### Problem

```
Evaluate the value of an arithmetic expression in Reverse Polish Notation.
Valid operators are +, -, *, /. Each operand may be an integer or another expression.
```





---

### Example

```
Input: ["4", "13", "5", "/", "+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
```

---

### [1] Code (21. 02. 08)

``` java
class Solution {
    public int evalRPN(String[] tokens) {

        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < tokens.length; i++) {
            if (isDigit(tokens[i])) {
                stack.push(getIntegerValue(tokens[i]));
            } else if (tokens[i].equals("+")) {
                stack.push(stack.pop() + stack.pop());
            } else if (tokens[i].equals("-")) { // [3]
                int first = stack.pop();
                int second = stack.pop();
                stack.push(second - first);
            } else if (tokens[i].equals("*")) {
                stack.push(stack.pop() * stack.pop());
            } else if (tokens[i].equals("/")) { // [3]
                int first = stack.pop();
                int second = stack.pop();
                int result = second / first;
                stack.push(result);
            }
        }
        return stack.pop();
    }

    private boolean isDigit(String s) {
        return !(s.equals("+") || s.equals("-") || s.equals("*") || s.equals("/"));
    }

    // [1]
    private Integer getIntegerValue(String s) {

        // Integer 내장 메소드
        // Integer.valueOf(s);

        // 직접 구현
        int isNegative = 1;
        if (s.charAt(0) == '-') { // [2]
            s = s.substring(1);
            isNegative = -1;
        }

        int value = 0;

        for (int i = 0; i < s.length(); i++) {
            value = (value * 10) + (s.charAt(i) - '0');
        }
        return isNegative * value;
    }
}
```

> Check Point

1. 1개의 String을 int 값으로 변환하는 방법

2. getIntegerValue( )에서 음수로 들어오는 경우

3. '-'와 '/'일 경우 적용시키는 값의 순서

* [1] : Integer의 내장 메소드 혹은 직접 구현해서 값을 구할 수 있다.

* [2] : 음수일 경우 substring으로 음수 자리를 없애준다.

---

## Reference

* [150. Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)