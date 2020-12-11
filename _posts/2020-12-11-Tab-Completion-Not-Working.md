---
layout: post
title:  " Terminal에서 Tab 기능이 동작하지 않는 이슈 : Tab Completion Not Working "
categories: Technology
author: goodGid
---
* content
{:toc}

## Problem

* iTerm2에서 zsh을 사용하는데

  어느순간부터 Tab 기능이 동작하지 않았다.

  그러다보니 파일명 혹은 폴더명을 직접 다 타이핑해야하는 번거로움이 생겼다.

* 문제를 해결하기 위해 자료를 찾아본 결과

  [Completions stopped working after upgrading zsh](https://unix.stackexchange.com/questions/210930/completions-stopped-working-after-upgrading-zsh/210931#210931) 글을 참고하여 문제를 해결할 수 있었다.

---



## Solution

* 아래 CLI를 입력하면 Tab 기능이 정상적으로 돌아온다.

```
rm ~/.zcompdump*
```

* 위 CLI로 삭제하는게 뭔가 무섭거나 내키지 않는다면

  zcompdump가 있는 파일을 찾아서 삭제해도 된다.

> Example

![](/assets/img/posts/Tab-Completion-Not-Working_1.png)










