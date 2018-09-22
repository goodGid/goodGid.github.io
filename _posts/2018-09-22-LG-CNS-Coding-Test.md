---
layout: post
title:  " 2018 LG CNS Code Monster 후기 "
categories: E.T.C
tags: E.T.C
author: goodGid
---
* content
{:toc}







---

## 1번

![](/assets/img/posts/lg_cns_code_monster_1_1.png)

![](/assets/img/posts/lg_cns_code_monster_1_2.png)

![](/assets/img/posts/lg_cns_code_monster_1_3.png)



``` cpp
int solution(vector<int> people, vector<int> tshirts) {
    int answer = 0;
    
    sort(people.begin(), people.end());
    sort(tshirts.begin(),tshirts.end());
    
    int size = (int) people.size();
    int t_size = (int) tshirts.size();
    
    int j = 0;
    for(int i=0; i<size; i++){
        if( i > t_size-1 || j >= t_size) break;
        if( people[i] <= tshirts[j]){
            answer ++;
            j++;
        }
        else{
            i--;
            j++;
        }
    }
    return answer;
}
```

* 단순 비교 문제

---


## 2번

![](/assets/img/posts/lg_cns_code_monster_2_1.png)

![](/assets/img/posts/lg_cns_code_monster_2_2.png)

![](/assets/img/posts/lg_cns_code_monster_2_3.png)

![](/assets/img/posts/lg_cns_code_monster_2_4.png)

![](/assets/img/posts/lg_cns_code_monster_2_5.png)


``` cpp
#include <iostream>
#include <queue>
#include <string>
#include <vector>
using namespace std;

int solution(int n, vector<vector<int>> house) {
    int answer = 0;
    int map[200][200];
    for(int i=0; i<200; i++) for(int j=0; j<200; j++) map[i][j] = 2e9;
    priority_queue<int> q;
    
    int house_size = (int) house.size();
    for(int i=0; i< house_size; i++){
        map[house[i][0] + 100 ][house[0][1] + 100] = -1;
    }
    
    for(int i=0; i<200; i++){
        for(int j=0; j<200; j++){
            if( map[i][j] == -1 )
                continue;
            
            for(int k=0; k<house_size; k++){
                int x = i - (house[k][0] + 100 );
                int y = j - (house[k][1] + 100 );
                
                if(map[i][j] > (x*x) + (y*y)){
                    map[i][j] = (x*x) + (y*y);
                    q.push(map[i][j]);
                }
            }
        }
    }
    for(int i=0; i<n-1; i++){
        q.pop();
    }
    answer = q.top();
    return answer;
}
```

* 좌표가 -100 ~ 100 이기 때문에 +100을 해줘서 좌표 이동을 해주었다.

* 좌표를 기준으로 해당 좌표값에서 House마다 거리를 계산해서 최소의 거리를 갖는다.

* 마지막에 House가 3이라면 queue에서 pop을 n-1번 한 후 answer에 q.top()을 넣는다.

* O( 200 * 200 * 100) <br> map 크기 : 200 , house 크기 : 100 


---

## 3번

![](/assets/img/posts/lg_cns_code_monster_3_1.png)

![](/assets/img/posts/lg_cns_code_monster_3_2.png)

![](/assets/img/posts/lg_cns_code_monster_3_3.png)

![](/assets/img/posts/lg_cns_code_monster_3_4.png)



``` cpp
#include <iostream>
#include <queue>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> solution(vector<int> healths, vector<vector<int>> _items) {
    vector<int> answer;
    for(int i=0; i<healths.size(); i++)
        healths[i] -= 100;
    sort(healths.begin(), healths.end());
    
    vector< pair<pair<int,int> , int >> items;
    for(int i=0; i<_items.size(); i++){
        items.push_back(   {  {_items[i][1], _items[i][0]  }, i   }     );
    }
    sort( items.begin(), items.end());
    
//    for(int i=0; i<_items.size(); i++){
//        cout << items[i].first.first << endl;
//    }
    
    int j = 0;
    priority_queue<pair<int,int>> q;
    for(int i=0; i<healths.size(); i++){
        for(int k=j; k<items.size(); k++){
            if(healths[i] >= items[j].first.first){
                q.push( {items[j].first.second, items[j].second} );
                j = k+1;
            }
            else
                break;
        }
        if(! q.empty()){
            int idx = q.top().second;
            q.pop();
            answer.push_back(idx);
        }
    }
    for(int i=0; i<answer.size(); i++)
        answer[i] += 1;
    sort(answer.begin(), answer.end());
    
    return answer;
}
```

* 최대 Heap을 사용한 문제 풀이

* Greedy 방식이다.


```
현재 체력 a
착용 시 최소 체력값 b:100
무기 착용 시 드는 값 c 

식을 세워보자면
a-c >= 100
=> a-100 >= c

20(200-100)     30
50(150-100)     100
100(200-100)    400
```

* 체력으로 sort <br> 무기 장착시 필요한 체력으로 sort

* 만약 현재 사람이 무기를 장착할 수 있으면 큐에 가능할 때 까지 push를 한다.

* 그리고 더이상 push를 못하면 pop을 한다. 그리고 그 값은 최대값이다. <br> why? 최대 Heap이기 때문에 power가 가장 큰 값을 가리킨다.

* 큐는 유지한 상태로 다음 사람을 본다.

* 큐를 유지하는 이유는 지금 사람이 들 수 있는건 그 다음 사람도 들 수 있기 때문이다. <br> 체력으로 sort를 했기 때문이다.

---

## Review

* 4번도 있었지만 과감히 패스 ㅎㅎ