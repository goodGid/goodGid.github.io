---
layout: post
title:  " LeetCode : 763. Partition Labels "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [763. Partition Labels](https://leetcode.com/problems/partition-labels/)

### Problem

* Need to Retry

```
You are given a string s. 
We want to partition the string into as many parts as possible so that each letter appears in at most one part.
Return a list of integers representing the size of these parts.
```





---

### Example

```
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
```

---

### [1] Code (21. 07. 10)

``` java
class Solution {
    public List<Integer> partitionLabels(String s) {
        int size = s.length();
        List<Integer> answerList = new ArrayList<>();
        int[] alphaArray = new int[26];
        Arrays.fill(alphaArray, -1);

        char[] charArray = s.toCharArray();

        for (int i = 0; i < s.length(); i++) {
            alphaArray[charArray[i] - 'a'] = i;
        }

        int highIndex = -1;
        int stIndex = 0;

        for (int i = 0; i < size; i++) {
            if (alphaArray[charArray[i] - 'a'] > highIndex) {
                highIndex = alphaArray[charArray[i] - 'a'];
            }

            if (i == highIndex) {
                answerList.add(i - stIndex + 1);
                stIndex = i + 1;
            }
        }

        return answerList;
    }
}
```


> Algorithm Description

* [[LeetCode Medium] Partition Labels (Java)](https://bcp0109.tistory.com/205) 글에 그림과 함께 정리가 잘 되어있다.

---

> Wrong Reason

1. 문제 해석이 안됐다. 그러다보니 요구 사항을 파악할 수 없었다.

2. 문제를 이해하고 봤지만 아이디어가 떠오르지 않았다.

---

> Review

* 아이디어가 한끗차이로 떠오르지 않아서 아쉬웠다.

  그래도 언젠간 늘겠지 ㅎㅎ



---

## Reference

* [763. Partition Labels](https://leetcode.com/problems/partition-labels/)