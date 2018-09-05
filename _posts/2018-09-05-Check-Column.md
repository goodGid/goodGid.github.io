---
layout: post
title:  "Column을 기준으로 값 체크하기"
categories: KeyPoint
tags: KeyPoint
author: goodGid
---
* content
{:toc}

## The Key Point

* Column을 기준으로 특정 조건 체크하기







## Problem
Problem URL : **[보호 필름](https://www.swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5V1SYKAaUDFAWu)**


---



## Code
``` cpp
// map[10][20]을 매개변수로 받았을 때
// Column별로 연속된 k값이 존재하는지 체크하는 문제
// c is Column 
// r is Row
bool chkCondition(int (*map)[20]){
    for(int i=0; i<c; i++){
        bool chk = false;

        for(int j=0; j<r; j++){
            int continue_cnt = 1;
            for(int s=1; j+s<r && s<k; s++){ // [1]
                if(map[j][i] != map[j+s][i]){
                    break;
                }
                continue_cnt ++;
            } // end of for s
            if(continue_cnt == k){
                chk = true;
                break;
            }
        } // end of for j

        // 해당 Column의 조건을 충족시키지 못했기 때문에 return false;
        if(!chk)
            return false;
    } // end of for i
    return true;
}
```