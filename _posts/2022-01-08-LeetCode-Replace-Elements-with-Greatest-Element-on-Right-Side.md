---
layout: post
title:  " LeetCode : 1299. Replace Elements with Greatest Element on Right Side "
categories: LeetCode
author: goodGid
use_math: true
---
* content
{:toc}

## [1299. Replace Elements with Greatest Element on Right Side](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/)

### Problem

```
array with the greatest element among the elements to its right, and replace the last element with -1.
After doing so, return the array.
```


---

### Example

```
Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
```

---

### [1] Code (22. 01. 08) (x)

``` java
// Runtime: 2 ms
// Memory Usage: 51.7 MB
class Solution {
    public int[] replaceElements(int[] arr) {
        int size = arr.length;
        int[] ans = new int[size];
        ans[size - 1] = -1;

        int max = arr[size - 1];

        for (int i = size - 2; i >= 0; i--) {
            ans[i] = max;
            max = Math.max(max, arr[i]);
        }
        return ans;
    }
}
```

---

> Review

* 10분 소요

---

### [2] Code (22. 03. 06) (x)

``` java
// Runtime: 30 ms
// Memory Usage: 55.1 MB
// Ref : https://leetcode.com/submissions/detail/654117087
class Solution {
    public int[] replaceElements(int[] arr) {
        if (arr.length == 1) {
            return new int[]{-1};
        }
        int[] ans = new int[arr.length];

        PriorityQueue<Node> queue = new PriorityQueue<>();

        for (int i = 1; i < arr.length; i++) {
            queue.add(new Node(i, arr[i]));
        }

        ans[0] = queue.peek().value;
        ans[arr.length-1] = -1;
        int ansIdx = 1;

        while (!queue.isEmpty()) {
            Node node = queue.peek();
            if (ansIdx >= node.index) {
                queue.poll();
                continue;
            }
            ans[ansIdx] = queue.peek().value;
            ansIdx++;
        }

        return ans;
    }

    public class Node implements Comparable<Node> {
        private int index;
        private int value;

        public Node(int index, int value) {
            this.index = index;
            this.value = value;
        }

        @Override
        public int compareTo(Node newNode) {
            return newNode.value - value;
        }
    }
}
```

---

> Algorithm Description

* i번째에 i+1 ~ n 사이 가장 큰 값을 우선순위 큐를 사용하여 구한다.

---

> Reference Code

``` java
class Solution {
    public int[] replaceElements(int[] arr) {
        int max = -1;
        for (int i = arr.length - 1; i >= 0; i--) {
            int temp = arr[i];
            arr[i] = max;
            max = Math.max(max, temp);
        }
        return arr;
    }
}
```

* 추가로 공간을 사용하지 않고

  주어진 arr 배열만 사용해서도 답을 구할 수 있다.

---

> Review

* 우선순위 큐 사용 시 특정 키값으로 정렬하는 코드를 정리해놔야겠다.

  매번 사용할 때마다 헷갈리네 ㅎㅎ


---

## Reference

* [1299. Replace Elements with Greatest Element on Right Side](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/)