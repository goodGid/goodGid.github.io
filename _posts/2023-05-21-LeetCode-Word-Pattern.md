---
layout: post
title: " LeetCode : 290. Word Pattern "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [290. Word Pattern](https://leetcode.com/problems/word-pattern)

### Problem

```
Given a pattern and a string s, find if s follows the same pattern.
Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.
```


---

### Example

```
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
```

---

### [1] Code (23. 05. 21) (X)

``` java
// Runtime: 1 ms
// Memory Usage: 40.6 MB
// Ref : https://leetcode.com/submissions/detail/954297261
class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] splitList = s.split(" ");
        if (pattern.length() != splitList.length) {
            return false;
        }

        Map<Character, String> map = new HashMap<>();

        for (int i = 0; i < pattern.length(); i++) {

            char key = pattern.charAt(i);

            if (map.containsValue(splitList[i]) && map.containsKey(pattern.charAt(i)) == false) { // [1]
                return false;
            }

            if (!map.containsKey(key)) {
                map.put(key, splitList[i]);
            } else {
                if (!map.get(key).equals(splitList[i])) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

* [1] : if 없이 제출을 하니까 틀렸다.

``` java
// Ref : https://leetcode.com/submissions/detail/954294613
"abba"
"dog dog dog dog"
Output: true
Expected: false
```

* "Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s."

  -> 수학에서, 전단사 함수(全單射函數, 영어: bijection, bijective function)는 두 집합 사이를 중복 없이 모두 일대일로 대응시키는 함수이다. 일대일 대응이라고도 한다.

  즉 Key <-> Value 는 1:1로만 대응이 되어야 한다.

---

> Review

* 수학적 단어를 몰라서 틀렸다.

  이건 어쩔 수 없이 틀릴 수밖에 없지 않을까 싶다.

* 다만 특정 단어를 보고 그냥 넘어가는 습관은 좋지 않으니

  다음엔 모르는 단어가 나오면 정확한 뜻을 짚고 넘어가도록 하자 !


---

## Reference

* [290. Word Pattern](https://leetcode.com/problems/word-pattern)