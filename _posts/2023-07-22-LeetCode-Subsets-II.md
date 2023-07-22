---
layout: post
title: " LeetCode : 90. Subsets II "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [90. Subsets II](https://leetcode.com/problems/subsets-ii)

### Problem

```
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.
```


---

### Example

```
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

---

### [1] Code (23. 07. 22)

*Need to Retry -> 2가지 부분에서 고민이 있었는데 다음에 풀어도 똑같이 고민하지 않을까 싶다.*

``` java
// Runtime: 2 ms
// Memory Usage: 43.9 MB
// Ref : https://leetcode.com/submissions/detail/1000885037
class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums); // [1]

        Set<List<Integer>> set = new HashSet<>();
        dfs(0, nums, set, new ArrayList<>());
        List<List<Integer>> ans = new ArrayList<>();
        
        for (List<Integer> item : set) {
            ans.add(item);
        }
        
        return ans;
    }
    
    private void dfs(int idx, int[] nums, Set<List<Integer>> set, List<Integer> list) {
        if (idx == nums.length) {
            if (!set.contains(list)) {
                set.add(new ArrayList(list)); // [2]
            }
            return;
        }
        
        list.add(nums[idx]);
        dfs(idx+1, nums, set, list);

        list.remove(list.size()-1);
        dfs(idx+1, nums, set, list);
    }
}
```

* [1]  : 중복 제거를 위해 배열을 정렬한다.

  만약 정렬을 하지 않을 경우에

  [2,1,2]라는 input 값을 실행시키면

  [[2,1],[1],[2,2],[2],[],[2,1,2],[1,2]] 라는 값이 나온다.  

* [2] : 그냥 list를 넣게 되면 안 된다.

  list는 살아있는 객체이므로 set에 넣고

  그다음에 list에서 값을 제거하면 set이 품고 있는 list에도 영향이 가게 된다.

---

> Review

* 로직 자체는 간단한데

  2가지 부분이 막혔다.

  다음엔 수월하게 풀 수 있길 !

---

## Reference

* [90. Subsets II](https://leetcode.com/problems/subsets-ii)