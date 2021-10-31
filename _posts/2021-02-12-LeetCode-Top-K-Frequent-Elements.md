---
layout: post
title:  " LeetCode : 347. Top K Frequent Elements "
categories: LeetCode
author: goodGid
---
* content
{:toc}

## [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

### Problem

```
Given a non-empty array of integers, return the k most frequent elements.
```





---

### Example

```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

---

### [1] Code (21. 02. 12)

``` java
class Solution {
    public int[] topKFrequent(int[] nums, int k) {

        HashMap<Integer, Integer> map = new HashMap<>();

        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }

        PriorityQueue<int[]> pQueue = new PriorityQueue<>(
                (newItem, oldItem) -> Integer.compare(oldItem[1], newItem[1]));

        for (Map.Entry<Integer, Integer> entries : map.entrySet()) {
            pQueue.add(new int[] { // [1]
                    entries.getKey(),
                    entries.getValue()
            });
        }

        int[] ans = new int[k];
        for (int i = 0; i < k; i++) {
            ans[i] = pQueue.poll()[0];
        }
        return ans;
    }
}
```

> Check Point

1. 주어진 배열에서 k번째까지 많이 나온 값을 출력

2. 시간 복잡도는 O(nlogn)

3. 정답 배열의 순서는 상관없다.

---

> Algorithm Description

* Map에 input으로 들어온 모든 값을 넣는다.

  그리고 해당 값을 이용해 k번째까지 많이 나온 값을 뽑아내면 된다.

* [1] : pQueue에 넣을 때 Object를 만들어야 하나 고민했는데

  굳이 그럴 필요 없이 int[] 형식으로 넣었다.

  은근한 꿀 팁이지 않을까 싶다.

---

> Review

* Map에 넣는 거까지는 쉬웠는데

  Map에 있는 값들을 sort 하는 부분에 대한 고민이 생겼다.

* 위 고민에 대한 해답으로는 Heap 자료구조를 사용하였다.

---

### [2] Code (21. 08. 29)

``` java
class Solution {
    public int[] topKFrequent(int[] nums, int k) {

        HashMap<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(nums[i])) {
                map.computeIfPresent(nums[i], (key, value) -> {
                    return value + 1;
                });
            } else {
                map.put(nums[i], 1);
            }
        }

        List<Node> nodeList = new LinkedList<>();

        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            Integer key = entry.getKey();
            Integer value = entry.getValue();
            nodeList.add(new Node(key, value));
        }

        List<Node> sortedNodeList = nodeList.stream()
                                            .sorted((a, b) -> b.value - a.value)
                                            .limit(k)
                                            .collect(Collectors.toList());

        int[] ans = new int[k];
        for (int i = 0; i < sortedNodeList.size(); i++) {
            ans[i] = sortedNodeList.get(i).key;
        }
        return ans;
    }

    public class Node {
        int key;
        int value;

        public Node(int key, int value) {
            this.key = key;
            this.value = value;
        }

    }
}
```

> Algorithm Description

* 정렬 후 문제 조건에 맞게 값을 추출한다.

---

> FeedBack

* HashMap 사용 시 키값 존재 여부에 따른 깔끔한 로직처리에 대한 고민

``` java
for (int n : nums) {
    map.put(n, map.getOrDefault(n, 0) + 1);
}
```

* map.computeIfPresent에서 Bifunction 값을 어떻게 넣어줘야 하는지에 대한 고민

``` java
map.computeIfPresent(nums[i], (key, value) -> value + 1);
```

* map에서 Key-Value를 가지고 오는 문법

``` java
for (Entry<Integer, Integer> entry : map.entrySet()) 
```

* List를 특정 기준값으로 정렬하는 방법

``` java
List<Node> sortedNodeList = nodeList.stream()
                                    .sorted((a, b) -> b.value - a.value)
                                    .collect(Collectors.toList());
