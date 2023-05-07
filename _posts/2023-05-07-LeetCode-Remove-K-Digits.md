---
layout: post
title: " LeetCode : 402. Remove K Digits "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [402. Remove K Digits](https://leetcode.com/problems/remove-k-digits)

### Problem

```
Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.
```


---

### Example

```
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
```

---

### [1] Code (23. 05. 07)

*Need to Retry -> 재밌었던 문제, 아이디어 보고 5일 뒤 다시 풀어봄*

``` java
// Runtime: 36 ms
// Memory Usage: 43.9 MB
// Ref : https://leetcode.com/submissions/detail/945967100
class Solution {
    public String removeKdigits(String num, int k) {
        int size = num.length();
        if (size == k) {
            return "0";
        }

        Stack<Character> st = new Stack<>();
        char[] c = num.toCharArray();

        for (int i = 0; i < size; i++) {
            char cur = c[i];

            while (!st.isEmpty() && st.peek() > cur && k != 0) { // [1]
                k--;
                st.pop();
            }
            st.push(cur);
        }

        while (k != 0) {
            k--;
            st.pop();
        }

        StringBuilder sb = new StringBuilder();
        while (!st.isEmpty()) {
            sb.append(st.pop());
        }

        String ans = sb.reverse().toString();

         while (ans.startsWith("0") && ans.length() != 1) { // [2]
             ans = ans.substring(1);
        }
        return ans;
    }
}
```

* [1] : 기존에는 다음과 같이 코드를 작성하였다.

``` java
// AS-IS
st.peek() >= cur
// TO-BE
st.peek() > cur
```

* 그러면 112 와 같은 [input](https://leetcode.com/submissions/detail/945965149)에 대해

  11이 정답이지만 12라는 정답이 나온다.

---

* [2] : 기존에는 다음과 같이 코드를 작성하였다.

``` java
if (ans.startsWith("0") && ans.length() != 1) {
    return ans.substring(1);
}
```

* 그런데 위와 같이 제출하면 [0으로 시작하는 n개의 input](https://leetcode.com/submissions/detail/945966654)이 들어오면 오답을 만들게 된다.

> 코드 개선 포인트

``` java
StringBuilder sb = new StringBuilder();
while(!stack.isEmpty())
    sb.append(stack.pop());
sb.reverse();

while(sb.length()>1 && sb.charAt(0)=='0')
    sb.deleteCharAt(0);
return sb.toString();
```

* StringBuilder의 deleteCharAt( )를 사용하면 

  코드의 가독성을 개선할 수 있다.

---

> Review

* 굉장히 재밌었던 문제였다.

  특히나 **Stack** 자료구조를 이렇게 활용할 수 있구나를 깨닫게 된 문제였다.

---

## Reference

* [402. Remove K Digits](https://leetcode.com/problems/remove-k-digits)