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


### [2] Code (21. 11. 01)

*Need to Retry -> Java 기초 문법이 너무 부족하다.*

``` java
solution.groupAnagrams(new String[] {"eat","tea","tan","ate","nat","bat"})); // [1]

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> ans = new ArrayList<>();
        HashMap<String, List<String>> map = new HashMap<>(); // [2]

        for (String s : strs) {
            char[] tempArray = s.toCharArray();
            Arrays.sort(tempArray); // [3]
            String key = String.valueOf(tempArray); // [4]
            if (map.containsKey(key)) {
                map.get(key).add(s);
            } else {
                map.put(key, new ArrayList<String>() { // [5]
                    {
                        add(s);
                    }
                });
            }
        }

        for (Map.Entry<String, ArrayList<String>> item : map.entrySet()) { // [6]
            ans.add(item.getValue());
        }
        return ans;
    }
}
```

> Concern Point

**[1] : String[ ]을 초기화하면서 값 넣어주기**

``` java
new String[] {"eat","tea","tan","ate","nat","bat"}
```

* { } 안에 값을 넣어주면 된다.

---

**[2] : Map에서 Value에 List로 선언 시 주의할 점**

``` java
map.put(key, Arrays.asList());
map.get(key).add("goodGid");
// .add( )하는 시점에 Exception이 발생한다.
// Exception in thread "main" java.lang.UnsupportedOperationException
```

* List에 add를 하려고 하면 UnsupportedOperationException이 발생한다.

  그래서 위에서 원하는 로직을 실행시키려면 다음과 같이 수정해야 한다.

``` java
map.put(key, new ArrayList<>());
map.get(key).add("goodGid");
```

* 즉 map의 value로 interface가 아닌 class 자료형을 사용해야 한다.

---

**[3] : 알파벳 순서로 정렬하기**

```
Arrays.sort(tempArray);
```

---

**[4] : char[ ]을 String으로 변환하기**

``` java
char[] tempArray = s.toCharArray();
1) String key = String.valueOf(tempArray);
2) String key = new String(tempArray);
```

* 2가지 방법으로 char[ ]을 String 값으로 변환할 수 있다.

*String 생성자 이용*

``` java
public String(char value[]) {
    this.value = Arrays.copyOf(value, value.length);
}
```

*String 메소드 이용*

``` java
public static String valueOf(char data[]) {
    return new String(data);
}
```

---

**[5] : ArrayList를 선언과 동시에 값 할당하는 방법**

``` java
new ArrayList<String>() {
    {
        add(s);
    }
}
```

---

**[6] : List의 addAll( ) 사용하기**

``` java
ans.addAll(map.values());
```

---

> Review

* Java 문법이 너무 약함을 많이 느꼈다.

  머리로 떠오르는 아이디어를 직접 구현하려니 막히는 부분이 너무 많았다.

---

## Reference

* [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)