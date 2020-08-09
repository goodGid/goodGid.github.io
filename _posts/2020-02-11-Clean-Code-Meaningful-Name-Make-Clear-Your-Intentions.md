---
layout: post
title:  " [Clean Code] 의미 있는 이름 (Meaningful name) : 의도를 분명히 밝혀라 "
categories: CleanCode
author: goodGid
---
* content
{:toc}

> 이 글의 개념 및 코드들은 책을 읽으며 정리한 내용을 바탕으로 작성하였습니다.

## 의도를 분명히 밝혀라 

* 주석이 필요하다면 의도를 분명히 드러내지 못했다는 말이다.


``` java
public List<int[]> getThem() {
    List<int[]> list1 = new ArrayList<int[]>();

    for (int[] x : theList) {
        if (x == 4) {
            list1.add(x);
        }
    }
    return list1;
}
```

* 위 코드를 보면

* 코드의 목적을 짐작하기 어렵다.







<br>

> Why?

* 각 변수의 역할이 

* 명시적으로 드러나지 않기 때문에 

* (= **함축성**을 갖고 있기 때문에)

* 코드 맥락을 이해하는게 어렵다.

<br>

* 만약 다음과 같은 정보를 아는 상황이였다면

* 위 코드가 쉽게 이해됐을 것이다.

1. theList가 갖고있는 값의 의미

2. 값 4의 의미

3. 함수가 반환하는 리스트 list1의 사용 용도

<br>

* 위의 코드는 지뢰찾기 게임을 만들기 위한 코드였다고 가정해보자.

* 그리고 다음과 같은 정보들이 제공되었다.

1. 1xN의 게임판이 있다.

2. 게임판의 각 칸은 단순 배열로 표현한다.

3. 해당 위치에 값이 4일 경우엔 **깃발(= Flag)**이 꽂혀있다.

4. 해당 위치에 값이 4가 아닐 경우엔 **지뢰**가 있다.

<br>

* 위 정보를 토대로

* 다시 코드를 보면 

* 처음보다 이해가 잘 될 것이다.

``` java
public List<int[]> getThem() {
    List<int[]> list1 = new ArrayList<int[]>();

    for (int[] x : theList) {
        if (x == 4) {
            list1.add(x);
        }
    }
    return list1;
}
```

<br>

* 조금만 더 Refactoring을 해보자.

* 변수명을 명시적으로 수정해주면

* 코드를 보다 명확하게 이해할 수 있다.

``` java
public List<int[]> getFlaggedCells() {
    List<int[]> flaggedCells = new ArrayList<int[]>();

    for (int[] cell : gameBoard) {
        if (cell == FLAGGED) {
            flaggedCells.add(cell);
        }
    }
    return flaggedCells;
}
```

<br>

* 또한 int 배열을 사용하는 대신

* 칸을 간단한 클래스로 만들어서 (= Cell)

* FLAGGED라는 상수를 사용하지 않고

* isFlagged라는 명시적인 함수를 사용하면

* 코드가 더 명확해진다.

``` java
public List<Cell> getFlaggedCells() {
    List<Cell> flaggedCells = new ArrayList<Cell>();

    for (Cell cell : gameBoard) {
        if (cell.isFlagged()) {
            flaggedCells.add(cell);
        }
    }
    return flaggedCells;
}
```



---

## Reference

* [Clean Code 애자일 소프트웨어 장인 정신](https://book.naver.com/bookdb/book_detail.nhn?bid=7390287)