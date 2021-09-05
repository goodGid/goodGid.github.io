---
layout: post
title:  " LeetCode : 238. Product of Array Except Self "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

### Problem

```
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in O(n) time and without using the division operation.
```


---

### Example

```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

---

### [1] Code (21. 09. 05)

*Need to Retry*

``` java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int length = nums.length;
        int[] ans = new int[length];
        int[] leftSum = new int[length];
        int[] rightSum = new int[length];
        leftSum[0] = 1;
        rightSum[length - 1] = 1;

        for (int i = 1; i < length; i++) {
            leftSum[i] = leftSum[i - 1] * nums[i - 1];
        }

        for (int i = length - 2; i >= 0; i--) {
            rightSum[i] = rightSum[i + 1] * nums[i + 1];
        }

        for (int i = 0; i < length; i++) {
            ans[i] = leftSum[i] * rightSum[i];
        }
        return ans;
    }
}
```

> Check Point

* 시간복잡도는 $O(N)$ 안으로 해결

* 공간 복잡도는 $O(1)$ 만 사용

> Algorithm Description

* i번째에서 0 ~ (i-1)까지 곱한 값을 저장하는 leftSum 배열과

  i번째에서 (i+1) ~ N 까지 곱한 값을 저장하는 rightSum 배열을 구해 놓는다.

* 그리고 leftSum과 rightSum 2개 배열을 사용하여 최종적으로 정답을 구한다.

* 위 코드는 공간 복잡도 조건을 충족시키지 못한다.

  공간 복잡도를 충족시키는 **Reference Code**를 보자.

> Reference Code

``` java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[i] = 1;
        }
        int left = 1, right = 1;
        for (int i = 0; i < n; i++) {
            res[i] *= left;
            left *= nums[i]; // left의 누적합을 계산한다.

            res[n - 1 - i] *= right;
            right *= nums[n - 1 - i]; // right의 누적합을 계산한다.
        }
        return res;
    }
}
```

* 1번의 for 문으로 다음 2개의 for 문을 대체할 수 있다.

  -> 왼쪽에서 i번째 = 오른쪽에서 i번째

  -> 1번의 for 문으로 대체 가능

``` java
for (int i = 1; i < length; i++) {
    leftSum[i] = leftSum[i - 1] * nums[i - 1];
}

for (int i = length - 2; i >= 0; i--) {
    rightSum[i] = rightSum[i + 1] * nums[i + 1];
}
```


---

## Reference

* [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)