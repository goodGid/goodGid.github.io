---
layout: post
title:  " Git :: Merge와 Rebase "
categories: Git
tags: Git
author: goodGid
---
* content
{:toc}

## Merge

* 초기 상황이다.

![](/assets/img/git/git_merge_vs_rebase_1.png)

* `git merge iss1` 명령으로 iss1를 Merge한다. 

* 노란색인 C1은 **Merge Base**이다.












![](/assets/img/git/git_merge_vs_rebase_2.png)

* `git merge iss2` 명령으로 iss2를 Merge한다.

![](/assets/img/git/git_merge_vs_rebase_3.png)

* `git merge iss3` 명령으로 iss3를 Merge한다.

![](/assets/img/git/git_merge_vs_rebase_4.png)

* iss1, iss2, iss3를 Merge 했다. 

* C9, C10, C11은 Merge 커밋이다. 

* 그림에서는 히스토리가 복잡하지 않다고 생각 할 수 있지만

* 콘솔에서 보게 된다면 그렇지 않다.

---


## Rebase

![](/assets/img/git/git_merge_vs_rebase_5.png)

* `git checkout iss1`과 `git rebase master`를 차례대로 실행해서 Rebase 한다. 

* 그러면 **Merge Base**가 C1이 아니라 C4가 된다.

![](/assets/img/git/git_merge_vs_rebase_6.png)

* `git checkout master`과 `git merge iss1`를 차례대로 실행해서 Merge한다. 

* Rebase를 하면 항상 Fast-Forward Merge가 가능해진다. 



![](/assets/img/git/git_merge_vs_rebase_7.png)

* `git checkout iss2`과 `git rebase master`를 차례대로 실행해서 Rebase한다.

* 그러면 **Merge Base**가 C3가 아니라 C2'가 된다.




![](/assets/img/git/git_merge_vs_rebase_8.png)

* `git checkout master`과 `git merge --no-ff iss2`를 차례대로 실행해서 Merge한다. 

* **--no-ff** 옵션은 강제로 Merge 커밋을 남기려고 주는 것이다. 


![](/assets/img/git/git_merge_vs_rebase_9.png)

* `git checkout iss3`과 `git rebase master`를 차례대로 실행해서 Rebase한다.

* 그러면 **Merge Base**가 C3에서 C9이 된다.





![](/assets/img/git/git_merge_vs_rebase_10.png)

* `git checkout master`과 `git merge --no-ff iss3`를 차례대로 실행해서 Merge한다.

![](/assets/img/git/git_merge_vs_rebase_11.png)


<br>

* 이제 Rebase 결과를 Merge한 결과와 비교해보자.

![](/assets/img/git/git_merge_vs_rebase_12.png)


* Rebase를 하고 나서 Merge한 것이 훨씬 보기 좋다. 

* 아무리 복잡한 과정을 거쳤어도 한눈에 들어오게 할 수 있다.

<br>

* 정리하자면 **Rebase는 히스토리를 정리**하는 데 필요하다. 

* 나 혼자 쓰는 저장소에서도 Rebase가 없으면 지저분해서 히스토리를 읽을 수가 없다.


---

## 참고

* [Git: Rebase는 언제 어떻게 해야 할까?](http://dogfeet.github.io/articles/2012/git-merge-rebase.html)
