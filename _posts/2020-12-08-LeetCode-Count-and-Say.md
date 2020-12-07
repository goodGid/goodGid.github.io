---
layout: post
title:  " LeetCode : 38. Count and Say "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [38. Count and Say](https://leetcode.com/problems/count-and-say/)

### Problem

```
The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
countAndSay(1) = "1"
countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1), which is then converted into a different digit string.
To determine how you "say" a digit string, split it into the minimal number of groups so that each group is a contiguous section all of the same character. Then for each group, say the number of characters, then say the character. To convert the saying into a digit string, replace the counts with a number and concatenate every saying.
```

---

### Example

```
Input: n = 1
Output: "1"
Explanation: This is the base case.
```



---

### Code (20. 12. 08)

``` java
class Solution {
    public String countAndSay(int n) {
        // 재귀니까 종료 조건이 반드시 필요
        if (n == 1) {
            return "1";
        }

        // Convert 되기 전 값
        String ans = countAndSay(n - 1);

        // Convert 된 후 값
        return read(ans);
    }

    public String read(String ans) {

        // 다루는 값은 0~9이므로 
        // 친근하게 배열 값으로 Counting을 하기로 생각함
        int[] countArray = new int[100];
        countArray[ans.charAt(0)]++;

        StringBuilder sb = new StringBuilder();

        for (int i = 1; i < ans.length(); i++) {
            if (countArray[ans.charAt(i)] == 0) {
                sb.append(countArray[ans.charAt(i - 1)]);
                sb.append(ans.charAt(i - 1));
                countArray[ans.charAt(i - 1)] = 0;
            }
            countArray[ans.charAt(i)]++;
        }

        sb.append(countArray[ans.charAt(ans.length() - 1)]);
        sb.append(ans.charAt(ans.length() - 1));

        return sb.toString();
    }
}
```

---

## Reference

* [38. Count and Say](https://leetcode.com/problems/count-and-say/)