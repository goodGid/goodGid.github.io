---
layout: post
title:  " LeetCode : 190. Reverse Bits "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [190. Reverse Bits](https://leetcode.com/problems/reverse-bits/)

### Problem

```
Reverse bits of a given 32 bits unsigned integer.
```

---

### Example

```
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.
```



---

### [1] Code (20. 12. 12)

``` java
class Solution {
    public int reverseBits(int n) {
        int ans = 0;

        for (int i = 0; i < 32; i++) {
            ans <<= 1;
            ans += (n & 1);
            n >>= 1;
        }
        
        return ans;
    }
}
```

* Simple is Best

```
n의 1번째 자리 = ans의 n번째 자리
n의 2번째 자리 = ans의 n-1번째 자리
n의 n번째 자리 = ans의 n-(n-1)번째 자리
```


---


### [2] Code (20. 12. 12)

``` java
public class Solution {
    public int reverseBits(int n) {
        int ans = 0;

        for (int i = 0; i < 32; i++) {
            int temp = 0;
            if ((n & (1 << i)) != 0) {
                temp = (1 << 31 - i);
            }
            ans |= temp;
        }

        return ans;
    }
}
```

* Simple is Best

```
n의 1번째 자리 = ans의 n번째 자리
n의 2번째 자리 = ans의 n-1번째 자리
n의 n번째 자리 = ans의 n-(n-1)번째 자리
```



---

## Reference

* [190. Reverse Bits](https://leetcode.com/problems/reverse-bits/)