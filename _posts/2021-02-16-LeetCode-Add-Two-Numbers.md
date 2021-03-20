---
layout: post
title:  " LeetCode : 2. Add Two Numbers "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

## Problem

```
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
```





---

## Example

```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

---

## [1] Code (21. 02. 16)

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

## [2] Code (21. 03. 21)

``` java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {

        ListNode dummyNode = new ListNode();
        ListNode head = dummyNode;

        int sum;
        int carry = 0;
        while (l1 != null && l2 != null) {
            sum = carry + l1.val + l2.val;
            carry = sum >= 10 ? 1 : 0;

            ListNode node = new ListNode(sum % 10);
            head.next = node;
            head = head.next;

            l1 = l1.next;
            l2 = l2.next;
        }

        while (l1 != null) {
            sum = carry + l1.val;
            carry = sum >= 10 ? 1 : 0;

            ListNode node = new ListNode(sum % 10);
            head.next = node;
            head = head.next;

            l1 = l1.next;
        }

        while (l2 != null) {
            sum = carry + l2.val;
            carry = sum >= 10 ? 1 : 0;

            ListNode node = new ListNode(sum % 10);
            head.next = node;
            head = head.next;

            l2 = l2.next;
        }

        if (carry == 1) {
            head.next = new ListNode(1);
        }

        return dummyNode.next;
    }
}
```

> Check Point

* 단순 구현문제

---

> Review

* IDE를 사용하지 않고 풀었다.

* *while (l1 != null && l2 != null)* 이렇게 조건을 주니

  while (l1 != null)과 while (l2 != null)과 같은 코드가 들어가야 했다.

  그래서 이 부분을 어떻게 풀어냈을까? 를 다른 코드를 보고 참고해봤다.

``` java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {

        ...
        
        ListNode first = l1;
        ListNode second = l2;

        ListNode result = new ListNode(-1);
        int carry = 0;
        ListNode head = result;

        while (first != null || second != null) {
            int x = first != null ? first.val : 0; // null 이면 0으로 처리
            int y = second != null ? second.val : 0; // null 이면 0으로 처리
            int z = x + y + carry;
            result.next = new ListNode(z % 10);
            carry = z / 10;
            result = result.next;

            if (first != null) { // null이 아닐 경우에만 다음 Node로 이동
                first = first.next;
            }
            if (second != null) { // null이 아닐 경우에만 다음 Node로 이동
                second = second.next;
            }

        }

        if (carry > 0) {
            result.next = new ListNode(carry);
        }
        return head.next;
    }
}
```

* l1 혹은 l2가 null이라면 그냥 0으로 값을 처리한다.


---

## Reference

* [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)