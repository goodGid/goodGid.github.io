---
layout: post
title:  " 터미널에서 브라우저 열기 명령 "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}


``` zsh
open -a /Applications/Google\ Chrome.app/ https://www.naver.com
```

open 명령어를 사용하면 된다.

만약 터미널에서 현재 작업중인 Finder를 열고 싶다면

``` zsh
alias finder='opne -a Finder .'
```

다음과 같은 별칭을 정해서 활용할 수 도 있다.