---
layout: post
title:  " Macbook 사용 시 설정이 필요한 목록 기록해두기 "
categories: E.T.C
author: goodGid
---
* content
{:toc}

## Prologue

* 새로운 장비를 구매하면 

  가장 어려운 게 기존 장비랑 같게 환경 세팅을 하는 것이다.

* 100% 싱크를 맞추고 싶은데 

  기억에만 의존하면 쉽지 않고 생각보다 시간이 오래 걸리므로

  이번 기회에 신규 장비를 구매 시 어떤 설정과 설치를 해야 하는지 기록해두려고 한다.



---

## Initialize

### iTerm 설치

* zsh 설치

```
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

* Scroll 기능 활성화시키기

```
Preference -> Advanced -> Mouse Tab, switch:
Scroll wheel sends arrow keys when in alternate screen mode
```

* Alt/Cmd + Left/Right 단축키 활성화 시키기

  [iTerm2에 Natural Text Editing 설정하기 : Alt/Cmd + Left/Right 단축키를 사용해보자]({{site.url}}/iTerm2-Natural-Text-Editing/)


### Intellij 설정 환경 

![](/assets/img/posts/Initialize-Macbook-Setting-Intellij_1.png)

* export하면 [setting.zip 파일]()이 생성된다. // 210523(Sun)

### Alfred

![](/assets/img/posts/Initialize-Macbook-Setting-Alfred_1.png)

* 찾기 어려웠던 URL만 따로 [기록](https://bit.ly/3hQYCPN)해둔다.


### Karabiner

> for Internal Apple Keyboard

![](/assets/img/posts/Initialize-Macbook-Setting-Karabiner_1.png)

> for Magic Keyboard

![](/assets/img/posts/Initialize-Macbook-Setting-Karabiner_2.png)

> for Realforce Keyboard

![](/assets/img/posts/Initialize-Macbook-Setting-Karabiner_3.png)


### Logitech 마우스

* [Logi Option](https://www.logitech.com/ko-kr/product/options)을 다운로드 받는다.

![](/assets/img/posts/Initialize-Macbook-Setting-Logitech_1.png)

![](/assets/img/posts/Initialize-Macbook-Setting-Logitech_2.png)

![](/assets/img/posts/Initialize-Macbook-Setting-Logitech_3.png)


### .zshrc 설정

* [~/.zshrc](https://bit.ly/3bNy3r0) 내용을 Backup 해둔다. // 210523(Sun)


### Trackpad

![](/assets/img/posts/Initialize-Macbook-Setting-Trackpad_1.png)

![](/assets/img/posts/Initialize-Macbook-Setting-Trackpad_2.png)




### VS Code 설정

* VS Code 사용 시 Short Cut으로 설정했던 값들을 설정한다.

* 관련 내용은 해당 Path에 존재한다.

  - cd $HOME/Library/Application\ Support/Code/User

  - ex) keybindings.json, settings.json, snippets/markdown.json


### Spotlight 해제

* Alfred를 사용하므로 Spotlight 사용을 disable 시킨다.

* System Preferences -> Keyboard -> Shortcuts에서 다음과 같이 체크를 해제한다.

![](/assets/img/posts/Initialize-Macbook-Setting-Spotlight_1.png)


### Git 설정

* global git config 설정을 해준다.

```
git config --global user.name "goodGid"
git config --global user.email "hello.goodgid@gmail.com"
```


### Dock 설정

![](/assets/img/posts/Initialize-Macbook-Setting-Dock_1.png)


### Homebrew

* 참고 : [Homebrew의 Apple Silicon (M1) 정식 지원 시작, 설치 방법](https://awesometic.tistory.com/272)

* brew 설치 후 원하는 package를 설치한다.

```
brew install tree
```


### iShot

![](/assets/img/posts/Initialize-Macbook-Setting-iShot_1.png)


### BetterTouchTool

![](/assets/img/posts/Initialize-Macbook-Setting-BetterTouchTool_1.png)

![](/assets/img/posts/Initialize-Macbook-Setting-BetterTouchTool_2.png)


### Jekyll

* 가장 화나게 하는 Jekyll 설치

  어찌해서 성공하긴 했는데 실행할 때마다 복불복 느낌이다.

* 혹시 나중에 환경 설정 비교를 위해 Snapshot을 기록해둔다.

![](/assets/img/posts/Initialize-Macbook-Setting-Jekyll_1.png)

* 그리고 Blog Project에 *.ruby-version* 파일을 추가하니까

![](/assets/img/posts/Initialize-Macbook-Setting-Jekyll_2.png)

* 사진 속 에러가 해결되었다.

  ( 하지만 왜 해결되는지는 모르겠다 -ㅂ- )

![](/assets/img/posts/Initialize-Macbook-Setting-Jekyll_3.png)


> 참고했던 글들

* [ruby update 하는 방법](https://codingpad.maryspad.com/2017/04/29/update-mac-os-x-to-the-current-version-of-ruby/)

  - 3.x 하면 의존성이 깨져서 안된다.
  
  - 2.x 버전으로 유지하자.

* [Jekyll 설치 for Mac M1](https://unluckyjung.github.io/develop-setting/2021/01/20/Mac-Jekyll-Setting/)

* [ruby 관련 개념 정리글](https://frhyme.github.io/others/jekyll_serve_not_work/)


### Spectacle

![](/assets/img/posts/Initialize-Macbook-Setting-Spectacle_1.png)

* [Spectacle](https://www.spectacleapp.com/) 설치

* 설정 후 disable에 Intellij 추가


### Small Timer

* App Store에서 다운로드 받기

### Bear

* [Bear](https://bear.app/) 설치

### AppCleaner

* [AppCleaner](https://freemacsoft.net/appcleaner/) 설치

### SourceTree

* [Source Tree](https://www.sourcetreeapp.com/) 설치

### MS Office

* [MS Office](https://m.blog.naver.com/softcen12/221282297326) 설치

### JDK

* [JDK 8](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)

  [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)


### E.T.C

* [echo $PATH 시 출력되는 환경 변수 초기화 하는법](https://gubonny.tistory.com/99)


---

## Summary

* 설정할 게 정말 많다.

  그래도 한 번 정리해놓았으니 다음엔 좀 더 수월하게 세팅할 수 있겠다 !