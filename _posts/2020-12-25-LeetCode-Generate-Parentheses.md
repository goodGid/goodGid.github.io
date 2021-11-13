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

### [3] Code (21. 08. 07)

``` java
class Solution {

    int left_cnt;
    int right_cnt;
    List<String> ansList = new ArrayList<>();

    public List<String> generateParenthesis(int n) {

        List<String> ansCandidate = new ArrayList<>();
        solve(ansCandidate, n);
        return ansList;
    }

    private void solve(List<String> ansCandidate, int n) {
        if (ansCandidate.size() == n * 2) {

            StringBuilder sb = new StringBuilder();
            for (String s : ansCandidate) {
                sb.append(s);
            }
            ansList.add(sb.toString());
            return;
        }

        if (left_cnt < n) {
            ansCandidate.add("(");
            left_cnt++;
            solve(ansCandidate, n);
            ansCandidate.remove(ansCandidate.size() - 1);
            left_cnt--;
        }

        if (left_cnt >= right_cnt + 1) {
            ansCandidate.add(")");
            right_cnt++;
            solve(ansCandidate, n);
            ansCandidate.remove(ansCandidate.size() - 1);
            right_cnt--;
        }
    }
}
```

* 처음에 접근할 때 이상한 방법으로 접근해서 시간이 좀 걸렸다.

  아이디어는 2번째 코드와 같다.

* 그리고 스타일이 약간 다르지만 봐두면 좋을만한 코드를 봤다.

``` java
class Solution {

    List<String> ansList = new ArrayList<>();

    public List<String> generateParenthesis(int n) {
        solve(new StringBuilder(), n, 0, 0);
        return ansList;
    }

    private void solve(StringBuilder sb, int n, int open, int close) { // [1]
        if (sb.length() == n * 2) {
            ansList.add(sb.toString());
            return;
        }

        if (open < n) {
            sb.append("(");
            solve(sb, n, open + 1, close);
            sb.deleteCharAt(sb.length() - 1); // [2]
        }

        if (open > close) {
            sb.append(")");
            solve(sb, n, open, close + 1);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}
```

* [1] : left_cnt, right_cnt 변수를 전역으로 설정할 필요 없이

  메소드 인자로도 충분히 같은 Role을 할 수 있다.

* [2] : StringBuilder에 deleteCharAt( )라는 메소드를 처음 봤다.

---

### [4] Code (21. 10. 04) (x)

*Need to Retry --> 다시 풀 필요는 없고 StringBuilder에 deleteCharAt( ) 메소드만 참고하자.*

``` java
class Solution {
    private String left = "(";
    private String right = ")";
    List<String> answer = new ArrayList<>();

    public List<String> generateParenthesis(int n) {
        go(n, new ArrayList<>(), 0, 0);
        return answer;
    }

    private void go(int n, List<String> ans, int lc, int rc) {
        if (ans.size() == n * 2) {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < ans.size(); i++) {
                sb.append(ans.get(i));
            }
            answer.add(sb.toString());
            return;
        }

        if (lc < rc) {
            return;
        }

        if (lc < n) {
            ans.add(left);
            go(n, ans, lc + 1, rc);
            ans.remove(ans.size() - 1);
        }

        ans.add(right);
        go(n, ans, lc, rc + 1);
        ans.remove(ans.size() - 1);

    }
}
```

> Concern Point

* List<String> 값을 String 값으로 어떻게 뽑아내지?

``` java
- StringBuilder 사용
```

---

* List<String>에서 특정 index의 값을 어떻게 가져오지?

``` java
list.get(index)
```

---

> FeedBack

* 12분 소요


---

## Reference

* [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)