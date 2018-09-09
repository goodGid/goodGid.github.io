---
layout: post
title:  " Crawling :: Gradle 사용법 "
categories: Technology
tags: Crawling
author: goodGid
---
* content
{:toc}


## To do

1. Gradle을 이용하여 .jar(= Java Archive ) 와 같은 파일을 local에 Store하지 않고 빌드해보기.

---

## Code

``` java
[Sector 1]
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


[Sector 2]
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

```

---

## Review

* [Secotr 2]는 그냥 import를 하여도 문제가 되지 않는다.

* [Sector 1]와 같이 기본 내장 import 요소가 아닌 것들은 local에 해당 [.jar](https://ko.wikipedia.org/wiki/JAR_(%ED%8C%8C%EC%9D%BC_%ED%8F%AC%EB%A7%B7))파일을 Store 시켜야한다. <br> 하지만 프로젝트를 진행하다 보면 .jar같은 `Binary File`은 용량이 크고 그런 파일의 수가 많아지면 굉장히 비효율적이다.

* 그래서 [Gradle](https://en.wikipedia.org/wiki/Gradle)과 같은 `공식 빌드 시스템`을 사용하여 이러한 문제점을 해결 할 수가 있다.

* 위 예는 [ jsoup.jar ]라는 파일이 필요하다. <br> 하지만 build.gradle에 [1] 같이 추가하게 되면 local에 `jsoup.jar`을 Store할 필요가 없어진다.

```
dependencies {
    compile 'org.jsoup:jsoup:1.10.3' // [1]
}
```
