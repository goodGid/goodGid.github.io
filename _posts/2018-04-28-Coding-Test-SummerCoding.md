---
layout: post
title:  " 2018 SummerCoding - 여름방학 스타트업 인턴 프로그램 "
categories: E.T.C
tags: E.T.C
author: goodGid
---
* content
{:toc}



> [2018 SummerCoding - 여름방학 스타트업 인턴 프로그램](https://programmers.co.kr/competitions/59/2018-summercoding-%EC%97%AC%EB%A6%84%EB%B0%A9%ED%95%99-%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85-%EC%9D%B8%ED%84%B4-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8)


{% capture images %}
    /assets/img/coding_test/sc_1.png
    /assets/img/coding_test/sc_2.png
    /assets/img/coding_test/sc_3.png
    /assets/img/coding_test/sc_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=4 %}

---

# Review

* 코딩 테스트를 봤다.

* 구현쪽이 확실히 부족하다.

* 1번은 문제를 잘못읽었다. <br> `정독`을 잘하자 !

* 3개다 풀었다. 

* 2번문제정도만 다시 보면 될 듯 <br> 재훈이는 이전에 있는 값들을 `map`을 사용했다는데... 공부해봐야겠다.

---

# Problem


<br>


## 1번


{% capture images %}
    /assets/img/coding_test/sc_1_1.png
    /assets/img/coding_test/sc_1_2.png
    /assets/img/coding_test/sc_1_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=3 %}


``` cpp

#include <iostream>
#include <stdio.h>
#include <string>
#include <vector>

using namespace std;

int solution(vector<int> d, int budget) {
    int answer = 0;
    return answer;
}


```





---


## 2번


{% capture images %}
    /assets/img/coding_test/sc_2_1.png
    /assets/img/coding_test/sc_2_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}


{% capture images %}
    /assets/img/coding_test/sc_2_3.png
    /assets/img/coding_test/sc_2_4.png
{% endcapture %}
{% include gallery images=images caption=" " cols=2 %}


``` cpp

#include <string>
#include <vector>
#include <iostream>

using namespace std;

vector<int> solution(int n, vector<string> words) {
    vector<int> answer;
    
    // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다. 
    cout << "Hello Cpp" << endl;

    return answer;
}




```




---



## 3번


{% capture images %}
    /assets/img/coding_test/sc_3_1.png
    /assets/img/coding_test/sc_3_2.png
    /assets/img/coding_test/sc_3_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=3 %}


``` cpp

#include <string>
#include <vector>

using namespace std;

int solution(vector<int> A, vector<int> B) {
    int answer = 0;
    return answer;
}

```


---

# Answer


## 1번

``` cpp


int solution(vector<int> d, int budget) {
   sort(d.begin(), d.end());
   

   int answer = 0;
   for (int i = 0; i < d.size(); i++) {
      if (budget - d[i] < 0) break;
      budget -= d[i];
      answer++;
   }
   return answer;
}



```

* 내 Code가 날라가서 재훈이껄로 대체 ! 

---

## 2번


``` cpp

// 2번

#include <string>
#include <vector>
#include <iostream>

using namespace std;

vector<int> solution(int n, vector<string> words) {
    vector<int> answer;
    int size = (int)words.size();
    
    int idx=2;
    for(int i=1; i<size; i++){
        if(words[i].size() == 1 || words[i-1][words[i-1].size()-1] != words[i][0]){
            answer.push_back(idx);
            int value = i / n ;
            answer.push_back(value+1);
            return answer;
        }
        
        for(int j=0; j<i; j++){
            if(words[i] == words[j]){
                answer.push_back(idx);
                int value = (i-1) / n ;
                answer.push_back(value+1);
                return answer;
            }
        }
        idx = idx % n + 1;
    }
    
    answer.push_back(0);
    answer.push_back(0);
    
    return answer;
}


int main(){
    
    //[tank, kick, know, wheel, land, dream, mother, robot, tank]
    int n = 2 ;
    
    // [hello, one, even, never, now, world, draw]
    vector<string> v;
    v.push_back("hello");v.push_back("one");v.push_back("even");
    v.push_back("never");v.push_back("now");v.push_back("world");
    v.push_back("draw");
    
    vector<int> ans = solution(n,v);
    cout << ans[0] << endl;
    cout << ans[1] << endl;
    
    
    
    return 0;
}



```



---

## 3번


``` cpp

#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int solution(vector<int> A, vector<int> B) {
    int answer = 0;
    sort(A.begin(),A.end());
    sort(B.begin(),B.end());
    int size = B.size();
    
    int idx = 0;
    for(int i=0; i<size; i++){
        if(B[i] > A[idx]){
            answer++;
            idx++;
        }
    }
    return answer;
}

```

