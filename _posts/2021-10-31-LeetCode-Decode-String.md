---
layout: post
title:  " LeetCode : 394. Decode String "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [394. Decode String](https://leetcode.com/problems/decode-string/)

### Problem

```
Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].
```


---

### Example

```
Input: s = "3[a]2[bc]"
Output: "aaabcbc"
```

---

### [1] Code (21. 10. 31)

*Need to Retry -> 다시 풀어보자.*

``` java
n/a
```

> Concern Point

**1. 해당 문자가 숫자 혹은 문자인지 체크하기**

``` java
package java.lang;
public static boolean isDigit(char ch) {
        return isDigit((int)ch);
}
--> Character.isDigit()

public static boolean isAlphabetic(int codePoint) {
    return (((((1 << Character.UPPERCASE_LETTER) |
        (1 << Character.LOWERCASE_LETTER) |
        (1 << Character.TITLECASE_LETTER) |
        (1 << Character.MODIFIER_LETTER) |
        (1 << Character.OTHER_LETTER) |
        (1 << Character.LETTER_NUMBER)) >> getType(codePoint)) & 1) != 0) ||
        CharacterData.of(codePoint).isOtherAlphabetic(codePoint);
}
--> Character.isAlphabetic()
```

* 구현해서 확인해도 되지만 

  java에서 제공하는 메소드를 사용해도 된다.

---

**2. String에서 범위로 잘라내기**

``` java
public String substring(int beginIndex, int endIndex) { ... }
```

* beginIndex부터 포함

  endIndex은 미포함

---

**3. String -> Integer 값 변환**

``` java
// left는 '['인 Index
k = s.charAt(left - 1) // [1]
k = Integer.valueOf(s.charAt(left - 1)) - 48; // [2]
```

* [1]처럼하면 s.charAt(left-1)의 값이 '2'일 경우

  문자 '2'의 [아스키 코드값인 50]({{site.url}}/ASCII-Code/)이 k에 담기게 된다.

  그러므로 숫자 0의 아스키 값인 48을 빼줘야지

  우리가 원하는 2라는 값이 k에 담기게 된다.

---

**4. String에서 k값 파싱하기**

``` java
left = s.lastIndexOf('[');
k = Integer.valueOf(s.charAt(left - 1)) - 48;
```

* 이런 식으로 접근했는데

  만약 K가 2자리 이상일 경우 잘못된 값을 찾게 된다.

  ex) 5[a] => k = 5 (O)

  ex) 10[a] => k = 0 (X)

* 그래서 문자열로 표현된 숫자를 처리하기 위해선

  다음과 같은 방식의 코드를 사용하면 된다.


``` java
// Case 1
for(...) {
    num = num * 10 + c - '0'
}

// Case 2
while (Character.isDigit(str.charAt(k))) {
    num *= 10;
    num += str.charAt(k) - '0';
    k++;
}
```

---

> Reference Code

``` java
class Solution {
    public String decodeString(String s) {
        Deque<Character> que = new LinkedList<>();
        for (char c : s.toCharArray()) {que.offer(c);}
        return decode(que);
    }

    private String decode(Deque<Character> que) {
        StringBuilder sb = new StringBuilder();
        int num = 0;
        while (!que.isEmpty()) {
            char c = que.poll();
            if (Character.isDigit(c)) {
                num = num * 10 + c - '0';
            } else if (c == '[') {
                String sub = decode(que);
                for (int i = 0; i < num; i++) {
                    sb.append(sub);
                }
                num = 0;
            } else if (c == ']') {
                break;
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}
```

---

> Review

* 풀다가 중간에 포기했다.

  아직 구현 능력이 많이 부족한 듯싶다 ㅠㅠ 

---

### [2] Code (21. 12. 25)

*Need to Retry -> Concern Point들이 너무 많았다.*

``` java
// Runtime: 1 ms
// Memory Usage: 37.1 MB
class Solution {
    private char OPEN = '[';
    private char CLOSE = ']';

    public String decodeString(String s) {
        StringBuilder ans = new StringBuilder();

        int head = 0;

        while (s.length() > head) {
            if (Character.isAlphabetic(s.charAt(head))) {
                ans.append(s.charAt(head++));
            } else if (Character.isDigit(s.charAt(head))) {
                int digit = 0;
                while (Character.isDigit(s.charAt(head))) {
                    digit *= 10;
                    digit += s.charAt(head) - 48;
                    head++;
                }

                int startIdx = head + 1;
                int endIdx = findCloseIndex(s);

                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < digit; i++) {
                    sb.append(s, startIdx, endIdx);
                }
                sb.append(s.substring(endIdx + 1));
                s = sb.toString();
                head = 0;
            }
        }

        return ans.toString();
    }

    private int findCloseIndex(String s) {
        int openCnt = 0;
        char[] chars = s.toCharArray();

        for (int i = 0; i < chars.length; i++) {
            if (chars[i] == OPEN) {
                openCnt++;
            } else if (chars[i] == CLOSE) {
                openCnt--;
                if (openCnt == 0) {
                    return i;
                }
            }
        }
        return -1;
    }
}
```

---

> Concern Point

**1. 숫자를 나타내는 Character를 int 값으로 변환**

``` java
char c = '9';
System.out.println(c - 48); // 9 출력
```

---

**2. 주어진 Character가 알파벳인지 숫자인지 체크**

``` java
if (Character.isAlphabetic(s.charAt(head))) { ... }
if (Character.isDigit(s.charAt(head))) { ... }
```
---

**3. String에서 범위로 잘라내기**

``` java
public String substring(int beginIndex, int endIndex) { ... }
```

* beginIndex부터 포함

  endIndex은 미포함

---

> Review

* 40분 소요 + IDE 사용

* *Concern Point*가 처음에 문제 풀었을 때랑

  두번째 풀었을 때랑 100% 일치했다.

  그래도 같은 고민을 두고 이전에는 못 풀었는데

  이번에는 스스로 힘으로 풀었다.

* 다음에는 *Concern Point* 없이 풀어보도록 하자 !



---

## Reference

* [394. Decode String](https://leetcode.com/problems/decode-string/)