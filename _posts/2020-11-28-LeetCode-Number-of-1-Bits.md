---
layout: post
title:  " LeetCode : 191. Number of 1 Bits "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [191. Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)

### Problem

```
Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).
```

---

### Example

```
Input: n = 00000000000000000000000000001011
Output: 3
Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.
```



---

### Code (20. 11. 28)

``` java
class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {

        int ans = 0;
        int mask = 1;

        for (int i = 0; i < 32; i++) { // [1]
            if ((n & mask) != 0) {
                ans++;
            }
            mask <<= 1;
        }
        return ans;
    }
}
```

* [1] : unsigned integer라서 32번만 for loop를 돌면서 체크하면 된다.

  => 4 bytes = 32 Bit

* Java로 진법을 다루는게 어색하고 어려웠다.

  그래서 Java 진법과 관련해서 글로 정리해놓았다.

  [Java 진법 다루기 : 2진수, 8진수, 10진수, 16진수]({{site.url}}/Java-Handle-Base/)

---

## Reference

* [191. Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)