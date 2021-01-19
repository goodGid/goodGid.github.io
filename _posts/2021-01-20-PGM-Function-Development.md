---
layout: post
title:  " [Programmers] 기능개발 "
categories: Algorithm
author: goodGid
---
* content
{:toc}

## [기능개발](https://programmers.co.kr/learn/courses/30/lessons/42586)

### Problem

```
먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.
```





---

### Example

* [문제 참고](https://programmers.co.kr/learn/courses/30/lessons/42586)

---

### [1] Code (21. 01. 20)

``` java
class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        LinkedList<Integer> answerList = new LinkedList<>();
        Queue<Node> queue = new LinkedList<>();

        // Init
        for (int i = 0; i < progresses.length; i++) {
            queue.add(new Node(progresses[i], speeds[i]));
        }

        while (!queue.isEmpty()) {
            int popCnt = 0;
            Node firstNode = queue.peek();

            // 먼저 배포되어야 하는 작업이 끝났는지 체크
            boolean isAvailablePop = false;
            if (firstNode.progress >= 100) {
                isAvailablePop = true;
            }

            // 먼저 배포되어야하는 작업이 끝났다면 같이 배포 가능한 목록들 존재 여부 체크
            while (isAvailablePop && !queue.isEmpty()) {
                Node node = queue.peek();

                if (node.progress >= 100) {
                    queue.poll();
                    popCnt++;
                } else {
                    break;
                }
            }

            // 나머지 작업들 진행
            work(queue);

            if (popCnt > 0) {
                answerList.add(popCnt);
            }
        }

        int[] answer = new int[answerList.size()];

        for (int i = 0; i < answerList.size(); i++) {
            answer[i] = answerList.get(i);
        }

        return answer;
    }

    private void work(Queue<Node> queue) {
        int size = queue.size();

        for (int i = 0; i < size; i++) {
            Node node = queue.poll();

            node.progress += node.speed;
            queue.add(node);
        }
    }

    private class Node {
        int progress;
        int speed;

        public Node(int progress, int speed) {
            this.progress = progress;
            this.speed = speed;
        }
    }
}
```

* 직관적으로 풀었다.

---

### [2] Code (21. 01. 20)

``` java
class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        int[] dayOfend = new int[100];
        int day = 1;
        for (int i = 0; i < progresses.length; i++) {
            while (progresses[i] + (day * speeds[i]) < 100) {
                day++;
            }
            dayOfend[day]++;
        }
        return Arrays.stream(dayOfend).filter(i -> i != 0).toArray();
    }
}
```

* 내가 푼 건 아니고 맞추고 다른 사람들 코드를 보며 공부를 하다 발견한 코드이다.

  코드가 굉장히 간결해졌다.

* 아이디어는 다음과 같다.

* 먼저 배포되어야 하는 작업이 끝나지 않으면 

  그 뒤에 있는 작업은 볼 필요가 없다.

* 그리고 day * speed를 하면 

  day 시간이 지난 후 작업의 진행량을 바로 알 수 있으므로

  매번 loop를 돌면서 계산할 필요가 없다.

  


---

## Reference

* [기능개발](https://programmers.co.kr/learn/courses/30/lessons/42586)