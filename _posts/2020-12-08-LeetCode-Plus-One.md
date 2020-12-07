---
layout: post
title:  " LeetCode : 66. Plus One "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [66. Plus One](https://leetcode.com/problems/plus-one/)

### Problem

```
Given a non-empty array of decimal digits representing a non-negative integer, increment one to the integer.
The digits are stored such that the most significant digit is at the head of the list, and each element in the array contains a single digit.
You may assume the integer does not contain any leading zero, except the number 0 itself.
```

---

### Example

```
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
```



---

### Code (20. 12. 08)

> Wrong Code 

``` java
class Solution {
    public int[] plusOne(int[] digits) {
        int ans = 0;
        for (int i = 0; i < digits.length; i++) {
            ans += digits[i] * Math.pow(10, digits.length - 1 - i); // [1]
        }
        ans += 1;

        String ansTypeOfString = String.valueOf(ans);

        int[] ansArray = new int[ansTypeOfString.length()];

        for (int i = 0; i < ansTypeOfString.length(); i++) {
            ansArray[i] = ans / (int) Math.pow(10, ansTypeOfString.length() - 1 - i);
            ans %= (int) Math.pow(10, ansTypeOfString.length() - 1 - i);
        }
        return ansArray;
    }
}
```

* 부분적으로 맞지만 Accept을 받지 못하는 코드다.

  그 이유는 [1]을 보면 int[]에 있는 값을 int로 변환을 해주는데

  Input으로 [9,8,7,6,5,4,3,2,1]이 들어오면 Int 자릿수를 초과하게 된다.

  이 부분을 고려 못해서 틀리고 

  다른 방향으로 접근해서 풀었다.


> Accept Code

``` java
class Solution {
    public int[] plusOne(int[] digits) {

        int length = digits.length;

        for (int i = length - 1; i >= 0; i--) {
            if (digits[i] + 1 < 10) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }

        // Should Format : 0 or 00 or 000
        int[] ansArray = new int[length+1];
        ansArray[0] = 1;
        return ansArray;
    }
}
```

* Accept 아이디어는 다음과 같다.

  ( arr[n] + 1 ) = 10 --> arr[n-1] += 1

  ( arr[n] + 1 ) != 10 --> arr[n] += 1

 
  

---

## Reference

* [66. Plus One](https://leetcode.com/problems/plus-one/)