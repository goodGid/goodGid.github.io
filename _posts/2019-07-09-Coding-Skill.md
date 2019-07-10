---
layout: post
title:  " Tips : Coding Skill "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

> Skills I used while coding






----


## 190709(Tue)

* Spock으로 TC를 구현할 때 Model에 값을 넘기기 위한 코드

``` java
// Controller
public String methodNameForExample (@PathVariable String trxId, Model model) { }

// TC
def mockModel = new ExtendedModelMap()
methodNameForExample("1234", mockModel)
```









---


1. *가독성을 중요시 합니다.*
    - *한 문장은 한 흐름에 끊기도록 작성합니다.*

2. *글의 모듈화*
    - *많은 양을 하나의 글에 담기보다는 적절히 분배하여 글을 읽는데 부담이 없도록 작성합니다.*
