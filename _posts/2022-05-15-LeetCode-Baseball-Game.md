---
layout: post
title:  " LeetCode : 682. Baseball Game "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [682. Baseball Game](https://leetcode.com/problems/baseball-game)

### Problem

```
You are keeping score for a baseball game with strange rules. The game consists of several rounds, where the scores of past rounds may affect future rounds' scores.

At the beginning of the game, you start with an empty record. You are given a list of strings ops, where ops[i] is the ith operation you must apply to the record and is one of the following:

An integer x - Record a new score of x.
"+" - Record a new score that is the sum of the previous two scores. It is guaranteed there will always be two previous scores.
"D" - Record a new score that is double the previous score. It is guaranteed there will always be a previous score.
"C" - Invalidate the previous score, removing it from the record. It is guaranteed there will always be a previous score.
```


---

### Example

```
Input: ops = ["5","2","C","D","+"]
Output: 30
```

---

### [1] Code (22. 05. 15) (x)

``` java
// Runtime: 4 ms
// Memory Usage: 42.7 MB
// Ref : https://leetcode.com/submissions/detail/700026148
class Solution {
    public int calPoints(String[] ops) {
        List<Integer> list = new ArrayList<>();

        int length = ops.length;
        for (int i = 0; i < length; i++) {
            int size = list.size();
            char[] chars = ops[i].toCharArray();
            char first = chars[0];

            switch (first) {
                case 'C':
                    list.remove(size - 1);
                    break;
                case 'D':
                    list.add(list.get(size - 1) * 2);
                    break;
                case '+':
                    int sum = list.get(size - 1) + list.get(size - 2);
                    list.add(sum);
                    break;
                default: // [1]
                    int flag = 1;
                    int val = 0;
                    for (char c : chars) {
                        if (c == '-') {
                            flag = -1;
                            continue;
                        }
                        val *= 10;
                        val += c - '0';
                    }
                    list.add(val * flag);
                    break;
            }
        }

        int ans = 0;
        for (int i : list) {
            ans += i;
        }
        return ans;
    }
}
```

* 단순 구현 문제

* [1] : String -> Integer로 파싱하는 코드

  ``` java
  Integer.parseInt(ops[i])
  ```

---

> Review

* 10분 소요

  그런데 부분적으로 문법 실수가 있었다.

  String을 다루는 건 언제나 어렵다.

---

## Reference

* [682. Baseball Game](https://leetcode.com/problems/baseball-game)