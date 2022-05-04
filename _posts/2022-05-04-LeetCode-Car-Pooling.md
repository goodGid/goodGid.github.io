---
layout: post
title:  " LeetCode : 1094. Car Pooling "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1094. Car Pooling](https://leetcode.com/problems/car-pooling)

### Problem

```
There is a car with capacity empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).
```


---

### Example

```
Input: trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false
```

---

### [1] Code (22. 05. 04) (x)

``` java
// Runtime: 6 ms
// Memory Usage: 45.2 MB
// Ref : https://leetcode.com/submissions/detail/693023510
class Solution {
    public boolean carPooling(int[][] trips, int capacity) {

        PriorityQueue<Node> node1 = new PriorityQueue<>();
        PriorityQueue<Node> node2 = new PriorityQueue<>();

        for (int i = 0; i < trips.length; i++) {
            node1.add(new Node(trips[i][1], trips[i][0]));
            node2.add(new Node(trips[i][2], trips[i][0]));
        }

        int sum = 0;
        while (!node1.isEmpty()) {
            int stVal = node1.peek().pos;
            int endVal = node2.peek().pos;

            if (stVal < endVal) {
                Node node = node1.poll();
                if (sum + node.cap <= capacity) {
                    sum += node.cap;
                } else {
                    return false;
                }
            } else {
                Node node = node2.poll();
                sum -= node.cap;
            }
        }

        return true;

    }

    class Node implements Comparable<Node> {
        int pos;
        int cap;

        public Node(int pos, int cap) {
            this.pos = pos;
            this.cap = cap;
        }

        @Override
        public int compareTo(Node newNode) {
            return pos - newNode.pos;
        }
    }
}
```

---

> Review

* 10분 소요

* 아이디어가 바로 떠올랐다.

---

## Reference

* [1094. Car Pooling](https://leetcode.com/problems/car-pooling)