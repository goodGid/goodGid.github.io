---
layout: post
title:  " [Java] Linked List 순서를 반대로 바꾸기 : Reverse Linked List Node Order "
categories: AlgorithmSkill
author: goodGid
---
* content
{:toc}

## Prologue

* 알고리즘 문제를 풀다 보면 

  Linked List의 순서를 reverse 해야 하는 경우가 종종 있었다.

* 그 경우 매번 

  어떻게 해야 하나 고민을 하는데
  
  그런 시간을 단축하기 위해 정리해놓으려고 한다.


---

## Reverse Order

> ListNode

``` java
public class ListNode {
    int val;
    ListNode next;

    ListNode(int val) { this.val = val; }

    static ListNode getListNode(int val) {
        return new ListNode(val);
    }
}
```

> Main

``` java
public class Main {

    public static void main(String[] args) {

        ListNode listNode1 = ListNode.getListNode(1);
        ListNode listNode2 = ListNode.getListNode(2);
        ListNode listNode3 = ListNode.getListNode(3);
        ListNode listNode4 = ListNode.getListNode(4);
        ListNode listNode5 = ListNode.getListNode(5);

        listNode1.next = listNode2;
        listNode2.next = listNode3;
        listNode3.next = listNode4;
        listNode4.next = listNode5;

        Solution solution = new Solution();
        solution.reverseOrder(listNode1, 2);
    }
}

class Solution {
    public ListNode reverseOrder(ListNode head, int n) {

        ListNode prePrevNode = null;
        ListNode prevNode = head;
        ListNode curNode = head.next;

        System.out.println("## Origin Linked List");
        printNode(head);

        System.out.println("## Reverse Linked List Order");
        prevNode = getReverseOrderListHeadNode(prePrevNode, prevNode, curNode);
        printNode(prevNode);

        // Set New Head Node
        head = prevNode;

        prePrevNode = null;
        prevNode = head;
        curNode = head.next;

        System.out.println("## Reverse Linked List Order");
        prevNode = getReverseOrderListHeadNode(prePrevNode, prevNode, curNode);
        printNode(prevNode);

        return head;
    }

    private ListNode getReverseOrderListHeadNode(ListNode prePrevNode, 
                                                 ListNode prevNode, 
                                                 ListNode curNode) {
        ListNode nextNode;
        while (curNode != null) {
            nextNode = curNode.next;
            prevNode.next = prePrevNode;
            curNode.next = prevNode;

            prePrevNode = prevNode;
            prevNode = curNode;
            curNode = nextNode;
        }
        return prevNode;
    }

    private void printNode(ListNode prevNode) {
        ListNode printNode = prevNode;
        while (printNode != null) {
            System.out.println(printNode.val);
            printNode = printNode.next;
        }
        System.out.println();
    }
}
```

> Output

```
## Origin Linked List
1
2
3
4
5

## Reverse Linked List Order
5
4
3
2
1

## Reverse Linked List Order
1
2
3
4
5
```