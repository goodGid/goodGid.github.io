---
layout: post
title:  " LeetCode : 167. Two Sum II - Input Array Is Sorted "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

### Problem

```
Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

## Constraints:
- 2 <= numbers.length <= 3 * 104
- numbers is sorted in non-decreasing order.
```


---

### Example

```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

---

### [1] Code (22. 01. 21) (x)

``` java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int[] ans = new int[0];

        for (int i = 0; i < numbers.length; i++) {

            int result = Arrays.binarySearch(numbers, target - numbers[i]);

            if (i == result) {
                continue;
            }

            if (result >= 0) {
                if (i > result) {
                    ans = new int[] { result + 1, i + 1 };
                } else {
                    ans = new int[] { i + 1, result + 1 };
                }
                break;
            }
        }

        return ans;
    }
}
```

---

> Algorithm Description

* 정렬되어있으므로 Binary Search 아이디어를 떠올릴 수 있다.

* 시간복잡도는 input 값의 최대가 3 * $10^4$ 이므로 $O(N log_2 N)$으로 충분하다.

---

## Reference

* [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)