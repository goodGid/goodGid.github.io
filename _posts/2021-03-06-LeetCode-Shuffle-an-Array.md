---
layout: post
title:  " LeetCode : 384. Shuffle an Array "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [384. Shuffle an Array](https://leetcode.com/problems/shuffle-an-array/)

## Problem

* Need to Retry

```
Given an integer array nums, design an algorithm to randomly shuffle the array.

Implement the Solution class:

Solution(int[] nums) Initializes the object with the integer array nums.
int[] reset() Resets the array to its original configuration and returns it.
int[] shuffle() Returns a random shuffling of the array.
```





---

## Example

```
Input
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
Output
[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

Explanation
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must be equally likely to be returned. Example: return [3, 1, 2]
solution.reset();      // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3]
solution.shuffle();    // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]
```

---

## [1] Code (21. 03. 06)

``` java
class Solution {

    private int[] nums;
    private Random random;
    
    public Solution(int[] nums) {
        this.nums = nums;
        random = new Random();
    }
    
    /** Resets the array to its original configuration and return it. */
    public int[] reset() {
        return nums;
    }
    
    /** Returns a random shuffling of the array. */
    public int[] shuffle() {
        int[] copyiedArray = nums.clone();
        for (int j=1; j<copyiedArray.length; j++){
            int i = random.nextInt(j + 1);
            swap(copyiedArray,i,j);
        }
        
        return copyiedArray;
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

> Check Point

* 단순 구현 문제

---

> Review

* **int[] copyiedArray = nums.clone( );**

  배열에 array.clone( ) 이라는 메소드를 처음알았다.



---

## Reference

* [384. Shuffle an Array](https://leetcode.com/problems/shuffle-an-array/)