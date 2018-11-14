---
layout: post
title:  " Git :: Reset과 Revert "
categories: Git
tags: Git
author: goodGid
---
* content
{:toc}

## Reset

* 돌아가려는 커밋으로 재설정되고 

* 돌아가려는 커밋 이후의 이력은 사라진다.








![](/assets/img/git/git_reset_vs_revert_1.png)

* 위 그림을 보면 기대했던 영화를 예매하였으나 스포일러 때문에 실망했던 이력을 볼 수 있다.

* 그래서 스포일러를 보기 전으로 이력을 되돌리자.

* 즉 커밋 a3bbb3c 이후의 이력은 모두 지운다.

```
$ git reset <옵션> <돌아가고싶은 커밋>
```

* reset을 사용할 때 사용되는 옵션이 있다.

* **hard**, **mixed**, **soft** 3가지가 있다.

---

### Hard

* 돌아가려는 커밋 이후의 모든 커밋을 지워버린다.

* 이렇게 하면 표를 예매하고 팝콘과 사이다를 구매했던 모든 것들이 지워지고 모든것이 초기화 된다.


```
$ git reset --hard  a3bbb3c
```

![](/assets/img/git/git_reset_vs_revert_2.png)


---

### Soft

* 돌아가려 했던 커밋으로 되돌아 갔지만

* 이후의 내용이 지워지지 않고

* 해당 내용의 인덱스(또는 스테이지)도 그대로 존재한다. 

* 바로 다시 커밋할 수 있는 상태로 남아있는 것이다. 

* 기억은 되돌려졌지만 표와 팝콘과 사이다는 손에 들려있는 상태이다.

```
$ git reset --soft a2bbb3c
```


![](/assets/img/git/git_reset_vs_revert_3.png)

![](/assets/img/git/git_reset_vs_revert_4.png)


---

### Mixed

* 옵션을 적지 않으면 **기본적으로 mixed로 동작**한다.

* 역시 이력은 되돌려진다. 

* 이후에 변경된 내용에 대해서는 남아있지만 인덱스는 초기화 된다. 

* 커밋을 하려면 다시 변경된 내용을 추가해야한다.

* 기억도 되돌려 졌고 표와 팝콘 그리고 사이다는 사야겠다는 마음만 남아있다고 할 수 있다.


```
$ git reset --mixed a2bbb3c
```

![](/assets/img/git/git_reset_vs_revert_5.png)

![](/assets/img/git/git_reset_vs_revert_6.png)


---

## Revert

* Revert는 상태를 되돌린다고 볼 수 있다.

* 스포를 당한 커밋을 revert하고 

* 현재 작성중인 코드만 본다면 reset과 동일한 (hard 옵션 준거만 빼고) 결과를 가진다. 

* 하지만 이력은 같지 않다. 

* 먼저 결과를 먼저 보자.

![](/assets/img/git/git_reset_vs_revert_7.png)

* 이전 이력은 그대로 있고

* 스포일러를 당했던 커밋만을 되돌렸다. 

* 마치 스포일러 당한것에 대한 것을 기억하고 있지만

* 그 내용은 알지 못하는 상태이다.

```
# git revert <되돌릴 커밋> 
git revert 2664ce8
```

* 되돌릴 커밋이 여러개라면 범위를 주어서 여러개를 선택도 가능하다.

```
git revert 2664ce8..15413dc
```


---

## 언제 reset을 하고 언제 revert를 해야하나?

* 단순하게 생각하면 reset을 하는 것이 

* revert를 하는 것보다 이력을 더 단순하게 만들어주기 때문에 

* revert의 장점이 많지 않아 보인다. 

* 하지만 이력 중간에 로그 출력하도록 한 커밋이 있고 

* 그 커밋만을 취소하려고 한다면 reset을 사용하여 이후의 이력을 모두 제거하는 것은 

* 이후 이력을 모두 날려버리는 결과를 초래한다. 

* 이럴 때 revert를 사용하여 해당 커밋의 내용만 되돌릴 수 있다. 

* 또한 이미 원격 Repository에 push를 한 상태라면 

* reset을 사용하면 reset 하기 이전으로 되돌리기 전까지는 push 할 수 없게된다. <br> (물론 force라는 무시무시한 옵션이 있다. ) 

* 그래서 이미 push한 코드라면 미련을 버리고 revert를 해야한다.


---

## 참고

* [[초보용] Git 되돌리기( Reset, Revert )](https://www.devpools.kr/2017/02/05/%EC%B4%88%EB%B3%B4%EC%9A%A9-git-%EB%90%98%EB%8F%8C%EB%A6%AC%EA%B8%B0-reset-revert/)
