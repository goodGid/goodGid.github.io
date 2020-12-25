---
layout: post
title:  " Java로 Palindrome을 구현해보자. "
categories: Java
author: goodGid
---
* content
{:toc}

## Prologue

* Java 언어로 Palindrome를 구현해본다.


## [1] Example Code

* Related Problem : [LeetCode : 22. Generate Parentheses]({{site.url}}/LeetCode-Generate-Parentheses/)

  Avaiable Input Values : ( )

``` java 
public class Main {

    static final Character LEFT = '(';
    static final Character RIGHT = ')';

    static final Map<Character, Character> map = new HashMap<Character, Character>() {
        {
            put(LEFT, RIGHT);
            put(RIGHT, LEFT);
        }
    };

    public static void main(String[] args) {
        String s = "(())())(";
        System.out.println(isPalindrome(s));
    }

    public static boolean isPalindrome(String s) {
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
        return st.isEmpty() && isPalindrome;
    }
}
```




---

## [2] Example Code

* Related Problem : [LeetCode : 20. Valid Parentheses]({{site.url}}/LeetCode-Valid-Parentheses/)

  Avaiable Input Values : ( ) { } [ ]


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

            if (isContain(chars[i], closeList)) { // [1]
                Character pop = stack.pop(); // [2]
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

* [1] : 사실 open 괄호가 아니면 무조건 close 괄호이므로 따로 체크할 필욘 없다.

* [2] : 위험한 코드이다. 

  Stack이 Empty일 경우 Exception이 발생한다.

* 위 코드보다 효율적이면서 안전한 코드를 보자.

``` java
class Solution {
    public boolean isValid(String s) {
        Map<Character, Character> map = Map.of(')', '(', '}', '{', ']', '[');
        Stack<Character> stack = new Stack<>();

        for (Character c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else if (stack.isEmpty() || stack.pop() != map.get(c)) { // [1]
                return false;
            }
        }
        return stack.isEmpty();
    }
}
```

* [1] : if 조건문 체크 순서 중요하다.

  *Check Empty -> Stack.pop()*

