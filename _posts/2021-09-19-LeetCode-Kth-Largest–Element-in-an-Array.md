---
layout: post
title:  " LeetCode : 215. Kth Largest Element in an Array "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

### Problem

```
Given an integer array nums and an integer k, return the kth largest element in the array.
Note that it is the kth largest element in the sorted order, not the kth distinct element.
```


---

### Example

```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

---

### [1] Code (21. 09. 19)

*Need to Retry*

``` java
public int findKthLargest(int[] nums, int k) {

    PriorityQueue<Integer> queue = new PriorityQueue<>(Collections.reverseOrder());

    for (int i = 0; i < nums.length; i++) {
        queue.add(nums[i]);
    }

    int ans = 0;
    for (int i = 0; i < k; i++) {
        ans = queue.poll();
    }
    return ans;
}
```

> Concern Point

* PriorityQueue 선언 방법

``` java
PriorityQueue<Integer> queue = new PriorityQueue<>();
```

---

> Reference Code

``` java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        return quickselect(nums, 0, nums.length - 1, nums.length - k);
    }

    private int quickselect(int[] nums, int left, int right, int target) {

        int l = left;
        int r = right;
        int pivot = nums[l + (r - l) / 2];

        while (l <= r) {
            while (l <= r && nums[l] < pivot) {
                l++;
            }

            while (l <= r && nums[r] > pivot) {
                r--;
            }

            if (l <= r) {
                swap(nums, l, r);
                l++;
                r--;
            }
        }

        if (target <= r) {
            return quickselect(nums, left, r, target);
        } else if (target >= l) {
            return quickselect(nums, l, right, target);
        }

        return nums[target];
    }

    private void swap(int[] nums, int a, int b) {
        int temp = nums[a];
        nums[a] = nums[b];
        nums[b] = temp;
    }
}
```

* 100% 이해가 되지 않았다.

  대충 어떤 느낌인지는 알겠는데 명료하게 와 닿지 않는다.

  너무 오랜 시간을 사용했어서 일단은 기록해두고 다음에 다시 이해해보자.

---

### [2] Code (21. 11. 10) (x)

``` java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        Arrays.sort(nums);
        return nums[nums.length-k];
    }
}
```

> Review

* 단순하게 정렬 후 index에 접근하여 값을 출력한다.



---

## Reference

* [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

