---
layout: post
title:  " LeetCode : 210. Course Schedule II "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

### Problem

* Need to Retry

```
There are a total of n courses you have to take labelled from 0 to n - 1.
Some courses may have prerequisites, for example, if prerequisites[i] = [ai, bi] this means you must take the course bi before the course ai.
Given the total number of courses numCourses and a list of the prerequisite pairs, return the ordering of courses you should take to finish all courses.
If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.
```





---

### Example

```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
```

---

### [1] Code (21. 02. 18)

``` java
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adjacencyList = new ArrayList<>();

        for (int i = 0; i < numCourses; i++) {
            adjacencyList.add(new ArrayList<>());
        }

        Queue<Integer> queue = new LinkedList<>();

        int[] inDegree = new int[numCourses];

        for (int i = 0; i < prerequisites.length; i++) {
            int prev = prerequisites[i][1];
            int next = prerequisites[i][0];
            adjacencyList.get(prev).add(next);
            inDegree[next]++;
        }

        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }

        int idx = 0;
        int[] ans = new int[numCourses];

        while (!queue.isEmpty()) {
            Integer top = queue.poll();
            ans[idx] = top;
            idx++;

            for (int i : adjacencyList.get(top)) {
                inDegree[i]--;
                if (inDegree[i] == 0) {
                    queue.offer(i);
                }
            }
        }

        if (idx != numCourses) {
            return new int[] {};
        }
        return ans;
    }
}
```

> Algorithm Description

* 못 풀어서 답을 찾아보았다.

  답을 보니 **위상 정렬**로 풀어야 했다.

  이전에도 위상 정렬 문제를 풀었던 적이 있지만 기억이 나지 않았고

  개념에 대해 다시 학습하였다.

---

> Review

* 특정 알고리즘을 알아야만 푸는 문제라서 

  다음에 다시 풀어보도록 하자 !

---



### [2] Code (22. 05. 08)

*Need to Retry -> 위상정렬로 풀었지만 다시 한 번 더 풀어보자.*

``` java
// Runtime: 7 ms
// Memory Usage: 48.8 MB
// Ref : https://leetcode.com/submissions/detail/695495001
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        int size = prerequisites.length;
        Queue<Integer> q = new LinkedList<>();
        int[] arr = new int[numCourses];
        List<List<Integer>> list = new ArrayList<>();

        for (int i = 0; i < numCourses; i++) {
            list.add(new ArrayList<>());
        }

        for (int i = 0; i < size; i++) {
            arr[prerequisites[i][0]]++;
            list.get(prerequisites[i][1]).add(prerequisites[i][0]);
        }

        for (int i = 0; i < numCourses; i++) {
            if (arr[i] == 0) {
                q.add(i);
            }
        }

        int[] ans = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int top = q.poll();
            ans[idx++] = top;

            for (int i : list.get(top)) {
                arr[i]--;
                if (arr[i] == 0) {
                    q.add(i);
                }
            }
        }

        if (idx != numCourses) {
            return new int[] {};
        }

        return ans;
    }
}
```

---

> Review

* 15분 소요

* 이전에 풀었던 기억이 나서 

  핵심적인 로직들도 막힘없이 떠올랐고 어렵지 않게 풀었다.

  그런데 자잘한 실수들이 있었다.

  다음에는 비슷한 실수하지 않도록 풀어보자 !

---

## Reference

* [210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)