---
layout: post
title:  " Github Actions를 사용하여 Daily Coding 시간 확인 "
categories: Technology
author: goodGid
---
* content
{:toc}

## Prologue

* Github을 구경하다 굉장히 재미난 기능을 봤다.

* Commit 시간을 기준으로 

  ( Morning / Daytime / Evening / Night )

  어느 시간에 Coding을 가장 많이 했는지 알려주는 기능이다.

* 이 기능을 개발하신 분은 

  TW(Tawian) 출신의 [maxam2017](https://github.com/maxam2017)이란 Github ID를 사용하시는 분이시고 
  
  관련 Repository는 [productive-box](https://github.com/maxam2017/productive-box)이다.





---


## Goal

* 이 글의 목표는 위 기능을 사용하기 위한 Setup 과정을 살펴보고

  실제로 따라 하면서 자신의 Github에 적용하는 걸 목표로 한다.

  사실 과정을 따라하면 자연스럽게 적용이 된다. ㅎㅎ


---


## Setup

> Step 1

* Public으로 [Gist](https://gist.github.com/)를 생성합니다. 

    - 생서시 입력한 제목과 내용은 어차피 Override 되기 때문에 편하게 Gist를 생성합니다.

    - 그리고 사진 속에 표시된 값을 GIST_ID로 사용해야 하기 때문에 기록해둡니다.

![](/assets/img/posts/Github-Actions-Daily-Coding-Time_1.png)

---

> Step 2

* [Personal access tokens](https://github.com/settings/tokens/new)에서 Token을 생성합니다.

    - Select scopes은 자유롭게 선택하셔도 됩니다.

    - 생성 후 Token Key 값을 GH_TOKEN 값으로 사용해야하기 때문에 기록해둡니다.
    
![](/assets/img/posts/Github-Actions-Daily-Coding-Time_2.png)

---

> Step 3

* Repository를 Fork 합니다.

* 그리고 Fork한 Repository에서 Actions 탭을 누른 후 활성화 시켜줍니다.

![](/assets/img/posts/Github-Actions-Daily-Coding-Time_3.png)

---

> Step 4

* Repository -> Settings -> Secrets에서 **GIST_ID**와 **GH_TOKEN**를 생성해줍니다.

    - GIST_ID : [Gist](https://gist.github.com/)를 만들고 생긴 Key 값

    - GH_TOKEN : [Personal access tokens](https://github.com/settings/tokens/new)에서 생성한 Token 값
    
    
![](/assets/img/posts/Github-Actions-Daily-Coding-Time_4.png)

---

> Step 5

* 자신의 Gihub Home에서 생성한 Gist를 Pin으로 등록해줍니다.

![](/assets/img/posts/Github-Actions-Daily-Coding-Time_5.png)

---

> Step 6

* 정상적으로 노출이 되는지 확인합니다.

![](/assets/img/posts/Github-Actions-Daily-Coding-Time_6.png)

