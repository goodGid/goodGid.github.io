---
layout: post
title: " LeetCode : 1743. Restore the Array From Adjacent Pairs "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1743. Restore the Array From Adjacent Pairs](https://leetcode.com/problems/restore-the-array-from-adjacent-pairs)

### Problem

```
There is an integer array nums that consists of n unique elements, but you have forgotten it. However, you do remember every pair of adjacent elements in nums.
You are given a 2D integer array adjacentPairs of size n - 1 where each adjacentPairs[i] = [ui, vi] indicates that the elements ui and vi are adjacent in nums.
It is guaranteed that every adjacent pair of elements nums[i] and nums[i+1] will exist in adjacentPairs, either as [nums[i], nums[i+1]] or [nums[i+1], nums[i]]. The pairs can appear in any order.
Return the original array nums. If there are multiple solutions, return any of them.
```


---

### Example

```
Input: adjacentPairs = [[2,1],[3,4],[3,2]]
Output: [1,2,3,4]
Explanation: This array has all its adjacent pairs in adjacentPairs.
Notice that adjacentPairs[i] may not be in left-to-right order.
```

---

### [1] Code (23. 11. 11)

*Retry -> 한 번에 통과했으나 다시 풀어도 재밌을 문제*

``` java
// Runtime: 111 ms
// Memory Usage: 81.2 MB
// Ref : https://leetcode.com/submissions/detail/1096283753
class Solution {
    public int[] restoreArray(int[][] adjacentPairs) {
        Map<Integer, List<Integer>> map = new HashMap<>();
        int n = adjacentPairs.length + 1;
        int[] ans = new int[n];
        int idx = 0;
        
        for (int i=0; i<n-1; i++) {
            int left = adjacentPairs[i][0];
            int right = adjacentPairs[i][1];

            // [1]
            List<Integer> value = map.getOrDefault(left, new ArrayList<>());
            value.add(right);
            map.put(left, map.getOrDefault(left, value));
            value = map.getOrDefault(right, new ArrayList<>());
            value.add(left);
            map.put(right, map.getOrDefault(right, value));
        }
        
        int target = -1;
        
        // [2]
        for (Integer key : map.keySet()) {
            if (map.get(key).size() == 1) {
                target = key;
                break;
            }
        }
        
        // [3]
        Map<Integer, Boolean> isVisit = new HashMap<>();
        while (idx < n) {
            ans[idx++] = target;
            isVisit.put(target, true);
            List<Integer> list = map.get(target);
            for (int i: list) {
                if (isVisit.getOrDefault(i,false) == false) {
                    target = i;
                    break;
                }
            }
        }
        return ans;
    }
}
```

* [1] : 부분 코드를 다음과 같이 수정할 수 있다.

```java
map.computeIfAbsent(left, k -> new ArrayList<>()).add(right);
map.computeIfAbsent(right, k -> new ArrayList<>()).add(left);
```

* [2] : 양끝은 무조건 1개다라는 점이 아이디어의 시작이었다.

  그 1개인 node는 2개가 있을 것이고 (가장 왼쪽, 가장 오른쪽)

  그중 1개를 랜덤 하게 뽑고 시작한다.

* [3] : 만약 가장 왼쪽을 선택했다면 이제 ans에 추가하는 방향은 오른쪽이다.

  그렇게 진행을 쭈욱 하면 정답을 찾을 수 있다.

---

## Reference

* [1743. Restore the Array From Adjacent Pairs](https://leetcode.com/problems/restore-the-array-from-adjacent-pairs)