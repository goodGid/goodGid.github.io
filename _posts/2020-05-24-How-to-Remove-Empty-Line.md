---
layout: post
title:  " Regex를 사용하여 Empty Line 지우기 : How to remove empty line "
categories: Technology
author: goodGid
---
* content
{:toc}

## Prologue

* 작성했던 글들을 대상으로

  tags: xxYYzz 형식으로 작성된 Text를

  일괄적으로 지워줘야 할 필요가 생겼다.

* 단순하게 그냥 Replace 해주면 되지 않나?'라고 접근할 수 있지만 

  그렇게 되면 다음처럼 무의미한 **empty line**이 생기게 된다.

> AS-IS

```
[1] layout: post
[2] title:  " Regex를 사용하여 Empty Line 지우기 : How to remove empty Line "
[3] categories: Technology
[4] tags: Technology
[5] author: goodGid
```

> TO-BE

```
[1] layout: post
[2] title:  " Regex를 사용하여 Empty Line 지우기 : How to remove empty Line "
[3] categories: Technology
[4]
[5] author: goodGid
```


---

* 내가 원한 Format은 다음과 같았다.

```
[1] layout: post
[2] title:  " Regex를 사용하여 Empty Line 지우기 : How to remove empty Line "
[3] categories: Technology
[4] author: goodGid
```


---

## 수작업으로 ? 

* 처음에는 Regex로 empty string으로 replace하고

  일일히 line을 삭제해주려고 했다.

  그런데 그러기에는 너무나도 많은 파일을 수정해야 했다.

  ( 무려 577개 파일을 ... )

* 그래서 **\n**까지 Regex로 replace 하는 방법을 찾아봤다.


---

## Regex 

* 기본적인 아이디어는 [How to remove empty lines in Visual Studio Code](https://www.trainingdragon.co.uk/blog/how-to-remove-empty-lines-in-visual-studio-code) 글을 참고했다.

* 그런데 저기 나와 있는 Regex(= **^(\s)*$\n**)는 

  모든 empty line을 replace 해버렸다.

* 그래서 내 입맛에 맞게 Regex(= **^tags.*$\n**)를 수정하여 사용했다.

```
Regex : tags로 시작하고 \n로 끝나는 text 검색
Find : ^tags.*$\n
Replace : (아무것도 입력하지 않은 상태)
```

![](/assets/img/posts/How-to-Remove-Empty-Line_1.png)

* 그 [결과](https://github.com/goodGid/goodGid.github.io/commit/84823d22b182c4b38b7ebb17aa89892b0ac16c78) 내가 원하는 format으로 아름답게 replace 되었다.


---

## Summary

* Regex를 사용하여 text를 변경할 때

  변경될 text line까지 삭제하는 방법에 대해 알아봤다.

  유용하게 사용될 수 있는 Regex라고 생각이 든다.

  


