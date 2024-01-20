---
layout: post
title:  " LeetCode : 15. 3Sum "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [15. 3Sum](https://leetcode.com/problems/3sum/)

### Problem

```
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.
```


---

### Example

```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

---

### [1] Code (22. 02. 13) (x)

``` java
// Runtime: 23 ms
// Memory Usage: 46.1 MB 
// Ref : https://leetcode.com/submissions/detail/640362192/
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        Arrays.sort(nums);

        for (int i = 0; i < nums.length - 2; i++) {
            int target = nums[i] * -1;

            int l = i + 1;
            int r = nums.length - 1;
            while (l < r) {
                int sum = nums[l] + nums[r];

                if (sum < target) {
                    l = leftSkipDupValue(nums, l, r) + 1;
                } else if (sum == target) {
                    ans.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    l = leftSkipDupValue(nums, l, r) + 1;
                    r = rightSkipDupValue(nums, l, r) - 1;
                } else {
                    r = rightSkipDupValue(nums, l, r) - 1;
                }
            }
            i = leftSkipDupValue(nums, i, nums.length - 1);
        }
        return ans;
    }

    private int leftSkipDupValue(int[] nums, int st, int end) {
        while (st < end) {
            if (nums[st] == nums[st + 1]) {
                st++;
            } else {
                break;
            }
        }
        return st;
    }

    private int rightSkipDupValue(int[] nums, int st, int end) {
        while (st < end) {
            if (nums[end] == nums[end - 1]) {
                end--;
            } else {
                break;
            }
        }
        return end;
    }
}
```

---

> Check Point

* *Notice that the solution set must not contain duplicate triplets.* 이므로 

  중복된 값이 들어가지 않도록 while을 사용해 Skip 하는 로직이 필요

---

### [2] Code (24. 01. 20)

*Retry -> 효율성을 챙기지 못했다.*

``` java
// Runtime: 1817 ms
// Memory Usage: 54.1 MB
// Ref : https://leetcode.com/submissions/detail/1151153151
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        Set<List<Integer>> set = new HashSet<>();
        
        Arrays.sort(nums);
        for (int i : nums) {
            map.put(i, map.getOrDefault(i, 0) + 1);
        }
        
        int size = nums.length;
        for (int i=0; i<size; i++) {
            map.put(nums[i], map.get(nums[i])-1);
            for (int j=i+1; j<size; j++) {
                map.put(nums[j], map.get(nums[j])-1);
                int target = -1 * (nums[i] + nums[j]);
                if (map.containsKey(target) && map.get(target) > 0) {
                    List<Integer> list = new ArrayList<>();
                    list.add(nums[i]);
                    list.add(nums[j]);
                    list.add(target);
                    Collections.sort(list);
                    set.add(list);
                }
                map.put(nums[j], map.get(nums[j])+1);
            }
            map.put(nums[i], map.get(nums[i])+1);
        }
        
        for (List<Integer> list : set) {
            ans.add(list);
        }
        
        return ans;
    }
}
```

* 위 아이디어는 단순 그 자체

  처음에 2 포인터로 이진 탐색 생각했다가

  급 방향을 틀었다.

* 그러자 시간/공간 효율성이 최악 ㅠㅠ

---

> Review

* 풀면서 몇 가지 놓친 부분들이 있어 틀렸지만 재미난 문제였다.

---

## Reference

* [15. 3Sum](https://leetcode.com/problems/3sum/)