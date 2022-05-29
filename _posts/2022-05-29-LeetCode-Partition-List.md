---
layout: post
title:  " LeetCode : 86. Partition List "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [86. Partition List](https://leetcode.com/problems/partition-list)

### Problem

```
Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.
You should preserve the original relative order of the nodes in each of the two partitions.
```


---

### Example

```
Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
```

---

### [1] Code (22. 05. 29) (x)

``` java
// Runtime: 0 ms
// Memory Usage: 42.8 MB
// Ref : https://leetcode.com/submissions/detail/709517381
class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode ans = new ListNode();
        ListNode min = ans;
        ListNode maxRoot = new ListNode();
        ListNode max = maxRoot;
        while (head != null) {
            if (head.val < x) {
                min.next = head;
                min = min.next;
            } else {
                max.next = head;
                max = max.next;
            }
            head = head.next;
        }
        min.next = maxRoot.next;
        max.next = null;
        return ans.next;
    }
}
```

---

> Review

* 처음에 문제를 이해하지 못했다.

  문제를 이해하고 나서는 아이디어가 바로 떠올랐다.

---

## Reference

* [86. Partition List](https://leetcode.com/problems/partition-list)