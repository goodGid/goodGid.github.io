---
layout: post
title:  " LeetCode : 116. Populating Next Right Pointers in Each Node "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [116. Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node)

### Problem

```
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.
```


---

### Example

```
Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
```

---

### [1] Code (22. 05. 23)

*Need to Retry -> 올바른 아이디어를 못떠올렸다.*

``` java
class Solution {
    public Node connect(Node root) {
        if (root == null) {
            return null;
        }

        Queue<Node> q = new LinkedList<>();
        q.add(root);

        while (!q.isEmpty()) {
            int size = q.size();
            Node prev = new Node();
            for (int i = 0; i < size; i++) {
                Node node = q.poll();
                prev.right = node;
                prev = node;

                if (node.left != null) {
                    q.add(node.left);
                }
                if (node.right != null) {
                    q.add(node.right);
                }
            }
            prev.right = null;
        }

        return root;
    }
}
```

* (220523) 

  TC를 돌리면 틀리는데

  위 로직이 왜 틀린건지 모르겠다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 0 ms
// Memory Usage: 47 MB
// Ref : https://leetcode.com/submissions/detail/704856906
class Solution {
    public Node connect(Node root) {
        if (root == null) {return null;}
        if (root.left != null) {root.left.next = root.right;}
        if (root.right != null && root.next != null) {root.right.next = root.next.left;}
        connect(root.left);
        connect(root.right);
        return root;
    }
}
```

* 문제 [Discuss](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/discuss/962728/Java-0ms-with-visual-explanation) 코드를 참고했다.

---

**Code 2**

``` java
// Runtime: 4 ms
// Memory Usage: 47.3 MB
// Ref : https://leetcode.com/submissions/detail/704860727
class Solution {
    public Node connect(Node root) {
        if (root == null) {
            return null;
        }
        link(root.left, root.right);
        return root;
    }

    public void link(Node left, Node right) {
        if (left == null && right == null) {
            return;
        }
        left.next = right;
        link(left.left, left.right);
        link(left.right, right.left);
        link(right.left, right.right);
    }
}
```

* 문제 [Discuss](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/discuss/37520/Simple-recursive-Java-solution-O(1)-space-O(n)-time) 코드를 참고했다.

---

> Review

* 이런 유형의 문제를 해결하는 다양한 접근법을 배웠다.


---

## Reference

* [116. Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node)