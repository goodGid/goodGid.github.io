---
layout: post
title:  " LeetCode : 88. Merge Sorted Array "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

### Problem

```
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
```

---

### Example

```
Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
```



---

### [1] Code (20. 12. 12)

``` java
class Solution {
public void merge(int[] nums1, int m, int[] nums2, int n) {

        int[] ansArray = new int[m + n];

        int i = 0;
        int j = 0;

        for (int idx = 0; idx < m + n; idx++) {
            if (i == m) {
                ansArray[idx] = nums2[j];
                j++;
                continue;
            } else if (j == n) {
                ansArray[idx] = nums1[i];
                i++;
                continue;
            }

            if (nums1[i] == nums2[j]) {
                ansArray[idx] = nums1[i];
                ansArray[idx + 1] = nums1[i];
                idx++;
                i++;
                j++;
            } else if (nums1[i] < nums2[j]) {
                ansArray[idx] = nums1[i];
                i++;
            } else {
                ansArray[idx] = nums2[j];
                j++;
            }
        }

        for (int k = 0; k < m + n; k++) {
            nums1[k] = ansArray[k];
        }
    }
}
```

* 아주 직관적인 코드


---

### [2] Code (20. 12. 12)

``` java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {

        int i = m - 1;
        int j = n - 1;

        for (int k = m + n - 1; k >= 0; k--) {
            if (i < 0) {
                nums1[k] = nums2[j--];
            } else if (j < 0) {
                nums1[k] = nums1[i--];
            } else if (nums1[i] < nums2[j]) {
                nums1[k] = nums2[j--];
            } else {
                nums1[k] = nums1[i--];
            }
        }
    }
}
```

* m과 n의 값을 사용하여

  뒤에서 부터 값을 채워 넣는다.

  그리고 이게 가능한 이유는 정렬된 상태로 array가 input으로 들어오기 때문이다.

  *two sorted integer arrays* 


---

## Reference

* [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)