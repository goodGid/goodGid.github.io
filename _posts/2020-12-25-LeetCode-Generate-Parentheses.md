---
layout: post
title:  " LeetCode : 22. Generate Parentheses "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)

### Problem

```
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
```





---

### Example

```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

---

### [1] Code (20. 12. 25)

``` java
class Solution {
    final Character LEFT = '(';
    final Character RIGHT = ')';

    final Map<Character, Character> map = new HashMap<Character, Character>() {
        {
            put(LEFT, RIGHT);
            put(RIGHT, LEFT);
        }
    };

    List<String> asnList = new LinkedList<>();

    public List<String> generateParenthesis(int n) {
        dfs(n - 1, n, "(");
        return asnList;
    }

    private void dfs(int leftCnt, int rightCnt, String s) {
        if (leftCnt == 0 && rightCnt == 0) {
            isPalindrome(s);
            return;
        }

        if (leftCnt > 0) {
            dfs(leftCnt - 1, rightCnt, append(s, LEFT));
        }

        if (rightCnt > 0) {
            dfs(leftCnt, rightCnt - 1, append(s, RIGHT));
        }
    }

    private boolean isPalindrome(String s) {
        Stack<Character> st = new Stack<>();

        boolean isPalindrome = true;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == LEFT) {
                st.push(s.charAt(i));
            } else {
                if (st.isEmpty()) {
                    isPalindrome = false;
                    break;
                }
                Character topChar = st.pop();
                if (!topChar.equals(map.get(s.charAt(i)))) {
                    isPalindrome = false;
                    break;
                }
            }
        }

        if (st.isEmpty() && isPalindrome) {
            asnList.add(s);
            return true;
        }
        return false;
    }

    private String append(String s, Character value) {
        StringBuilder sb = new StringBuilder(s);
        sb.append(value);
        return sb.toString();
    }
}
```

* 풀어서 맞긴 했다.

  그런데 너무 어렵게 풀었다 -ㅂ-

  풀면서도 내가 어렵게 풀고 있다는 직감이 들긴 했지만 풀었다.

* 아이디어는 간단하다.

  DFS처럼 쭉 간 후 해당 String이 Palindrome 인지 체크한다.

---

### [2] Code (20. 12. 25)

``` java
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        recursive(res, "(", n - 1, n);
        return res;
    }
    
    public void recursive(List<String> res, String s, int open, int close) {
        if (open == 0 && close == 0) {
            res.add(s);
            return;
        }
        
        if (open > 0) {
            recursive(res, s + "(", open - 1, close);
        }
        
        if (close > open) { // [1]
            recursive(res, s + ")", open, close - 1);
        }
    }
}
```

* [1] : close가 open 보다 많다는 건 애초에 문제 조건 충족이 안 된다.

  즉 닫는 괄호가 더 많이 사용되면 균형 잡힌 String이 될 수 없다.

* **굉장히 좋은 아이디어**이다. 꼭 기억해두자!

---

## Reference

* [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)