---
layout: post
title:  " LeetCode : 138. Copy List with Random Pointer "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)

### Problem

* Need to Retry

```
Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.
```





---

### Example

* See the Problem

---

### [1] Code (21. 02. 06)

``` java
class Solution {
    public Node copyRandomList(Node head) {

        HashMap<Node, Node> map = new HashMap<>();

        Node cur = head;
        while (cur != null) {
            map.put(cur, new Node(cur.val));
            cur = cur.next;
        }

        cur = head;
        while (cur != null) {
            map.get(cur).next = map.get(cur.next);
            map.get(cur).random = map.get(cur.random);
            cur = cur.next;
        }

        return map.get(head);
    }
}
```

* 아이디어 싸움인데 졌다.

  심플하면서도 깔끔한 아이디어이다.

* map.get(XXX) = 동일한 값을 갖고 있는 Copied Node 라고 생각하면 된다.

* 마지막에 *return map.get(cur);* 로 제출을 해서 자꾸 뭐가 틀렸지 고민하게 만들었다.

  그냥 실수였다.


---

### [2] Code (21. 02. 06)

``` java
public Node copyRandomList(Node head) {
    if (head == null) { // [1]
        return null;
    }

    // val와 next 값 설정
    Node cur = head;
    while (cur != null) {
        Node next = cur.next;
        Node copyNode = new Node(cur.val);
        copyNode.next = next;
        cur.next = copyNode;
        cur = next;
    }

    // random 값 설정
    cur = head;
    while (cur != null) {
        Node copyNode = cur.next;
        if (cur.random != null) {
            copyNode.random = cur.random.next;
        }
        cur = cur.next.next;
    }

    cur = head;
    Node answer = head.next; // [2]
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
```

* [1] : [1] 코드가 없으면 [2]에서 NPE가 발생한다.

* 아이디어를 이해하는 건 어렵지 않았는데

  직접 구현하는 게 생각보다 오래 걸렸다.

---

### [3] Code (22. 06. 05)

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

* [138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)