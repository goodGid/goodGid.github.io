---
layout: post
title:  " LeetCode : 189. Rotate Array "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [189. Rotate Array](https://leetcode.com/problems/rotate-array/)

### Problem

```
Given an array, rotate the array to the right by k steps, where k is non-negative.

Follow up:
Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
Could you do it in-place with O(1) extra space?
```





---

### Example

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```

---

### [1] Code (21. 02. 12)

``` java
class Solution {
    public void rotate(int[] nums, int k) {

        int lastValue;

        for (int i = 0; i < k; i++) {
            lastValue = nums[nums.length - 1];
            for (int j = nums.length - 1; j > 0; j--) {
                nums[j] = nums[j - 1];
            }
            nums[0] = lastValue;
        }
    }
}
```

> Check Point

1. 우측으로 Rotate 시킨다.

2. nums 값은 Integer로 cover 가능하다.

---

> Algorithm Description

* 단순 구현문제였는데 

  위 알고리즘보다는 특이한 아이디어가 있다.

  그래서 이 아이디어를 알아두는게 좋겠다.

``` java
class Solution {
  public void rotate(int[] nums, int k) {
    k %= nums.length; // k = nums.length + @라고 하면 nums.length만큼 rotate 하는 건 의미가 없다.
    reverse(nums, 0, nums.length - 1); // 전체를 뒤집는다.
    reverse(nums, 0, k - 1);    // 0 ~ k-1 까지 뒤집는다.
    reverse(nums, k, nums.length - 1); // k ~n 까지 뒤집는다.
  }
  public void reverse(int[] nums, int start, int end) {
    while (start < end) {
      int temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;
      start++;
      end--;
    }
  }
}
```

* 전체를 뒤집는 이유에 대해 이해가 안 갔었는데

  이유는 다음과 같았다.

* 뒤에 있는 숫자를 앞으로 옮겨야 하므로 

  역으로 뒤집어 버리면

  가장 맨 끝 -> 가장 맨 앞으로 오게 된다.

  즉 rotate 된 느낌으로 배열의 모양을 나타낼 수 있다.

---

## Reference

* [189. Rotate Array](https://leetcode.com/problems/rotate-array/)