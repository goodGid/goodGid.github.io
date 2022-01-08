---
layout: post
title:  " LeetCode : 1466. Reorder Routes to Make All Paths Lead to the City Zero "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## * [1466. Reorder Routes to Make All Paths Lead to the City Zero](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)

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
                    if (!lolmap.containsKey(i) || !lolmap.get(i).contains(node)) { // [1]
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

> Algorithm Description

* 모든 노드를 다 방문해야 한다.

  그게 최소의 비용으로 0까지 갈 수 있다.

  그러므로 모든 노드가 연결되어야 한다.

* **map** 변수는 위상정렬을 구현하기 위한 변수이고

  **lolmap** 변수는 단방향만 있는 노드를 체크하기 위한 변수다.

* 그리고 단방향인지 체크는 [1]에서 한다.

``` java
!lolmap.containsKey(i)
// i에서 나가는 path가 아예 없는 경우
// 새로운 path 추가가 필요하다.

!lolmap.get(i).contains(node)
// i -> node로 가는 path가 있는지 체크해본다.
// i는 map에서 꺼낸 값으로 양방향으로 path가 있다.
// 그런데 lolmap에서 i를 key로 조회 시 값이 없다면
// i -> node로 가는 path가 없음을 알 수 있다.
```

---

> Review

* 30분 정도 고민했으나 실패

* 위상 정렬인데 조금 변형된 유형의 문제 같다.

---

## Reference

* [1466. Reorder Routes to Make All Paths Lead to the City Zero](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)