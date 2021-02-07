---
layout: post
title:  " LeetCode : 227. Basic Calculator II "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [227. Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/)

### Problem

* Need to Retry

```
Given a string s which represents an expression, evaluate this expression and return its value. 
The integer division should truncate toward zero.
```





---

### Example

```
Input: s = " 3+5 / 2 "
Output: 5
```

---

### [1] Code (21. 02. 07)

``` java
public int calculate(String s) {
    long ans = 0L;

    Stack<Long> valueStack = new Stack<>();

    s = s.replaceAll(" ", "").toLowerCase(); // [1]
    char[] chars = s.toCharArray();

    char operation = '+';
    Long curValue = 0L;
    for (int i = 0; i < chars.length; i++) {

        if (48 <= chars[i] && chars[i] <= 57) { // [2-1]
            curValue = (curValue * 10) + (chars[i] - '0'); // [3]
        }

        if (i == chars.length - 1
            || !('0' <= chars[i] && chars[i] <= '9')) { // [2-2]

            if (operation == '+') {
                valueStack.push(curValue);
            } else if (operation == '-') {
                valueStack.push(-curValue);
            } else if (operation == '*') {
                valueStack.push(valueStack.pop() * curValue);
            } else if (operation == '/') {
                valueStack.push(valueStack.pop() / curValue);
            }

            operation = chars[i];
            curValue = 0L;
        }
    }

    while (!valueStack.isEmpty()) {
        ans += valueStack.pop();
    }
    return (int) ans;
}
```

* 구현하는 데 있어 몇 가지 포인트가 있었다.

1. 공백 처리

2. char 값 비교

3. n 자릿수 처리

4. 사칙연산의 우선순위

* [1] : 공백 처리는 string의 repalc 메서드를 사용했다.

* [2-1], [2-2] : int 값으로 비교 혹은 char 형으로 비교할 수 있다.

* [3] : n 자릿수는 기존의 값에 * 10을 하여서 자릿수 표현을 할 수 있었다.

* 아이디어의 접근은 다음과 같았다.

* 처음에 operation은 +로 설정 후

  다음 operation이 나오면 이전에 operation을 사용해 계산한다.


---

## Reference

* [227. Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/)