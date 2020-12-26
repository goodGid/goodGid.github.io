---
layout: post
title:  " LeetCode : 78. Subsets "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [78. Subsets](https://leetcode.com/problems/subsets/)

### Problem

```
Given an integer array nums, return all possible subsets (the power set).
The solution set must not contain duplicate subsets.
```





---

### Example

```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

---

### [1] Code (20. 12. 26)

``` java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {

        List<Integer> list = new LinkedList<>();

        // Remove duplicate value
        for (int i = 0; i < nums.length; i++) {
            list.add(nums[i]);
        }

        list = new LinkedList<>(new HashSet<>(list)); // [1]

        List<List<Integer>> ansList = new LinkedList<>();
        recursive(ansList, list, 0, new LinkedList<>());
        return ansList;
    }

    private void recursive(List<List<Integer>> ansList,
                           List<Integer> list,
                           int depth,
                           List<Integer> tempAnsList) {
        if (depth == list.size()) {
            ansList.add(new LinkedList<>(tempAnsList));
            return;
        }

        // Do choose
        tempAnsList.add(list.get(depth));
        recursive(ansList, list, depth + 1, tempAnsList);

        // Do not choose
        tempAnsList.remove(tempAnsList.size() - 1);
        recursive(ansList, list, depth + 1, tempAnsList);
    }
}
```

* 대표적인 DFS 방식으로 풀이

* [1] : List에서 중복된 값을 제거하는 코드


---

### [2] Code (20. 12. 26)

``` java
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        int n = nums.length;
        List<List<Integer>> subsets = new ArrayList<>();
        for (int i = 0; i < (1 << n); i++) {
            List<Integer> currentSubset = new ArrayList<>();
            for (int j = 0; j < n; j++) {
                int pos = 1 << j;
                if ((i & pos) >= 1) {
                    currentSubset.add(nums[j]);
                }
            }
            subsets.add(currentSubset);
        }
        return subsets;
    }
}
```

* 단순 DFS 탐색이므로 **비트 마스킹**으로도 풀이가 가능하다.

  직접 손으로 해보면 충분히 이해가 가능하니 꼭 이해해서 습득하면 좋은 스킬이 될 거 같다.

---

## Reference

* [78. Subsets](https://leetcode.com/problems/subsets/)