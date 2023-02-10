---
layout: post
title:  " LeetCode : 881. Boats to Save People "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [881. Boats to Save People](https://leetcode.com/problems/boats-to-save-people)

### Problem

```
You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit.
```


---

### Example

```
Input: people = [1,2], limit = 3
Output: 1
```

---

### [1] Code (22. 04. 12)

*Need to Retry -> 문제 조건을 놓쳤다.*

```
1. PriorityQueue 사용 : https://leetcode.com/submissions/detail/678599497
2. 2 포인터 : https://leetcode.com/submissions/detail/678614112
```

---

> Check Point

* Each boat carries at most two people at the same time

---

> Reference Code

``` java
// Runtime: 20 ms
// Memory Usage: 65.3 MB
// Ref : https://leetcode.com/submissions/detail/678614899
class Solution {
    public int numRescueBoats(int[] people, int limit) {
        Arrays.sort(people);
        int i = 0, j = people.length - 1;
        int ans = 0;

        while (i <= j) {
            ans++;
            if (people[i] + people[j] <= limit) {i++;}
            j--;
        }

        return ans;
    }
}
```

---

> Review

* 동시에 최대 2명까지만 이동할 수 있다는 조건을 간과했다.

---

### [2] Code (23. 02. 11)

*Need to Retry -> 우선순위 큐를 생각했다면 틀릴 것이다.*

``` java
ex)
[5,1,4,2]
6
```

> Reference Code

**Code 1**

``` java
// Runtime: 17 ms
// Memory Usage: 50.5 MB
// Ref : https://leetcode.com/submissions/detail/895443115
class Solution {
    public int numRescueBoats(int[] people, int limit) {
        int boatCount = 0;
        Arrays.sort(people);

        int left = 0;
        int right = people.length - 1;

        while (left <= right) {
            int sum = people[left] + people[right];
            if (sum <= limit) {
                boatCount++;
                left++;
                right--;
            } else {
                boatCount++;
                right--;
            }
        }
        return boatCount;
    }
}
```

* 조건을 꼼꼼히 보자.

  **Each boat carries at most two people at the same time**

---

## Reference

* [881. Boats to Save People](https://leetcode.com/problems/boats-to-save-people)