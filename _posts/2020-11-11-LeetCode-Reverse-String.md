---
layout: post
title:  " LeetCode : 344. Reverse String "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [(Easy) Reverse String](https://leetcode.com/problems/reverse-string/)

### Problem

```
Write a function that reverses a string. The input string is given as an array of characters char[].
Do not allocate extra space for another array, 
you must do this by modifying the input array in-place with O(1) extra memory.
You may assume all the characters consist of printable ascii characters.
```
 
---

### Example

```
Input: ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

---

### Code (20. 11. 11)

``` java
public void reverseString(char[] s) {
    int length = s.length;
    char[] ans = new char[length];

    for (int i = 0; i < length; i++) {
        ans[i] = s[length - 1 - i];
    }

    for (int i = 0; i < length; i++) {
        s[i] = ans[i];
    }
}
```

* 막 풀어도 될까 했는데 풀리는구나.

  그래도 좋은 코드 참고하자.


---

### Feed Back

> Case 1

``` java
public void reverseString(char[] s) {
    int lo = 0;
    int hi = s.length -1;
    
    while(lo<hi) {
        char temp = s[lo];
        s[lo] = s[hi];
        s[hi] = temp;
        lo++;
        hi--;
    }
}
```

---

## Reference

* [344. Reverse String](https://leetcode.com/problems/reverse-string/)
