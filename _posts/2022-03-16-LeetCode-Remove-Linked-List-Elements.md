---
layout: post
title:  " LeetCode : 203. Remove Linked List Elements "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [203. Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements)

### Problem

```
Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.
```


---

### Example

```
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]
```

---

### [1] Code (22. 03. 16) (x)

``` java
// Runtime: 1 ms
// Memory Usage: 48.7 MB
// Ref : https://leetcode.com/submissions/detail/661194478
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        while (head != null && head.val == val) {
            head = head.next;
        }

        if (head == null) {
            return null;
        }

        ListNode temp = head;

        while (temp.next != null) {
            ListNode nextNode = temp.next;
            if (nextNode.val == val) {
                temp.next = nextNode.next;
            } else {
                temp = temp.next;
            }
        }
        return head;
    }
}
```

---

> Review

* 5분 소요

  다시 풀 필요 X

---

## Reference

* [203. Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements)