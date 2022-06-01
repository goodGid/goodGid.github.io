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

        int idx = idxMap.get(val);
        int lastIdx = nums.size() - 1;
        if (idx != lastIdx) {
            int lastVal = nums.get(lastIdx);
            nums.set(idx, lastVal);
            idxMap.put(lastVal, idx);
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

---

> Review

* 재밌는 문제였다.

  이런식의 $O(1)$ 을 요구하는 문제 스타일이 많이 약한 듯싶다.

---

## Reference

* [380. Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)