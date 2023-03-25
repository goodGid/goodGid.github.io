---
layout: post
title:  " LeetCode : 380. Insert Delete GetRandom O(1) "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [380. Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)

### Problem

```
Implement the RandomizedSet class:
You must implement the functions of the class such that each function works in average O(1) time complexity.
```


---

### Example

```
Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]
```

---

### [1] Code (22. 06. 01)

*Need to Retry -> 시간 복잡도를 충족하는 코드를 짜보자.*

**Wrong Code**

``` java
// Ref : https://leetcode.com/submissions/detail/710088221
class RandomizedSet {
    Set<Integer> set;

    public RandomizedSet() {
        set = new HashSet<>();
    }

    public boolean insert(int val) {
        return set.add(val);
    }

    public boolean remove(int val) {
        return set.remove(val);
    }

    public int getRandom() {
        Iterator<Integer> iterator = set.iterator();
        int randomVal = -1;
        while (iterator.hasNext()) {
            Integer val = iterator.next();
            randomVal = val;
            break;
        }
        return randomVal;
    }
}
```

* 모든 TC를 통과하지 못했다.

  17 / 19 test cases passed

* getRandom( )는 $O(1)$ 로 동작하지 않는다.

* 또한 set 자료구조의 iterator에 대학 학습이 부족하여 랜덤으로 접근할 거라 오판을 했다.

---

> Accept Code

``` java
// Runtime: 130 ms
// Memory Usage: 94 MB
// Ref : https://leetcode.com/submissions/detail/711995777
class RandomizedSet {
    Set<Integer> set;

    public RandomizedSet() {
        set = new HashSet<>();
    }

    public boolean insert(int val) {
        return set.add(val);
    }

    public boolean remove(int val) {
        return set.remove(val);
    }

    public int getRandom() {
        Iterator<Integer> iterator = set.iterator();
        Random ran = new Random();
        int randomInt = ran.nextInt(set.size());

        for (int i = 0; i < randomInt; i++) {
            iterator.next();
        }
        return iterator.next();
    }
}
```

* Accept 하긴했지만 getRandom( )가 $O(1)$ 로 동작하지 않아

  문제 요구사항을 충족시키지 못한 틀린 코드이다.

---

> Reference Code

**Code 1**

``` java
class RandomizedSet {
    List<Integer> nums;
    Map<Integer, Integer> idxMap;
    Random random;

    public RandomizedSet() {
        nums = new ArrayList<>();
        idxMap = new HashMap<>();
        random = new Random();
    }

    public boolean insert(int val) {
        if (idxMap.containsKey(val)) {
            return false;
        }

        idxMap.put(val, nums.size());
        nums.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (!idxMap.containsKey(val)) {
            return false;
        }

        int idx = idxMap.get(val); // [1]
        int lastIdx = nums.size() - 1; // [2]
        if (idx != lastIdx) {
            int lastVal = nums.get(lastIdx); // [3]
            nums.set(idx, lastVal); // [4]
            idxMap.put(lastVal, idx); // [5]
        }
        nums.remove(lastIdx);
        idxMap.remove(val);
        return true;
    }

    public int getRandom() {
        return nums.get(random.nextInt(nums.size()));
    }
}
```

* ArrayList와 HashMap을 사용하면 $O(1)$ 로 모든 조건을 충족시킬 수 있다.

* 230325

  List에서 마지막 Index 값은 $O(1)$에 접근이 가능하다는 포인트를 이용하여 

  삭제하고자 하는 값의 Index와 Swap을 한다.

* [1] : 지우고자 하는 값이 List에서 몇 번째 Index에 위치하는지 찾는다.

* [2] : List의 마지막을 가리키기 위한 Index 값을 저장해 놓는다.

* [3] : List의 마지막 값을 추출한다.

* [4] : [1]에서 구한 Index 위치에 [3]에서 구한 값을 넣는다.

  그 이유는 삭제하고자 하는 값은 List에서 이제 불필요하다.

  그러므로 삭제하고자 하는 값이 위치하고 있는 List의 특정 Index에

  List의 마지막 값을 넣어줌으로써

  우리는 List의 마지막 값이 어떤 위치에 존재하는지 $O(1)$에 처리할 수 있다.

* [5] : List의 특정 Index로 Last Value를 수정해 줬으므로

  map에서도 Last Value가 어디 위치하는지를 나타내는 값을 수정해 준다.
  
---

> Review

* 재밌는 문제였다.

  이런 식의 $O(1)$ 을 요구하는 문제 스타일이 많이 약한 듯싶다.

---

### [2] Code (23. 03. 25)

*Need to Retry -> 다시 풀어보자*

``` java
// Runtime: 107 ms
// Memory Usage: 87.8 MB
// Ref : https://leetcode.com/submissions/detail/921803871
class RandomizedSet {
    private HashSet<Integer> set;
    private List<Integer> list;

    public RandomizedSet() {
        set = new HashSet<>();
        list = new LinkedList<>();
    }

    public boolean insert(int val) {
        if (set.contains(val)) {
            return false;
        }
        set.add(val);
        list.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (set.contains(val)) {
            set.remove(val);
            list.remove(list.indexOf(val));
            return true;
        }
        return false;
    }

    public int getRandom() {
        Random random = new Random();
        return list.get(Math.abs(random.nextInt() % list.size()));
    }
}
```

* 직관적인 풀이

---

> Reference Code

**Code 1**

``` java
// Wrong Code
// Ref : https://leetcode.com/submissions/detail/921793818
class RandomizedSet {
    private HashMap<Integer, Integer> map;
    private List<Integer> list;
    private int size;

    public RandomizedSet() {
        map = new HashMap<>();
        list = new LinkedList<>();
    }

    public boolean insert(int val) {
        if (map.containsKey(val)) {
            return false;
        }
        map.put(val, size++); // [1]
        list.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (map.containsKey(val)) {
            int idx = map.get(val);
            map.remove(val);
            list.remove(idx); // [2]
            return true;
        }
        return false;
    }

    public int getRandom() {
        Random random = new Random();
        return list.get(Math.abs(random.nextInt() % size));
    }
}
```

* 처음 접근했던 코드를 기록해 보자.

* 대체로 방향성은 정답 코드와 비슷하다.

* [1] : list에서 val가 어떤 index에 위치하는지 기록해 두기 위해 map 자료구조를 사용했다.

* [2] : 그런데 여기서 remove( )를 하는 순간 list에서 순서 변경을 감지하지 못해서 틀렸다.

---

**Code 2**

``` java
[1] Code (22. 06. 01) -> Reference Code 1 참고
```

---

> Review

* 저번에도 그랬지만 굉장히 재밌는 문제였다.


---

## Reference

* [380. Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)