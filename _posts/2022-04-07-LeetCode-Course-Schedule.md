---
layout: post
title:  " LeetCode : 207. Course Schedule "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [207. Course Schedule](https://leetcode.com/problems/course-schedule)

### Problem

```
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
```


---

### Example

```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
```

---

### [1] Code (22. 04. 07)

*Need to Retry -> 위상 정렬 !!!*

``` java
// Runtime: 7 ms
// Memory Usage: 48.1 MB
// Ref : https://leetcode.com/submissions/detail/675341121
class Solution {
    public boolean canFinish(int numCourses, int[][] p) {

        List<List<Integer>> list = new ArrayList<>();
        Queue<Integer> q = new LinkedList<>();
        int size = numCourses;
        int[] inDegree = new int[size];

        for (int i = 0; i < size; i++) {
            list.add(new ArrayList<>());
        }

        for (int i = 0; i < p.length; i++) {
            int target = p[i][0];
            int pre = p[i][1];
            list.get(pre).add(target); // pre를 들으면 target을 들을 수 있다.
            inDegree[target]++; // target을 듣기 위한 Count
        }

        for (int i = 0; i < size; i++) {
            if (inDegree[i] == 0) { // 선수 과목이 없으므로 들을 수 있다.
                q.add(i);
            }
        }

        int cnt = 0;

        while (!q.isEmpty()) {
            int idx = q.poll();
            cnt++;

            int preSize = list.get(idx).size();
            for (int i = 0; i < preSize; i++) {
                int target = list.get(idx).get(i);
                inDegree[target]--;

                if (inDegree[target] == 0) { // 선수 과목이 없으므로 들을 수 있다.
                    q.add(target);
                }
            }
        }
        return cnt != size ? false : true;
    }
}
```

---

> Review

* 위상 정렬 문제라는 건 바로 알았지만

  코드 기억이 나지 않아 위상 정렬 포맷을 참고 후 풀었다.

---

## Reference

* [207. Course Schedule](https://leetcode.com/problems/course-schedule)