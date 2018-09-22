---
layout: post
title:  " Liquid 문법 개념과 사용법 "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## Liquid란 무엇인가?

* **Liquid**는 [Shopify](https://github.com/Shopify/liquid)에 의해 개발되고 **Ruby**로 작성된 **오픈소스 템플릿 언어**이다.

* Liquid는 2006년 6월부터 웹페이지에 동적인 컨텐츠를 로드(load)하는 Shopify의 백본(backbone)으로 기능하고 있다.





---

## Liquid는 어디에 사용되는가?

* 일반 텍스트(plain text)를 정적 웹사이트(static website)로 변환해주는 **Jekyll**에 사용된다.

---

## Liquid 문법 요소


### Escape

* Liquid 태그를 그대로 보여줄 수 있게 **Escape**하는 방법이다.

> Example

* {　% raw %　} 와 {　% endraw %　} 사이에 Liquid 문법을 입력하면 그대로 볼 수 있다.

![](/assets/img/posts/what_is_liquid_grammer_1.png)

* 위 사진 처럼 MD를 작성하게 되면

![](/assets/img/posts/what_is_liquid_grammer_2.png)

* 실제로 블로그에선 위와 같이 보인다.

---

### Object

* Object는 페이지의 어느 지점에 해당 대상을 배치할 지 지시한다. 

* 하나의 Object는 변수명(variable name)을 둘러싸는 중괄호'**\{\{ \}\}**'형태로 표현된다.

> Example

```
{% raw  %}
{{ page.title }}
{% endraw %}
```

> Output

```
{{ page.title }}
```

* 위의 경우, Liquid는 page.title 객체에 들어있는 텍스트를 출력한다.

---


### Tag

* Tag는 템플릿의 **논리(logic)**와 **제어 흐름(control flow)**을 만든다. <br> if,else와 유사하다 생각하면 된다.

> Example

```
{% raw %}
{% if site.url %}
  My Blog URL :  {{ site.url }}
{% endif %}
{% endraw %}
```

---

### Filter

* Filter는 Liquid의 Object가 출력되는 방식을 변경한다.

* Object 출력 시에 `|`로 출력 대상과 구분되게 한다.

> Example

```
{% raw %}
{{ "/my/fancy/url" | append: ".html" }}
{% endraw %}
```

> Output

```
{{ "/my/fancy/url" | append: ".html" }}
```

---

### Comment

* 이 태그 안에 들어간 내용은 사이트에 출력되지 않는다.

> Example

```
{% raw %}
{% comment %}
<!-- 여기 있는 내용은 노출되지 않음. -->
{% endcomment %}
{% endraw %}
```

---


## 참고

* [Liquid Introduction](http://shopify.github.io/liquid/basics/introduction/)

* [[번역] 액체 언어 Liquid 배우기: 01. 소개](http://sungkukpark.github.io/translation/2016/03/20/liquid-tutorial-01-introduction.html)

* [Jekyll을 사용하면서 자주 사용하는 Liquid 태그](http://blog.kichul.co.kr/2017/03/04/2017-03-04-jekyll-notes/)
