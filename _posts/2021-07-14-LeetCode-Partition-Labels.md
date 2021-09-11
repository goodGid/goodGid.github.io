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

*Need to Retry*

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

### [2] Code (21. 09. 11)

*Need to Retry*

``` java
public List<Integer> partitionLabels(String s) {

    List<Integer> ansList = new ArrayList<>();
    boolean[] visit = new boolean[26];
    int[] dp = new int[26];

    char[] charArray = s.toCharArray();
    int size = charArray.length;
    for (int i = 0; i < size; i++) {
        dp[charArray[i] - 'a']++;
    }

    int length = 0;
    StringBuilder sb = new StringBuilder();

    for (int i = 0; i < size; i++) {
        int idx = charArray[i] - 'a';

        if (dp[idx] != 0 && visit[idx] == false) {
            visit[idx] = true;
            length += dp[idx];
        }

        sb.append(charArray[i]);
        length--;

        if (length == 0) {
            ansList.add(sb.toString().length());
            sb = new StringBuilder();
        }
    }
    return ansList;
}
```

> Algorithm Description

* 1개 파트에 모든 값이 나와야하므로 length 값을 사용하여 1개 파트를 선정하였다.

---

> Concern Point

* String -> Char 배열로 변환하는 코드 IDE 없이 하려니 헷갈렸다.

``` java
char[] charArray = s.toCharArray();
```

---

* StringBuilder에 담은 값을 String으로 출력하는 문법이 헷갈렸다.

``` java
sb.toString()
```

---

> Review

* 2달 만에 다시 풀었는데 스스로 힘으로 맞췄다.

* 크게 보면 이전 풀이와 아이디어는 비슷하지만 살짝 다른 부분을 볼 수 있다.


---

## Reference

* [763. Partition Labels](https://leetcode.com/problems/partition-labels/)