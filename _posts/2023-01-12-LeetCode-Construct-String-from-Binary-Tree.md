---
layout: post
title: " LeetCode : 606. Construct String from Binary Tree "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [606. Construct String from Binary Tree](https://leetcode.com/problems/construct-string-from-binary-tree/)

### Problem

```
Given the root of a binary tree, construct a string consisting of parenthesis and integers from a binary tree with the preorder traversal way, and return it.
Omit all the empty parenthesis pairs that do not affect the one-to-one mapping relationship between the string and the original binary tree.
```


---

### Example

```
Input: root = [1,2,3,4]
Output: "1(2(4))(3)"
Explanation: Originally, it needs to be "1(2(4)())(3()())", but you need to omit all the unnecessary empty parenthesis pairs. And it will be "1(2(4))(3)"
```

---

### [1] Code (23. 01. 12) (x)

``` java
// Runtime : 6 ms
// Memory Usage : 42.3 MB
// Ref : https://leetcode.com/submissions/detail/876182373/
class Solution {
    private final String LEFT = "(";
    private final String RIGHT = ")";

    public String tree2str(TreeNode root) {
        if (root == null) {
            return null;
        }

        StringBuilder sb = new StringBuilder(String.valueOf(root.val));

        TreeNode leftNode = root.left;
        TreeNode rightNode = root.right;

        if (leftNode != null && rightNode != null) {
            sb.append(LEFT);
            sb.append(tree2str(leftNode));
            sb.append(RIGHT);
            sb.append(LEFT);
            sb.append(tree2str(rightNode));
            sb.append(RIGHT);
        } else if (leftNode != null && rightNode == null) {
            sb.append(LEFT);
            sb.append(tree2str(leftNode));
            sb.append(RIGHT);
        } else if (leftNode == null && rightNode != null) {
            sb.append(LEFT);
            sb.append(RIGHT);
            sb.append(LEFT);
            sb.append(tree2str(rightNode));
            sb.append(RIGHT);
        } else if (leftNode == null && rightNode == null) {
            // Nothing
        }

        return sb.toString();
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 13 ms
// Memory Usage: 43 MB
// Ref : https://leetcode.com/submissions/detail/876186438/
public class Solution {
    public String tree2str(TreeNode t) {
        if (t == null)
            return "";
        Stack < TreeNode > stack = new Stack < > ();
        stack.push(t);
        Set < TreeNode > visited = new HashSet < > ();
        StringBuilder s = new StringBuilder();
        while (!stack.isEmpty()) {
            t = stack.peek();
            if (visited.contains(t)) {
                stack.pop();
                s.append(")");
            } else {
                visited.add(t);
                s.append("(" + t.val);
                if (t.left == null && t.right != null)
                    s.append("()");
                if (t.right != null)
                    stack.push(t.right);
                if (t.left != null)
                    stack.push(t.left);
            }
        }
        return s.substring(1, s.length() - 1);
    }
}
```

* Stack을 사용한 풀이

---

> Review

* 11분 소요

---

## Reference

* [606. Construct String from Binary Tree](https://leetcode.com/problems/construct-string-from-binary-tree/)