---
layout: post
title:  " LeetCode : 138. Copy List with Random Pointer "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer)

### Problem

```
A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.
```


---

### Example

```
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
```

---

### [1] Code (22. 06. 05)

*Need to Retry -> 못풀었다. 어렵다.*

``` java
n/a 
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 0 ms
// Memory Usage: 38.2 MB
// Ref : https://leetcode.com/submissions/detail/452646103
class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) {
            return null;
        }

        Node cur = head;

        while (cur != null) {
            Node next = cur.next;
            Node copyNode = new Node(cur.val);
            copyNode.next = next;
            cur.next = copyNode;
            cur = next;
        }

        cur = head;
        while (cur != null) {
            Node copyNode = cur.next;
            if (cur.random != null) {
                copyNode.random = cur.random.next;
            }
            cur = cur.next.next;
        }

        cur = head;
        Node answer = head.next;
        Node copyNode;
        while (cur != null) {
            Node nextNode = cur.next.next;
            copyNode = cur.next;

            cur.next = nextNode;
            if (nextNode != null) {
                copyNode.next = nextNode.next;
            }
            cur = nextNode;
        }

        return answer;
    }
}
```

---

> Review

* 어렵다. 어렵다. 어렵다.

---

## Reference

* [138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer)