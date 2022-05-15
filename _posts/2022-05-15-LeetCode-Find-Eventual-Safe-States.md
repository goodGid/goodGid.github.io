---
layout: post
title:  " LeetCode : 802. Find Eventual Safe States "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [802. Find Eventual Safe States](https://leetcode.com/problems/find-eventual-safe-states)

### Problem

```
There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].

A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node.

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.
```


---

### Example

```
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
```

---

### [1] Code (22. 05. 15)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

---

> Check Point

* The answer should be sorted in ascending order.

---

> Wrong Reason

* 20 ~ 30분 정도 아이디어 고민을 했지만 떠올리지 못했다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 121 ms
// Memory Usage: 121.8 MB
// Ref : https://leetcode.com/submissions/detail/699765108
class Solution {
    public List<Integer> eventualSafeNodes(int[][] g) {

        List<Set<Integer>> fromToList = new ArrayList<>();
        List<Set<Integer>> toFromList = new ArrayList<>();

        int size = g.length;

        for (int i = 0; i < size; i++) {
            fromToList.add(new HashSet<>());
            toFromList.add(new HashSet<>());
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < size; i++) {
            if (g[i].length == 0) {
                q.add(i);
            }
            for (int j = 0; j < g[i].length; j++) {
                fromToList.get(i).add(g[i][j]);
                toFromList.get(g[i][j]).add(i);
            }
        }

        List<Integer> ans = new ArrayList<>();
        while (!q.isEmpty()) {
            int idx = q.poll();
            ans.add(idx);

            for (int i : toFromList.get(idx)) {
                fromToList.get(i).remove(idx);
                if (fromToList.get(i).isEmpty()) {
                    q.add(i);
                }
            }
        }
        Collections.sort(ans);
        return ans;
    }
}
```

* 위상 정렬

* 문제의 [Solution - Approach 1: Reverse Edges](https://leetcode.com/problems/find-eventual-safe-states/solution/)을 보고 이해하고 다시 풀어봤다.

  ``` java
  List<List<Integer>> 로 시도했다가
  List<Set<Integer>> 자료 구조로 해결하였다.
  ```

---

**Code 2**

``` java
// Runtime: 5 ms
// Memory Usage: 65.8 MB
// Ref : https://leetcode.com/submissions/detail/699815500
class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int N = graph.length;
        int[] color = new int[N];
        List<Integer> ans = new ArrayList();

        for (int i = 0; i < N; ++i) {
            if (dfs(i, color, graph)) {
                ans.add(i);
            }
        }
        return ans;
    }

    // colors: WHITE 0, GRAY 1, BLACK 2;
    public boolean dfs(int node, int[] color, int[][] graph) {
        if (color[node] > 0) {return color[node] == 2;}

        color[node] = 1;
        for (int nei : graph[node]) {
            if (color[node] == 2) {
                continue;
            }
            if (color[nei] == 1 || !dfs(nei, color, graph)) {
                return false;
            }
        }

        color[node] = 2;
        return true;
    }
}
```

* DFS 방식

  ref : 문제 [Solution - Approach 2: Depth-First Search](https://leetcode.com/problems/find-eventual-safe-states/solution)

---

> Review

* 위상 정렬, DFS 방식으로 다 접근했었는데 이게 맞나? 란 생각이 들어서 중간에 포기했다.

  그런데 정답 코드들을 보고나니 내가 생각한 접근과 코드의 구조까지 엄청나게 비슷했다.

  한 스텝만 더 나아갔으면 이라는 아쉬움이 남는다.




---

## Reference

* [802. Find Eventual Safe States](https://leetcode.com/problems/find-eventual-safe-states)