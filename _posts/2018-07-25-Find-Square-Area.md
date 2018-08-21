---
layout: post
title:  "가장 큰 정사각형 찾기"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## Problem 
Problem URL : **[가장 큰 정사각형 찾기](https://programmers.co.kr/learn/courses/30/lessons/12905)**


{% capture images %}
    /assets/img/algorithm/find_square_area_1.png
    /assets/img/algorithm/find_square_area_2.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=2 %}

---




## Code

``` cpp

int dp[1001][1001];

int solution(vector<vector<int>> board){
    int answer = 0;
    int r_size = (int)board.size();
    int c_size = (int)board[0].size();
    
    for(int i=0; i<r_size; i++){
        for(int j=0; j<c_size; j++){
            if( i==0 || j == 0) {
                dp[i][j] = board[i][j];
                answer = answer < dp[i][j] ? dp[i][j] : answer;
                continue;
            }
            if(board[i][j]){
                dp[i][j] = min({ dp[i-1][j], dp[i][j-1], dp[i-1][j-1] }) + 1;
                answer = answer < dp[i][j] ? dp[i][j] : answer;
            }
        }
    }
    answer *=  answer;
    
    return answer;
}

```


---

## Feed Back 

* [Algorithm 설명](http://ksj14.tistory.com/entry/BackJoon1915-%EA%B0%80%EC%9E%A5-%ED%81%B0-%EC%A0%95%EC%82%AC%EA%B0%81%ED%98%95)

{% capture images %}
    /assets/img/algorithm/find_square_area_3.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Problem Explain" cols=1 %}

