---
layout: post
title:  " LeetCode : 148. Sort List "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [148. Sort List](https://leetcode.com/problems/sort-list)

### Problem

```
Given the head of a linked list, return the list after sorting it in ascending order.
```


---

### Example

```
Input: head = [4,2,1,3]
Output: [1,2,3,4]
```

---

### [1] Code (22. 05. 29)

*Need to Retry -> 여러 번 풀었던 문제인데 또 못 풀었다.*

``` java
n/a
```

---

> Check Point

* Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

---

> Reference Code

**Code 1**

``` java
// Runtime: 6 ms
// Memory Usage: 47.1 MB
// Ref : https://leetcode.com/submissions/detail/465749692
public class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) { return head; }

        // step 1. cut the list to two halves
        ListNode prev = null, slow = head, fast = head;

        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }

        prev.next = null;

        // step 2. sort each half
        ListNode l1 = sortList(head);
        ListNode l2 = sortList(slow);

        // step 3. merge l1 and l2
        return merge(l1, l2);
    }

    ListNode merge(ListNode list1, ListNode list2) {
        ListNode dummyHead = new ListNode(-1);
        ListNode tail = dummyHead;
        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummyHead.next;
    }
}

```

---

> Review

* 어려운 느낌의 문제이다.

  그런데 막상 그렇게 또 어려운 문제는 아니었다.

  문제 보고 기죽지 말자 !

---

## Reference

* [148. Sort List](https://leetcode.com/problems/sort-list)