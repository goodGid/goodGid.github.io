---
layout: post
title:  " vim 모드에서 해당 파일의 모든 텍스트(Text)를 클립 보드(Clipboard)에 복사하기 ! "
categories: Technology
author: goodGid
---
* content
{:toc}

## Prologue

* vim 모드에서 작업을 하다 보면 

  전체 파일 내용을 클립보드로 복사할 필요가 은근 많이 있다.

* 이때 *cmd + a* 로 복사를 하게 되면 

  지금까지 입력했던 명령어들까지 같이 복사되면서 
  
  추가 작업이 필요해졌고 이건 너무나 비효율적이다 생각이 되어
  
  Stack Overflow에서 다음과 같은 [글](https://stackoverflow.com/questions/1620018/copy-all-the-lines-to-clipboard)을 찾아 해결했다.




## Copy to Clipboard

* 2가지 방법이 있었고 2개다 정상적으로 동작했다.

> 1st Usage

![](/assets/img/tech/Copy-All-The-Lines-to-Clipboard-in-vim_1.png)

* 참고 : Mac 환경에서만 사용하다.

<br>

> 2st Usage

![](/assets/img/tech/Copy-All-The-Lines-to-Clipboard-in-vim_2.png)



---

## Reference

* [Copy all the lines to clipboard](https://stackoverflow.com/questions/1620018/copy-all-the-lines-to-clipboard)