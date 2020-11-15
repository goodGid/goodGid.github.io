---
layout: post
title:  " LeetCode : 46. Permutations "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [46. Permutations](https://leetcode.com/problems/permutations/)

### Problem

```
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
```

---

### Example

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```



---

### Code (20. 11. 15)

``` java
class Solution {

    public int[] visit;

    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        visit = new int[nums.length]; // [1]
        recursive(ans, nums, new ArrayList<>(), 0);
        return ans;
    }

    public void recursive(List<List<Integer>> ans,
                          int[] nums,
                          List<Integer> list, int size) {
        if (list.size() == nums.length) {
            List<Integer> temp = new ArrayList<>();
            ans.add(new ArrayList<>(list)); // [2]
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (visit[i] == 1) {
                continue;
            }

            list.add(nums[i]);
            visit[i] = 1;
            recursive(ans, nums, list, size + 1);
            visit[i] = 0;
            list.remove(list.size() - 1);
        }

    }
}
```

* [1] : class 내 에서 전역 변수처럼 선언하여 초기화가 가능하다.

* [2] : for 문을 사용할 필요가 없다.

``` java
if (list.size() == nums.length) {
    List<Integer> temp = new ArrayList<>();
    for (int i = 0; i < nums.length; i++) {
        temp.add(list.get(i));
    }
    ans.add(temp);
    return;
}

-> ans.add(new ArrayList<>(list));
```

* 위와 같은 방법은 시간 복잡도가 O(n^n)이다.

  = recursive()마다 n번씩 총 n번 만큼 재귀를 돈다.

---

### Feed Back

> Case 1

``` java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        permutation(res, nums, 0);
        return res;
    }

    private void permutation(List<List<Integer>> res, int[] nums, int start) {
        int n = nums.length;
        if (start == n) {
            List<Integer> list = new ArrayList<>();
            for (int i = 0; i < n; i++) { list.add(nums[i]); }
            res.add(list);
            return;
        }
        for (int i = start; i < n; i++) {
            swap(nums, start, i);
            permutation(res, nums, start + 1);
            swap(nums, start, i);
        }
    }

    private void swap(int[] nums, int i, int j) {
        if (i == j) { 
            return; 
        }
        nums[i] ^= nums[j];
        nums[j] ^= nums[i];
        nums[i] ^= nums[j];
    }
}
```

* swap을 이용한 방법이다.

  값을 기준으로 permutation을 구하는게 아니라

  자리(=index)를 기준으로 permutation을 구하는 Idea이다.

* 시간 복잡도는 O(n!)이다.

  = permutation()마다 n * n-1 * n-2 * .... * 1 이다.

---

## Summary

* Java로 Permutation 구현은 처음이였는데 생각보다 재밌었다.

---

## Reference

* [46. Permutations](https://leetcode.com/problems/permutations/)
