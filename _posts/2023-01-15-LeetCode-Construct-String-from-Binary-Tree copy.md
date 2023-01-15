---
layout: post
title: " LeetCode : 1383. Maximum Performance of a Team "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1383. Maximum Performance of a Team](https://leetcode.com/problems/maximum-performance-of-a-team/)

### Problem

```
You are given two integers n and k and two integer arrays speed and efficiency both of length n. There are n engineers numbered from 1 to n. speed[i] and efficiency[i] represent the speed and efficiency of the ith engineer respectively.
Choose at most k different engineers out of the n engineers to form a team with the maximum performance.
The performance of a team is the sum of their engineers' speeds multiplied by the minimum efficiency among their engineers.
Return the maximum performance of this team. Since the answer can be a huge number, return it modulo 109 + 7.
```


---

### Example

```
Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 2
Output: 60
Explanation: 
We have the maximum performance of the team by selecting engineer 2 (with speed=10 and efficiency=4) and engineer 5 (with speed=5 and efficiency=7). That is, performance = (10 + 5) * min(4, 7) = 60.
```

---

### [1] Code (23. 01. 15)

``` java
n/a
```

---


> Reference Code

**Code 1**

``` java
// Runtime: 48 ms
// Memory Usage: 55 MB
// Ref : https://leetcode.com/submissions/detail/878628933
class Solution {
    public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {
        int[][] players = new int[n][2];
        for (int i=0; i<n; i++) {
            players[i][0] = efficiency[i];
            players[i][1] = speed[i];
        }
		// Sort the players based on efficiency in decreasing order, as for each iteration, we'll consider only players with higher efficiency.
        Arrays.sort(players, (p1, p2) -> (p2[0] - p1[0]));

		// Priority-Queue to maintain players with highest relative speeds with efficiencies greater than the one under iteration.
        PriorityQueue<Integer> speedQueue = new PriorityQueue<>(k);
        long teamPerformance = 0, teamSpeed = 0;

        for (int i=0; i<n; i++) {
			// This is because a team can have atmost `k` players.
            if (speedQueue.size() >= k) {
                teamSpeed -= speedQueue.remove();
            }
            speedQueue.add(players[i][1]);
            teamSpeed += players[i][1];

            teamPerformance = Math.max(teamPerformance, teamSpeed * players[i][0]);
        }
        return (int) (teamPerformance % 1000000007);
    }
}
```

* 알고리즘이 이해 안된다면 [NeetCode - Maximum Performance of a Team - Leetcode 1383 - Python](https://www.youtube.com/watch?v=Y7UTvogADH0) 영상을 참고하자.

---

## Reference

* [1383. Maximum Performance of a Team](https://leetcode.com/problems/maximum-performance-of-a-team/)