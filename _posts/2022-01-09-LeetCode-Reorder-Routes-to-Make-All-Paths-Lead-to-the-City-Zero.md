---
layout: post
title:  " LeetCode : 1466. Reorder Routes to Make All Paths Lead to the City Zero "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1466. Reorder Routes to Make All Paths Lead to the City Zero]({{site.url}}/https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)

### Problem

```
There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.

This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.

It's guaranteed that each city can reach city 0 after reorder.
```


---

### Example

```
Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
```

---

### [1] Code (22. 01. 09)

*Need to Retry -> 아이디어를 떠올리지 못했다.*

``` java
n/a
```

---

> Wrong Reason

* 위상정렬 느낌은 났는데 거기서 더 발전 시키지 못했다.

---

> Reference Code

``` java
class Solution {
    public int minReorder(int n, int[][] connections) {
        Map<Integer, List<Integer>> map = new HashMap<Integer, List<Integer>>();
        Map<Integer, List<Integer>> lolmap = new HashMap<Integer, List<Integer>>();
        for (int[] connection : connections) {
            lolmap.computeIfAbsent(connection[0], x -> new ArrayList<Integer>()).add(connection[1]);
            map.computeIfAbsent(connection[0], x -> new ArrayList<Integer>()).add(connection[1]);
            map.computeIfAbsent(connection[1], x -> new ArrayList<Integer>()).add(connection[0]);
        }

        Queue<Integer> pq = new LinkedList<Integer>();
        pq.add(0);
        boolean[] visited = new boolean[n];

        int count = 0;
        while (!pq.isEmpty()) {
            int node = pq.poll();
            if (!visited[node] && map.containsKey(node)) {
                visited[node] = true;
                for (int i : map.get(node)) {
                    if (visited[i]) {
                        continue;
                    }
                    if (!lolmap.containsKey(i) || !lolmap.get(i).contains(node)) {
                        count++;
                    }
                    if (!visited[i]) {
                        pq.add(i);
                    }
                }
            }
        }
        return count;
    }
}
```

---

> Review

* 다음에 풀자.




---

## Reference

* [1466. Reorder Routes to Make All Paths Lead to the City Zero]({{site.url}}/https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)