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

### [3] Code (21. 10. 10)

*Need to Retry -> 자료구조를 사용해보자.*

``` java
public ListNode reverseList(ListNode head) {
    
    ListNode l = null;
    ListNode r = null;
    ListNode m = head;
    
    while (m != null) {
        r = m.next;
        m.next = l;
        l = m;
        m = r;
    }
    return l;
}
```

> Reference Code

``` java
public ListNode reverseList(ListNode head) {
    
    //declare Stack
    //for each node
    //  put node in stack
    
    //take first node from stack
    //while stack is not empty
    //. node .next = stack.pop
    //return first Node
    
    if(head == null){
        return null;
    }
    
    Stack<ListNode> nodes = new Stack<>();
    ListNode cur = head;
    nodes.push(cur);
    while(cur != null){
            if(cur.next != null){
                nodes.push(cur.next);
            }
        cur = cur.next;          
    }
    
    ListNode returnNode = nodes.pop();
    ListNode headTemp = returnNode;
    while(nodes.size() != 0){
        headTemp.next = nodes.pop();
        headTemp = headTemp.next;
    }
    headTemp.next = null;
    
    return returnNode;
}
```

* Stack을 사용하면 자연스럽게 Reverse하게 연결을 할 수가 있다.

  굉장히 좋은 접근이라는 생각이 든다.

---

> FeedBack

* Iteratively 하게 풀었다.

  다른 코드를 보니 Stack을 사용했는데 너무 좋은 접근이었다.

  다음엔 Stack 자료구조를 떠올려서 풀어보면 좋을 거 같다.

---

## Reference

* [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
