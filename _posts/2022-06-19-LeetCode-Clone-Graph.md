---
layout: post
title:  " LeetCode : 133. Clone Graph "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [133. Clone Graph](https://leetcode.com/problems/clone-graph)

### Problem

```
Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.
```


---

### Example

```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
```

---

### [1] Code (22. 06. 19)

*Need to Retry -> 재귀 방식으로 풀어보자.*

``` java
// Runtime: 36 ms
// Memory Usage: 43.9 MB
// Ref : https://leetcode.com/submissions/detail/725536274
class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) {
            return null;
        }

        HashMap<Integer, Node> map = new HashMap<>();
        int[] visit = new int[101];
        Queue<Node> q = new LinkedList<>();

        Node root = new Node(node.val);
        map.put(node.val, root);
        q.add(node);

        while (!q.isEmpty()) {
            Node temp = q.poll();
            visit[temp.val] = 1;
            Node clonedNode = map.get(temp.val);

            List<Node> neighbors = temp.neighbors;
            for (Node neighbor : neighbors) {
                if (visit[neighbor.val] == 0) {
                    Node newNode = new Node(neighbor.val);
                    map.put(newNode.val, newNode);
                    visit[newNode.val] = 1;
                    clonedNode.neighbors.add(newNode);
                    q.add(neighbor);
                } else {
                    Node newNode = map.get(neighbor.val);
                    clonedNode.neighbors.add(newNode);
                }
            }
        }
        return root;
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 51 ms
// Memory Usage: 43.1 MB
// Ref : https://leetcode.com/submissions/detail/726037406
class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) {return node;}

        Map<Node, Node> map = new HashMap<>();

        return cloneGraph(node, map);
    }

    private Node cloneGraph(Node node, Map<Node, Node> map) {

        if (map.containsKey(node)) {
            return map.get(node);
        }

        Node cloneNode = new Node(node.val);
        map.put(node, cloneNode);

        for (Node neigh : node.neighbors) {
            Node cloneNeigh = cloneGraph(neigh, map);
            cloneNode.neighbors.add(cloneNeigh);
        }

        return cloneNode;
    }
}
```

* 재귀 방식의 풀이

---

> Review

* 20분 소요


---

## Reference

* [133. Clone Graph](https://leetcode.com/problems/clone-graph)