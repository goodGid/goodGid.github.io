---
layout: post
title:  " LeetCode : 1029. Two City Scheduling "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1029. Two City Scheduling](https://leetcode.com/problems/two-city-scheduling)

### Problem

```
A company is planning to interview 2n people. Given the array costs where costs[i] = [aCosti, bCosti], the cost of flying the ith person to city a is aCosti, and the cost of flying the ith person to city b is bCosti.
Return the minimum cost to fly every person to a city such that exactly n people arrive in each city.
```


---

### Example

```
Input: costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110
```

---

### [1] Code (22. 04. 23)

*Need to Retry -> 문제 해석 못함 + 아이디어 떠올리지 못함.*

``` java
n/a
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 2 ms
// Memory Usage: 42.9 MB
// Ref : https://leetcode.com/submissions/detail/685736231
class Solution {
    public int twoCitySchedCost(int[][] costs) {
        int minSumB = 0;
        for (int i = 0; i < costs.length; i++) {
            minSumB += costs[i][1];
        }

        PriorityQueue<Integer> abDiff = new PriorityQueue<>();

        for (int i = 0; i < costs.length; i++) {
            abDiff.add(costs[i][0] - costs[i][1]);
        }

        for (int i = 0; i < costs.length / 2; i++) {
            minSumB += abDiff.poll(); // [1]
        }
        return minSumB;
    }
}
```

![](/assets/img/LeetCode/LeetCode-Two-City-Scheduling_1.png)

* [1] : B를 선택했다 가정한 값을 다 더한 후

  실제로 A를 선택하는 케이스를 위한 로직이다.


---

> Review

* 처음에 문제 해석이 안됐다.

  문제를 이해한 후 아이디어가 떠오르지 않았다.

---

### [2] Code (23. 03. 05)

*Need to Retry -> 풀긴했는데 다시 풀어도 좋을 듯*

``` java
// Runtime: 2 ms
// Memory Usage: 42.1 MB
// Ref : https://leetcode.com/submissions/detail/908705038
class Solution {
    public int twoCitySchedCost(int[][] costs) {
        int sum = 0;
        int aCnt = costs.length / 2;
        int bCnt = aCnt;

        List<Node> idxList = new ArrayList<>();

        for (int i = 0; i < costs.length; i++) {
            idxList.add(new Node(i, Math.abs(costs[i][0] - costs[i][1])));
        }

        Collections.sort(idxList);

        for (Node i : idxList) {
            int a = costs[i.index][0];
            int b = costs[i.index][1];

            if (a == b) {
                sum += a; // [1]
            } else if (a > b) { // Pick 'A'
                if (bCnt - 1 >= 0) {
                    bCnt--;
                    sum += b;
                } else {
                    aCnt--;
                    sum += a;
                }
            } else { // Pick 'B' 
                if (aCnt - 1 >= 0) {
                    aCnt--;
                    sum += a;
                } else {
                    bCnt--;
                    sum += b;
                }
            }
        }
        return sum;
    }
}

public class Node implements Comparable<Node> { // [2]
    int index;
    int value;

    public Node(int index, int value) {
        this.index = index;
        this.value = value;
    }

    @Override
    public int compareTo(Node newNode) {
        return newNode.value - value;
    }
}
```

* 35분 소요

* [1] : 같은 값이면 사실 어디로 가도 상관없으니 Sum에만 값을 합친다.

* [2] : Class + Sorting 코드가 생각안나서 [[Java] 알고리즘(Algorithm)을 위한 코드 정리해두기]({{site.url}}/Java-Algorithm-Skill-Collection/Java-Algorithm-Skill-Collection/#comparable-인터페이스-구현) 글을 참고했다.

---

> Review

* 단순하게 A로 정렬하고 B로 정렬하고 

  목적지를 정하려고 하면 다음 예제에서 틀리게 된다.

```
1,52
2,53
51,51
50,1000
```



---

## Reference

* [1029. Two City Scheduling](https://leetcode.com/problems/two-city-scheduling)