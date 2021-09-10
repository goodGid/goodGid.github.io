---
layout: post
title:  " LeetCode : 49. Group Anagrams "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)

### Problem

```
Given an array of strings strs, group the anagrams together. You can return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
```


---

### Example

```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

---

### [1] Code (21. 09. 10)

*Need to Retry*

``` java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        HashMap<String, List<String>> map = new HashMap<>();

        for (int i = 0; i < strs.length; i++) {
            final String value = strs[i];
            char[] charArray = strs[i].toCharArray();
            Arrays.sort(charArray);

            String key = Arrays.toString(charArray);
            if (map.containsKey(key)) {
                map.computeIfPresent(key, (k, v) -> {
                    v.add(value);
                    return v;
                });
            } else {
                map.put(key, new ArrayList<>(Collections.singleton(value)));
            }
        }

        List<List<String>> answer = new ArrayList<>();
        for (Map.Entry<String, List<String>> item : map.entrySet()) {
            answer.add(new ArrayList<>(item.getValue()));
        }

        return answer;
    }
}
```

> Concern Point

* Key를 어떻게 잡아야하는 지 고민이 됨

```
- 배열의 i값을 정렬 후 그 값을 Key로 사용해야겠다는 아이디어를 떠올렸다.
- 다른 정답 코드를 보는데 나와 동일한 아이디어로 Key를 설정했다.
```

---

* map.computeIfPresent에서 Bifunction 값을 어떻게 넣어줘야 하는지에 대한 고민

```
- 이전에도 비슷한 고민을 했는데 똑같은 고민을 하게 됨
```

---

> FeedBack

* List<List<String>>를 만들기 위해

  굳이 for문을 사용하지 않고 ArrayList의 생성자를 사용해서 처리할 수 있다.

``` java
// AS-IS
List<List<String>> answer = new ArrayList<>();
for (Map.Entry<String, List<String>> item : map.entrySet()) {
    answer.add(new ArrayList<>(item.getValue()));
}
return answer;

// TO-BE
return new ArrayList(map.values());
```

---

* Map에 이미 Key가 있는 경우 Value를 추가하는 작업을 간략하게 구현할 수 있다.

``` java
// AS-IS
map.computeIfPresent(key, (k, v) -> {
    v.add(value);
    return v;
});

// TO-BE
map.get(key).add(value);
```

---

> Review

* 문제를 보고 아이디어가 바로 떠오르진 않았지만

  고민을 했고 그 고민이 틀리지 않아서 좋다.

---

## Reference

* [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)