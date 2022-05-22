---
layout: post
title:  " LeetCode : 131. Palindrome Partitioning "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [131. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning)

### Problem

```
Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.
A palindrome string is a string that reads the same backward as forward.
```


---

### Example

```
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
```

---

### [1] Code (22. 05. 23)

*Need to Retry -> 아이디어를 못 떠올렸다*

``` java
// n/a
```

---

> Reference Code

``` java
// Runtime: 16 ms
// Memory Usage: 193.5 MB
// Ref : https://leetcode.com/submissions/detail/704839600
class Solution {
    public List<List<String>> partition(String s) {
        int len = s.length();
        boolean[][] dp = new boolean[len][len];
        List<List<String>> result = new ArrayList<>();
        dfs(result, s, 0, new ArrayList<>(), dp);
        return result;
    }

    void dfs(List<List<String>> result, String s, int start, List<String> currentList, boolean[][] dp) {
        if (start >= s.length()) {result.add(new ArrayList<>(currentList));}
        for (int end = start; end < s.length(); end++) {
            if (s.charAt(start) == s.charAt(end) && (end - start <= 1  || dp[start + 1][end - 1])) {
                dp[start][end] = true;
                currentList.add(s.substring(start, end + 1));
                dfs(result, s, end + 1, currentList, dp);
                currentList.remove(currentList.size() - 1);
            }
        }
    }
}
```

* 자세한 설명은 문제의 [Solution](https://leetcode.com/problems/palindrome-partitioning/solution)을 참고하자.


---

## Reference

* [131. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning)