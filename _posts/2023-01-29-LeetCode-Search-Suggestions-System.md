---
layout: post
title: " LeetCode : 1268. Search Suggestions System "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1268. Search Suggestions System](https://leetcode.com/problems/search-suggestions-system/)

### Problem

```
You are given an array of strings products and a string searchWord.

Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.

Return a list of lists of the suggested products after each character of searchWord is typed.
```


---

### Example

```
Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
```

---

### [1] Code (23. 01. 29)

*Need to Retry*

``` java
// Runtime: 31 ms
// Memory Usage: 45.4 MB
// Ref : https://leetcode.com/submissions/detail/887448477
class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {

        Arrays.sort(products);
        List<List<String>> ans = new ArrayList<>();

        for (int i = 1; i <= searchWord.length(); i++) {
            String substring = searchWord.substring(0, i);

            List<String> subAns = new ArrayList<>();
            for (String p : products) {
                if (p.startsWith(substring)) {
                    subAns.add(p);
                }
                if (subAns.size() >= 3) {
                    break;
                }
            }
            ans.add(subAns);
        }
        return ans;
    }
}
```

---

> Reference Code

**Code 1**

``` java
// Runtime: 14 ms
// Memory Usage: 45.4 MB
// Ref : https://leetcode.com/submissions/detail/887464145
class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        List<List<String>> result = new LinkedList<>();
        // sorting
        Arrays.sort(products);

        for (int i = 0; i < searchWord.length(); i++) {result.add(new LinkedList<>());}
        int index = 0;
        int count = 0;

        while (index < products.length) {
            if (count == searchWord.length() * 3) {break;}
            // find min length 
            int len = Math.min(searchWord.length(), products[index].length()); // [1]
            for (int i = 0; i < len; i++) {
                if (products[index].charAt(i) == searchWord.charAt(i)) { // [2]
                    List<String> list = result.get(i);
                    // check limit
                    if (list.size() < 3) {
                        list.add(products[index]);
                        count++;
                    }
                } else {break;}
            }
            index++;
        }
        return result;
    }
}
```

* 내가 풀었던 로직과 동일

  Common Prefix를 찾기 위해

  xxx.startsWith( )를 사용했는데

  Code 1에서는 [1]에서 최소의 Length를 구하고 

  그 값을 사용하여 Common Prefix(=[2])를 찾는 로직을 구현하였다.

---

## Reference

* [1268. Search Suggestions System](https://leetcode.com/problems/search-suggestions-system/)