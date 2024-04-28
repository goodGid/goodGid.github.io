---
layout: post
title:  " LeetCode : 23. Merge k Sorted Lists "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

### Problem

```
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.
```


---

### Example

```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
```

---

### [1] Code (22. 02. 27) (x)

``` java
// Runtime: 158 ms
// Memory Usage: 48.4 MB
// Ref : https://leetcode.com/submissions/detail/649825557/
class Solution {
    public ListNode mergeKLists(ListNode[] arrayLists) {

        ListNode ans = new ListNode();
        ListNode head = ans;

        List<ListNode> lists = new ArrayList<>();

        for (ListNode node : arrayLists) {
            if (node != null) { // "lists = [[]]" 케이스 방지용
                lists.add(node);
            }
        }

        while (lists.size() > 0) {
            int minNodeGroupNo = 0;
            int minValue = Integer.MAX_VALUE;
            int size = lists.size();

            for (int i = 0; i < size; i++) {
                int nodeValue = lists.get(i).val;

                if (minValue > nodeValue) {
                    minNodeGroupNo = i;
                    minValue = nodeValue;
                }
            }

            head.next = new ListNode(minValue);
            head = head.next;

            ListNode listNode1 = lists.get(minNodeGroupNo);
            lists.remove(minNodeGroupNo);
            listNode1 = listNode1.next;

            if (listNode1 != null) {
                lists.add(listNode1);
            }
        }

        return ans.next;
    }
}
```

---

> Algorithm Description

* ListNode마다 정렬이 되어있으므로

  각 ListNode의 0번째 값은 최솟값이다.

* 그러므로 ListNode의 0번째 끼리 비교해서 최솟값을 구한 후 

  해당 ListNode에서 그 값을 제거해준다.

  ex) [1,2,3,4]가 있다면 [2,3,4]만 가진 ListNode로 변경시킨다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 1 ms
// Memory Usage: 43.8 MB
// Ref : https://leetcode.com/problems/merge-k-sorted-lists/discuss/1761611/JAVA-multiple-approaches-merge-sort-priority-queue
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {return null;}
        return mergeKLists(lists, 0, lists.length - 1);
    }

    private ListNode mergeKLists(ListNode[] lists, int start, int end) {
        if (start == end) {return lists[start];}
        int mid = start + (end - start) / 2;

        ListNode left = mergeKLists(lists, start, mid);
        ListNode right = mergeKLists(lists, mid + 1, end);

        return merge2Lists(left, right);

    }

    private ListNode merge2Lists(ListNode l1, ListNode l2) {
        ListNode head = new ListNode();
        ListNode curr = head;

        while (l1 != null || l2 != null) {
            if (l1 == null) {
                curr.next = l2;
                l2 = l2.next;
            } else if (l2 == null) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                if (l2.val > l1.val) {
                    curr.next = l1;
                    l1 = l1.next;
                } else {
                    curr.next = l2;
                    l2 = l2.next;
                }
            }
            curr = curr.next;
        }
        return head.next;
    }
}
```

* 내가 풀었던 방식보다 훨씬 효율적인 알고리즘(= 분할 정복)

---

**Code 2**

``` java
// Runtime: 4 ms
// Memory Usage: 44.3 MB
// Ref : https://leetcode.com/problems/merge-k-sorted-lists/discuss/1791457/Java-or-Easy-Priority-Queue-Solution-or-Using-Dummy-Pointer
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {return null;}

        PriorityQueue<ListNode> q = new PriorityQueue<>((a, b) -> a.val - b.val);

        for (int i = 0; i < lists.length; i++) {
            if (lists[i] != null) {q.add(lists[i]);}
        }

        ListNode dummy = new ListNode(0);
        ListNode ans = dummy;

        while (q.size() > 0) {
            ListNode temp = q.poll();
            ans.next = temp;
            ans = ans.next;

            if (temp.next != null) {q.add(temp.next);}
        }
        return dummy.next;
    }
}
```

* 우선순위 큐를 사용하면 더 손쉽게 풀 수 있다.

---

> Review

* Hard 문제는 고려해야 하는 부분이 참 많다.

  그래도 풀다 보니 Hard 문제도 적응되는구나.

---

### [2] Code (24. 04. 28)

*Retry*

``` java
// Runtime: 5 ms
// Memory Usage: 44.9 MB
// Ref : https://leetcode.com/submissions/detail/1243701594
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<Node> pq = new PriorityQueue<>((n1, n2) -> { // [1]
            return n1.val - n2.val;
        });

        for (ListNode node : lists) {
            if (node == null) {
                continue;
            }
            pq.add(new Node(node.val, node.next));
        }

        ListNode ans = new ListNode();
        ListNode ptr = ans;
        while (!pq.isEmpty()) {
            Node node = pq.poll();
            ptr.next = new ListNode(node.val);
            ptr = ptr.next;

            if (node.listNode == null) {
                continue;
            } else {
                pq.add(new Node(node.listNode.val, node.listNode.next));
            }
        }

        return ans.next;
    }

    class Node {
        int val;
        ListNode listNode;

        public Node(int _val, ListNode _node) {
            val = _val;
            listNode = _node;
        }

        public int getVal() {
            return val;
        }
    }
}
```

* Hard 문제였는데 Medium처럼 풀렸다.

* [1] : 기존 코드를 다음과 같이 선언해줄 수 있다.

  PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(n -> n.val));

---

## Reference

* [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)