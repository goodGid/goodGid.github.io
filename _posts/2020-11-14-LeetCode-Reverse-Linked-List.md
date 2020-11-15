---
layout: post
title:  " LeetCode : 206. Reverse Linked List "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

### Problem

```
Reverse a singly linked list.
```
 
---

### Example

```
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
```

---

### Code (20. 11. 14)

``` java
public ListNode reverseList(ListNode head) {
    if (head == null) {
        return head;
    }

    ListNode toBeCurrent = head.next;
    ListNode toBePrev = head;
    toBePrev.next = null;

    while (toBeCurrent != null) {
        ListNode temp = toBeCurrent.next;
        toBeCurrent.next = toBePrev;
        toBePrev = toBeCurrent;
        toBeCurrent = temp;
    }

    return toBePrev;
}
```

* 재밌었다.


---

## Reference

* [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
