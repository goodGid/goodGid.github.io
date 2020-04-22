---
layout: post
title:  " Font Awesome Web Application Icons "
categories: Technology
author: goodGid
---
* content
{:toc}

## Curiosity

* Blog Header를 보다보니

  Home, Archives, Categories 등등

  이 Image Icon들을 어디서 갖고오는거지? 라는 궁금증이 생겼다.

* 바로 Chrom 개발자 도구(cmd + option + i)를 이용해 확인을 했다.




---

## Code Tracking

* **.fa** 속성이 Image를 그려주는건 알았다.

* 그리고 그 속성은

  font-awesome.min.css 파일에 있는 것도 알았다.

![](/assets/img/posts/Font-Awesome-Web-Application-Icons_1.png)

<br>

* 그런데 font-awesome.min.css 이 파일은 어디서 갖고오는거지?

* 내가 추가해준적이 없는데...?

* 파일의 출저를 밝히기 위해 

  head.html 파일을 보니 다음과 같은 코드가 있었다.

``` html
<link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
```

<br>

* 그리고 브라우저 로딩 시 Network 탭을 통해

* font-awesome.min.css 파일이 Load 되는것을 확인하였다.

![](/assets/img/posts/Font-Awesome-Web-Application-Icons_2.png)



---

## Summary

* CDN을 통해 

  font-awesome.min.css 파일을 가져오고

  그 파일이 Blog Header에서 사용하는 Image를 제공한다.

* 궁금증이 해결되었다.

---

* 그리고 이런 Icon은 **Font Awesome Icon** 이라고 부른다.

* Icon과 관련해서는 [Font Awesome Web Application Icons](https://www.w3schools.com/icons/fontawesome_icons_webapp.asp)와 [fontawesome](https://fontawesome.com/) 사이트를 참고하자.
