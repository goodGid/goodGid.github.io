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

### [1] Code (20. 11. 14)

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

### [2] Code (21. 08. 15)

*Need to Retry*

``` java
public ListNode reverseList(ListNode head) {

    ListNode first = null;
    ListNode second = null;
    ListNode third = null;

    if (head == null) {
        return null;
    }
    first = head;

    if (first.next == null) {
        return first;
    }
    second = first.next;
    first.next = null;

    if (second.next == null) {
        second.next = first;
        return second;
    }
    third = second.next;

    while (third != null) {
        second.next = first;
        first = second;
        second = third;
        third = second.next;
    }

    second.next = first;

    return second;
}
```

* 25분가량 소요

* 깔끔하게 풀 수 있을 텐데 생각이 들었는데 떠오르지 않아서

  일단 머릿속에 아이디어를 구현했고 맞췄다.

* 다시 풀어봐도 좋을 문제라고 생각이 들었다.

* 다른 코드를 봤는데 굉장히 깔끔한 코드가 있었다. 

  참고하도록 하자 !

``` java
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    while(current != null) {
        ListNode temp = current.next;
        current.next = prev;
        prev = current;
        current = temp;
    }
    return prev;
}
```

---

## Reference

* [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
