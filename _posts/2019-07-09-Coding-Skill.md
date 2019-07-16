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