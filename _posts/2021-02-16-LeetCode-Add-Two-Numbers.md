---
layout: post
title:  " LeetCode : 2. Add Two Numbers "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

### Problem

```
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
```





---

### Example

```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

---

### [1] Code (21. 02. 16)

``` java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {

        ListNode head = new ListNode(-1);
        ListNode ans = head;
        int isOver = 0;

        while (l1 != null || l2 != null) {
            int sum = isOver;

            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }

            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }

            if (sum >= 10) {
                isOver = 1;
            } else {
                isOver = 0;
            }

            ListNode node = new ListNode(sum % 10);
            head.next = node;
            head = head.next;
        }

        if (isOver == 1) {
            ListNode node = new ListNode(1);
            head.next = node;
        }
        return ans.next;
    }
}
```

> Check Point

* 단순 구현 문제

---

## Reference

* [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)