```

---

> Reference Code

``` java
class Solution {
    Map<Integer, Integer> freqMap = new HashMap<>();

    public int[] topKFrequent(int[] nums, int k) {
        for (int i = 0; i < nums.length; i++) {
            freqMap.put(nums[i], freqMap.getOrDefault(nums[i], 0) + 1);
        }

        LinkedHashMap<Integer, Integer> sortedMap = 
        freqMap.entrySet()
                .stream()
                .sorted((Map.Entry.<Integer, Integer>comparingByValue().reversed())) // [1]
                .collect(Collectors.toMap(Map.Entry::getKey, // [2]
                                          Map.Entry::getValue,
                                          (e1, e2) -> e1,
                                          LinkedHashMap::new)); // [3]

        int[] rval = new int[k];
        Iterator<Map.Entry<Integer, Integer>> iterator = sortedMap.entrySet().iterator();
        for (int i = 0; i < k; i++) {
            rval[i] = iterator.next().getKey();
        }
        return rval;
    }
}
```

* Java Stream을 적절하게 사용해 풀이한 코드를 기록해둔다.

* [1] : Map.Entry.<Integer, Integer>comparingByValue( ).reversed( ) 메소드를 사용하여 정렬할 수 있다.

* [2], [3] : Collectors.toMap( )를 사용하여 원하는 Return Type(=LinkedHashMap::new)을 명시할 수 있다.

---

> Review

* [[1] Code (21. 02. 12) 풀이]({{site.url}}/LeetCode-Top-K-Frequent-Elements/#1-code-21-02-12)와는 정말 다른 방향으로 풀었다.

* 그리고 코딩하면서 문법 사용이 익숙지 않은 것들에 대해선 FeedBack에 정리를 놓았으니 다음에 참고하자.

---

### [3] Code (21. 10. 31)

*Need to Retry -> 다양한 정답 코드아이디어와 Stream 문법들을 보면서 다시 풀어보자.*

``` java
n/a
```

> Reference Code

``` java
class Solution {
    public int[] topKFrequent(int[] nums, int k) {

        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int n : nums) {
            freqMap.compute(n, (key, v) -> v == null ? 1 : v + 1);
        }

        List<List<Integer>> freqMapReverse = new ArrayList<>();
        for (int i = 0; i <= nums.length; i++) {
            freqMapReverse.add(new ArrayList<>()); // [1]
        }

        for (int n : freqMap.keySet()) { // [2]
            int freq = freqMap.get(n);
            freqMapReverse.get(freq).add(n);
        }

        int[] res = new int[k];
        int j = 0;
        for (int i = freqMapReverse.size() - 1; i >= 0; i--) { // [3]
            List<Integer> elements = freqMapReverse.get(i);
            if (elements.size() != 0) {
                for (int e : elements) {
                    res[j++] = e; // [4]
                    if (j == k) {
                        return res;
                    }
                }
            }
        }
        return res;
    }
}
```

* [1] : nums.length만큼 우선 List를 생성해둔다.

* [2] : freqMapReverse에 값을 담는다.

  만약 [1,1,1,2,2,2,3] 과 같이 동일한 수가 나오면

  freqMapReverse[3]에 [1,2]가 저장되게 된다.

* [3] : nums.length ~ 0 순서로 순회를 돈다.

  nums.length부터 도는 이유는

  nums에 중복된 값이 많을수록

  freqMapReverse의 높은 Index에 존재하기 때문이다.

* [4] : *You may return the answer in any order* 이므로

  중복된 값이 같을 땐 순서 상관없이 처리해도 된다.

---

> FeedBack

* 아이디어는 쉽게 떠올리나 구현하는 데 있어 어려움이 있었다.

  특히 적절한 문법을 사용하는데 너무 어려웠고

  이전에 문제 풀었을 때와 마찬가지로 비슷한 문법 사용법에 대해 아직 미숙함을 느낀다.


---

## Reference

* [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)