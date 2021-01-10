---
layout: post
title:  " LeetCode : 341. Flatten Nested List Iterator "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [341. Flatten Nested List Iterator](https://leetcode.com/problems/flatten-nested-list-iterator/)

### Problem

```
Given a nested list of integers, implement an iterator to flatten it.
Each element is either an integer, or a list -- whose elements may also be integers or other lists.
```





---

### Example

```
Input: [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
Explanation: By calling next repeatedly until hasNext returns false, 
             the order of elements returned by next should be: [1,1,2,1,1].
```

---

### [1] Code (21. 01. 10)

``` java
class NestedIterator implements Iterator<Integer> {
    Deque<NestedInteger> deque = new ArrayDeque<>();

    public NestedIterator(List<NestedInteger> nestedList) {
        flatList(nestedList);
    }

    @Override
    public Integer next() {
        if (!hasNext()) {
            return null;
        }
        return deque.poll().getInteger();
    }

    @Override
    public boolean hasNext() {
        while (!deque.isEmpty() && !deque.getFirst().isInteger()) {
            List<NestedInteger> subList = deque.poll().getList();
            flatList(subList);
        }
        return !deque.isEmpty();
    }

    private void flatList(List<NestedInteger> nestedIntegerList) {
        for (int i = nestedIntegerList.size() - 1; i >= 0; i--) {
            deque.addFirst(nestedIntegerList.get(i));
        }
    }
}
```

* 신선한 스타일의 문제여서 당황했다.

* 코드의 효율성은 그리 좋지 않다.

  더 좋은 코드들을 참고하도록 하자 ! 

* Deque 자료구조로 풀어봤는데

  사용법이 익숙지 않아서 이참에 정리를 해봤다.

  [Java Deque 문법 알아보기]({{site.url}}/Java-Deque-Grammer/)

---

## Reference

* [341. Flatten Nested List Iterator](https://leetcode.com/problems/flatten-nested-list-iterator/)
