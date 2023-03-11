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

### [3] Code (23. 03. 11)

*Need to Retry -> PQ를 먼저 떠올린다면 발전이 없었다고 생각하자.*

``` java
// Runtime: 81 ms
// Memory Usage: 50.7 MB
// Ref : https://leetcode.com/submissions/detail/913064722
class Solution {
    public int numRescueBoats(int[] people, int limit) {
        int ans = 0;
        List<Integer> list = new ArrayList<>();

        for (int item : people) {
            list.add(item);
        }
        Collections.sort(list);

        int i = 0, j = list.size() - 1;
        while (i <= j) {
            int maxVal = list.get(j);
            int minVal = list.get(i);

            if (maxVal + minVal <= limit) {
                i++;
            }
            j--;
            ans++;
        }
        return ans;
    }
}
```

* 생각해 보면 굳이 List 선언하지 않고 int 배열에 대해 정렬하는 게 효율적이다.

  덕분에 Runtime이 오래 걸렸다.

---

> Review

* PQ로 정렬 후 큰 값으로만 값을 채우려고 했는데

  생각해 보니까 큰 값 + 작은 값으로 하는 게 더 합리적이다.


* 그리고 [2 번째]({{site.url}}/LeetCode-Boats-to-Save-People/#2-code-23-02-11) 풀었던걸 보면

  그때도 PQ로 접근해서 틀렸던 기억이 있는데 답습을 해버렸다. ㅠㅠ


---

## Reference

* [881. Boats to Save People](https://leetcode.com/problems/boats-to-save-people)