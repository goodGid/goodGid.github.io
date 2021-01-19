---
layout: post
title:  " [Programmers] 다리를 지나는 트럭 "
categories: Algorithm
author: goodGid
---
* content
{:toc}

## [다리를 지나는 트럭](https://programmers.co.kr/learn/courses/30/lessons/42583)

### Problem

```
트럭 여러 대가 강을 가로지르는 일 차선 다리를 정해진 순으로 건너려 합니다. 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 트럭은 1초에 1만큼 움직이며, 다리 길이는 bridge_length이고 다리는 무게 weight까지 견딥니다.
```





---

### Example

* [문제](https://programmers.co.kr/learn/courses/30/lessons/42583) 참고

---

### [1] Code (21. 01. 18)

``` java
class Solution {
    public int solution(int bridge_length, int weight, int[] truck_weights) {
        int idx = 0;
        int time = 0;
        int weightSum = 0;
        Queue<Truck> queue = new LinkedList<>();

        do {
            weightSum += clearQueueAndGetWeightSum(queue);
            time++;
            if (isAvaiablePush(truck_weights, weightSum, idx, weight)) {
                weightSum += truck_weights[idx];
                Truck truck = new Truck(truck_weights[idx], bridge_length - 1);
                queue.add(truck);
                idx++;
            }
        } while (!queue.isEmpty());
        return time;
    }

    private int clearQueueAndGetWeightSum(Queue<Truck> queue) {
        int weightSum = 0;
        int size = queue.size();

        for (int i = 0; i < size; i++) {
            Truck truck = queue.poll();
            weightSum -= truck.getTruckWeight();
            if (truck.getLength() != 0) {
                truck.setLength(truck.getLength() - 1);
                weightSum += truck.getTruckWeight();
                queue.add(truck);
            }
        }

        return weightSum;
    }

    private boolean isAvaiablePush(int[] truck_weights,
                                   int weightSum,
                                   int idx,
                                   int weight) {
        if (idx == truck_weights.length) {
            return false;
        }
        return weightSum + truck_weights[idx] <= weight;
    }

    private class Truck {
        int truckWeight;
        int length;

        public Truck(int truckWeight, int length) {
            this.truckWeight = truckWeight;
            this.length = length;
        }

        public int getTruckWeight() {
            return truckWeight;
        }

        public void setTruckWeight(int truckWeight) {
            this.truckWeight = truckWeight;
        }

        public int getLength() {
            return length;
        }

        public void setLength(int length) {
            this.length = length;
        }
    }
}
```

* 풀고 보니 그냥 truck.length 이렇게 접근해도 되었으므로 getter/setter는 필요 없었다.

  수도 코드를 손으로 작성 후 코드로 옮겨서 풀어보니 어렵지 않게 풀 수 있었다.


---

## Reference

* [다리를 지나는 트럭](https://programmers.co.kr/learn/courses/30/lessons/42583)