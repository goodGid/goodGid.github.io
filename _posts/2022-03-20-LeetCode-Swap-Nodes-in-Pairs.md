---
layout: post
title:  " LeetCode : 24. Swap Nodes in Pairs "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [24. Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs)

### Problem

```
Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)
```


---

### Example

```
Input: head = [1,2,3,4]
Output: [2,1,4,3]
```

---

### [1] Code (22. 03. 20) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 39.9 MB
// Ref : https://leetcode.com/submissions/detail/663391750
class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode temp = new ListNode();
        temp.next = head;
        head = head.next;

        while (temp.next != null && temp.next.next != null) {
            ListNode node1 = temp.next;
            ListNode node2 = temp.next.next;

            node1.next = node2.next;
            node2.next = node1;
            temp.next = node2;
            temp = temp.next.next;
        }
        return head;
    }
}
```

---

> Review

* 25분 소요

  이런 유형의 문제는 꼼꼼하게 코드를 작성하면 풀린다.

---

## Reference

* [24. Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs)