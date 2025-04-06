---
layout: post
title: " LeetCode : 692. Top K Frequent Words "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [692. Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/)

### Problem

```
Given an array of strings words and an integer k, return the k most frequent strings.
Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.
```


---

### Example

```
Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.
```

---

### [1] Code (25. 04. 07)

``` java
class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        List<String> ans = new ArrayList<>();
        HashMap<String, Integer> map = new HashMap<>();

        for(String s : words) {
            map.put(s, map.getOrDefault(s, 0)+1);
        }

        PriorityQueue<Node> pq1 = new PriorityQueue<>((o1, o2) -> o2.getValue() - o1.getValue());

        for (String key : map.keySet()) {
            int val = map.get(key);
            pq1.add(new Node(key, val));
        }
                
        while (!pq1.isEmpty() && k > 0) {
            ans.add(pq1.poll().getS());
            k--;
        }
        Collections.sort(ans); // [1]
        return ans;
    }
}

class Node {
    private String s;
    private int value;

    public Node(String s, int value) {
        this.s = s;
        this.value = value;
    }

    public String getS() {
        return s;
    }

    public int getValue() {
        return value;
    }
}
```

* 틀린 코드 

* [1] : 그냥 Sort를 해버리면 많이 나온 Key와 적게 나온 Key를 구분하지 않고 정렬을 해버리는 실수를 하게 된다.

> Reference Code

**Code 1**

``` java
// Runtime: 7 ms
// Memory Usage: 44.25 MB
// Ref : https://leetcode.com/problems/top-k-frequent-words/submissions/1598675032
import java.util.*;

class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        List<String> ans = new ArrayList<>();
        HashMap<String, Integer> map = new HashMap<>();

        for (String s : words) {
            map.put(s, map.getOrDefault(s, 0) + 1);
        }

        PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> 
            map.get(a).equals(map.get(b)) ? a.compareTo(b) : map.get(b) - map.get(a) // [1]
        );

        pq.addAll(map.keySet()); // [2]

        while (!pq.isEmpty() && k > 0) {
            ans.add(pq.poll());
            k--;
        }

        return ans;
    }
}
```

* [1] : PriorityQueue를 정렬하는 로직

* [2] : Map에 있는 값들을 PriorityQueue에 일괄에 넣는 방법

---

## Reference

* [692. Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/)