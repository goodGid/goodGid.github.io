---
layout: post
title:  " LeetCode : 1209. Remove All Adjacent Duplicates in String II "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1209. Remove All Adjacent Duplicates in String II](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii)

### Problem

```
You are given a string s and an integer k, a k duplicate removal consists of choosing k adjacent and equal letters from s and removing them, causing the left and the right side of the deleted substring to concatenate together.

We repeatedly make k duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It is guaranteed that the answer is unique.
```


---

### Example

```
Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
```

---

### [1] Code (22. 06. 01) (x)

``` java
// Runtime: 60 ms
// Memory Usage: 49.9 MB
// Ref : https://leetcode.com/submissions/detail/710102153
class Solution {
    public String removeDuplicates(String s, int k) {
        Stack<Node> st = new Stack<>();

        char[] cArray = s.toCharArray();

        String ans = "";
        for (char c : cArray) {
            if (st.isEmpty()) {
                st.add(new Node(c, 1));
                continue;
            }

            Node node = st.pop();

            if (node.val == c) {
                if (node.dupCnt + 1 == k) {
                    continue;
                } else {
                    node.dupCnt++;
                    st.add(node);
                }
            } else {
                st.add(node);
                st.add(new Node(c, 1));
            }
        }

        StringBuilder sb = new StringBuilder();
        while (!st.isEmpty()) {
            Node node = st.pop();
            for (int i = 0; i < node.dupCnt; i++) {
                sb.append(node.val);
            }
        }

        return sb.reverse().toString(); // [1]
    }

    public class Node {
        public char val;
        public int dupCnt;

        public Node(char val, int dupCnt) {
            this.val = val;
            this.dupCnt = dupCnt;
        }
    }
}
```

* Stack 자료구조가 떠올랐다.

* [1] : StringBuilder에 **reverse( )** 메소드가 있다.

---

> Reference Code

---

> Review

* 10 ~ 15분 소요

  아이디어가 바로 떠올랐다.

---

## Reference

* [1209. Remove All Adjacent Duplicates in String II](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii)