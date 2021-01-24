---
layout: post
title:  " [Programmers] 가장 큰 수 "
categories: Algorithm
author: goodGid
---
* content
{:toc}

## [가장 큰 수](https://programmers.co.kr/learn/courses/30/lessons/42746)

### Problem

```
0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.
```





---

### Example

* [문제 참고](https://programmers.co.kr/learn/courses/30/lessons/42746)

---

### [1] Wrong Code (21. 01. 24)

``` java
class Solution {
    private String answer = "";
    private int[] check;

    public String solution(int[] numbers) {
        check = new int[numbers.length];
        recur(numbers, 0, "");
        return answer;
    }

    private void recur(int[] numbers, int cnt, String s) {
        if (cnt == numbers.length) {
            validate(s);
            return;
        }

        for (int i = 0; i < numbers.length; i++) {
            if (check[i] == 1) {
                continue;
            }
            check[i] = 1;
            recur(numbers, cnt + 1, s + numbers[i]);
            check[i] = 0;
        }
    }

    private void validate(String s) {
        if (answer.length() == 0) {
            answer = s;
            return;
        }

        int length = answer.length();

        for (int i = 0; i < length; i++) {
            if (answer.charAt(i) > s.charAt(i)) {
                return;
            } else if (answer.charAt(i) < s.charAt(i)) {
                answer = s;
                return;
            }
        }
    }
}
```

* 아무 생각 없이 recursive 하게 접근을 했고 

  테스트 케이스는 다 맞췄으나

  정답 제출을 하니 엄청난 메모리 초과와 시간 초과가 날 반겨줬다.

---


### [2] Accept Code (21. 01. 24)

``` java
class Solution {

    public String solution(int[] numbers) {

        // 숫자를 문자열로 변환
        String[] result = new String[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            result[i] = String.valueOf(numbers[i]);
        }

        // [1-1]
        Arrays.sort(result, (o1, o2) -> (o2 + o1).compareTo(o1 + o2));

        // [1-2]
        Arrays.sort(result, new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return ((o2 + o1).compareTo(o1 + o2));
            }
        });

        // 0만 여러개 있는 배열의 경우 하나의 0만 리턴
        if (result[0].equals("0")) {
            return "0";
        }

        String answer = "";
        // 정렬된 문자 하나로 합치기
        for (String a : result) {
            answer += a;
        }
        return answer;
    }
}
```

* [1-1], [1-2] : 핵심은 Comparator Interface를 정의하는 부분이다.

  쉽지 않았던 문제였다.

  그래도 Comparator에 대해 학습할 수 있는 계기가 되었다.


---

## Reference

* [가장 큰 수](https://programmers.co.kr/learn/courses/30/lessons/42746)