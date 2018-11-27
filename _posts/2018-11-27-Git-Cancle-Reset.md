---
layout: post
title:  " Git Reset 취소하기 "
categories: Git
tags: Git
author: goodGid
---
* content
{:toc}

## 이슈

* `git reset --hard`로 이전 버전으로 돌아갔다가 커밋들이 사라지는 상황에 놓였다.

* 되돌릴 수 있는 방법이 있지 않을까를 찾아보다 방법을 찾았다.







---

## git reflog

* `git relog` 라는 명령어를 커맨드창에 입력하게 되면 이전까지 작업했던 커밋들을 확인 할 수 있다.


![](/assets/img/git/git_cancle_reset_1.png)

* 그리고 만약 돌아가고 싶은 커밋이 `7c34a13 HEAD@{2}: commit: Fix typo`라면 다음과 같이 입력하면 된다.

```
git reset --hard 7c34a13 
또는
git reset --hard HEAD@{2}
```



---

## 참고

* [[GIT] reset 한거 취소하는 방법](http://88240.tistory.com/284)