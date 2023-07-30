---
layout: post
title: " LeetCode : 332. Reconstruct Itinerary "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [332. Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary)

### Problem

```
You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. 
Reconstruct the itinerary in order and return it.
```


---

### Example

```
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
```

---

### [1] Code (23. 07. 30)

*Need to Retry -> Hard문제, 재밌었다.*

``` java
// 시간초과 발생 
// 11 / 80 test cases passed.
// Ref : https://leetcode.com/submissions/detail/1007490552
class Solution {
    private List<List<String>> ans = new ArrayList<>();
    HashMap<String, Queue<String>> map = new HashMap<>();
    private int edgeCnt;

    public List<String> findItinerary(List<List<String>> tickets) {
        HashSet<String> set = new HashSet<>();
        edgeCnt = tickets.size();

        for (List<String> item : tickets) {
            String from = item.get(0);
            String to = item.get(1);
            set.add(from);
            set.add(to);
        }

        for (List<String> item : tickets) {
            String from = item.get(0);
            String to = item.get(1);
            Queue<String> valueList = map.getOrDefault(from, new LinkedList<>());
            valueList.add(to);
            map.put(from, valueList);
        }

        ArrayList<String> list = new ArrayList<String>() {
            {
                add("JFK");
            }
        };

        go("JFK", list, 0);

        Collections.sort(ans, new LexicalOrderComparator());

        return ans.get(0);
    }

    private void go(String stNode, List<String> tempAns, int cnt) {
        if (cnt == edgeCnt) {
            ans.add(new ArrayList<>(tempAns));
            return;
        }

        Queue<String> queue = map.get(stNode);
        if (queue == null) {
            return;
        }

        int size = queue.size();

        for (int i = 0; i < size; i++) {
            String node = queue.poll();
            tempAns.add(node);
            go(node, tempAns, cnt + 1);
            tempAns.remove(tempAns.size() - 1);
            queue.add(node);
        }
    }
}

class LexicalOrderComparator implements Comparator<List<String>> {
    @Override
    public int compare(List<String> list1, List<String> list2) {
        String str1 = String.join("", list1);
        String str2 = String.join("", list2);
        return str1.compareTo(str2);
    }
}
```

* from.toList().add(B)를 한다.

* DFS 로직을 통해 정답을 찾는다.

* DFS 안에서 정답 리스트를 뽑아내고 **LexicalOrderComparator**를 통해 정렬을 한다.

---

> Reference Code

**Code 1**

``` java
// Runtime: 5 ms
// Memory Usage: 44.7 MB
// Ref : https://leetcode.com/submissions/detail/1007501682
// Ref : https://leetcode.com/problems/reconstruct-itinerary/discuss/78766/Share-my-solution

class Solution {
    Map<String, PriorityQueue<String>> flights;
    LinkedList<String> path;

    public List<String> findItinerary(List<List<String>> tickets) {
        flights = new HashMap<>();
        path = new LinkedList<>();
        for (List<String> ticket : tickets) {
            flights.putIfAbsent(ticket.get(0), new PriorityQueue<>());
            flights.get(ticket.get(0)).add(ticket.get(1));
        }
        dfs("JFK");
        return path;
    }

    public void dfs(String departure) {
        PriorityQueue<String> arrivals = flights.get(departure);
        while (arrivals != null && !arrivals.isEmpty()) {
            dfs(arrivals.poll());
        }
        path.addFirst(departure);
    }
}
```

* 너무나도 심플한 코드

* lexical order을 위해서 PriorityQueue를 사용한다.

---

> 배운 점

* map 기본 값 세팅 & 값 추가

``` java
// AS-IS
Queue<String> valueList = map.getOrDefault(from, new LinkedList<>());
valueList.add(to);
map.put(from, valueList);

// TO-BE
flights.putIfAbsent(ticket.get(0), new PriorityQueue<>());
flights.get(ticket.get(0)).add(ticket.get(1));
```

* LexicalOrderComparator 대신 PriorityQueue를 사용

---

> Review

* 하드문제여서 처음에 움찔했다가

  별거 있겠어? 하고 접근했는데

  생각보다 풀만했다. (물론 시간초과가 떴지만...)

* 다음엔 맞출 수 있겠지 @_@?


---

## Reference

* [332. Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary)