---
layout: post
title:  " LeetCode : 4. Median of Two Sorted Arrays "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays)

### Problem

```
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
The overall run time complexity should be O(log (m+n)).
```


---

### Example

```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

---

### [1] Code (22. 05. 14)

*Need to Retry -> 풀긴했는데 깔끔하지 못하다.*

``` java
// Runtime: 3 ms
// Memory Usage: 49.5 MB
// Ref : https://leetcode.com/submissions/detail/697102161
class Solution {
    public double findMedianSortedArrays(int[] n1, int[] n2) {

        int size = n1.length + n2.length;
        boolean isEven = size % 2 == 0;
        int mid = size / 2;

        int idx1 = 0;
        int idx2 = 0;
        int[] ansArr = new int[mid + 1];
        int ansArrIdx = 0;

        if (n1.length == 0) {
            if (isEven) {
                return ((double) n2[mid] + (double) n2[mid - 1]) / 2; // [1]
            } else {
                return (double) n2[mid];
            }
        }

        if (n2.length == 0) {
            if (isEven) {
                return ((double) n1[mid] + (double) n1[mid - 1]) / 2;
            } else {
                return (double) n1[mid];
            }
        }

        while (isRange(idx1, n1) && isRange(idx2, n2)) {
            if (idx1 + idx2 == mid + 1) {
                if (isEven) {
                    return ((double) ansArr[ansArrIdx - 1] + (double) ansArr[ansArrIdx - 2]) / 2;
                } else {
                    return (double) ansArr[ansArrIdx - 1];
                }
            }
            if (n1[idx1] > n2[idx2]) {
                ansArr[ansArrIdx++] = n2[idx2];
                idx2++;
            } else {
                ansArr[ansArrIdx++] = n1[idx1];
                idx1++;
            }
        }

        while (isRange(idx1, n1)) {
            if (idx1 + idx2 == mid + 1) {
                if (isEven) {
                    return ((double) ansArr[ansArrIdx - 1] + (double) ansArr[ansArrIdx - 2]) / 2;
                } else {
                    return (double) ansArr[ansArrIdx - 1];
                }
            }
            ansArr[ansArrIdx++] = n1[idx1];
            idx1++;
        }

        while (isRange(idx2, n2)) {
            if (idx1 + idx2 == mid + 1) {
                if (isEven) {
                    return ((double) ansArr[ansArrIdx - 1] + (double) ansArr[ansArrIdx - 2]) / 2;
                } else {
                    return (double) ansArr[ansArrIdx - 1];
                }
            }
            ansArr[ansArrIdx++] = n2[idx2];
            idx2++;
        }

        return (double) (ansArr[0] + ansArr[1]) / 2;
    }

    private boolean isRange(int idx, int[] arr) {
        return idx < arr.length;
    }
}
```

* [1] : 굳이 double로 치환해줄 필요가 없다.

  ref : [https://leetcode.com/submissions/detail/699091344](https://leetcode.com/submissions/detail/699091344)

  ``` java
  return (n2[mid] + n2[mid - 1]) / 2.0;
  ```

* 문제에서 요구하는 시간 복잡도는 $O(log_2 (M+N))$ 이였는데

  $O(M+N)$으로 잘못보고 문제 접근을 했다.

---

> Check Point

* **The overall run time complexity should be O(log (m+n)).**

---

> Algorithm Description

* 중간까지만 n1 배열과 n2 배열을 merge 하면서 중간에 다다르면 로직을 종료한다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 2 ms
// Memory Usage: 43.1 MB
// Ref : https://leetcode.com/submissions/detail/699101459
public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    int index1 = 0;
    int index2 = 0;
    int med1 = 0;
    int med2 = 0;
    for (int i = 0; i <= (nums1.length + nums2.length) / 2; i++) {
        med1 = med2; // [1]
        if (index1 == nums1.length) {
            med2 = nums2[index2];
            index2++;
        } else if (index2 == nums2.length) {
            med2 = nums1[index1];
            index1++;
        } else if (nums1[index1] < nums2[index2]) {
            med2 = nums1[index1];
            index1++;
        } else {
            med2 = nums2[index2];
            index2++;
        }
    }

    // the median is the average of two numbers
    if ((nums1.length + nums2.length) % 2 == 0) {
        return (float) (med1 + med2) / 2;
    }

    return med2;
}
```

* [1] : 나는 이전 값을 저장하기 위해 배열을 사용했는데

  이 알고리즘에서는 변수 하나를 활용하였다.

* 중간까지만 값을 체크하는 로직은 

  내가 풀었던 코드와 같고 단지 어떻게 표현했느냐의 차이가 있다.

* 같은 코드를 제출했는데 시간/공간 복잡도 값이 달라진다.

``` java
[1] : Runtime: 2 ms
[1] : Memory Usage: 43.1 MB
[2] : Runtime: 4 ms
[2] : Memory Usage: 49.7 MB
[3] : Runtime: 4 ms
[3] : Memory Usage: 50.2 MB
```

---

**Code 2**

``` java
// Runtime: 3 ms
// Memory Usage: 49.9 MB
// Ref : https://leetcode.com/submissions/detail/699124488
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1 == null && nums2 == null) {
            return 0;
        }

        if (nums1 == null) {
            int n = nums2.length;
            return nums2[(n - 1) / 2] * 0.5 + nums2[n / 2] * 0.5; // [1]
        }

        if (nums2 == null) {
            int n = nums1.length;
            return nums1[(n - 1) / 2] * 0.5 + nums1[n / 2] * 0.5;
        }

        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }

        // choose shorter to binary search
        int n = nums1.length;
        int m = nums2.length;
        int left = 0;
        int right = n;

        while (left < right) {
            int i = (left + right) / 2;
            int j = (n + m) / 2 - i;

            if (nums1[i] < nums2[j - 1]) {
                left = i + 1;
            } else {
                right = i;
            }
        }

        int first = left;
        int second = (n + m) / 2 - left;

        int shorterLeft = first == 0 ? Integer.MIN_VALUE : nums1[first - 1];
        int shorterRight = first == n ? Integer.MAX_VALUE : nums1[first];

        int longerLeft = second == 0 ? Integer.MIN_VALUE : nums2[second - 1];
        int longerRight = second == m ? Integer.MAX_VALUE : nums2[second];

        if ((n + m) % 2 == 1) {
            return Math.min(shorterRight, longerRight);
        } else {
            return Math.max(shorterLeft, longerLeft) * 0.5 + Math.min(shorterRight, longerRight) * 0.5;
        }

    }
}
```

* [1] : 주어진 n 값이 홀/짝 상관없이 중간값을 구하는 스킬

  if/else로 n 값이 홀/짝인지 나눠 중간값을 구하지 않고 심플한 코드로 값을 구할 수 있다.

  -> **(n-1)/2**, **n/2**

* 알고리즘에 대한 자세한 설명은 [Java Binary Search Explained](https://leetcode.com/problems/median-of-two-sorted-arrays/discuss/1701107/Java-Binary-Search-Explained) 글을 참고하자.


---

> Review

* 재밌는 문제였다.

  2가지 접근 방법에 대해 알아보고 

  문제를 푸는 데 있어 테크닉적인 부분들도 배울 수 있었다.

  ex) 이전 값 저장, 홀/짝 구하는 스킬

---

## Reference

* [4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays)