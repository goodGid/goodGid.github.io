---
layout: post
title:  " Font Awesome Web Application Icons "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

* 블로그 header에 

* 새로운 탭을 추가하고 싶어서 보다보니

* 문득 이런 궁금증이 생겼다.

<br>

* 이 이미지 아이콘들 어디서 갖고오는거지?

* ex) Home, Archives, Categories 등등

<br>







* 궁금증이 생겨서 

* 바로 Chrom에서

* *cmd + option + i* 를 통해 소스코드를 봤다.

<br>

* 그리고 차근차근 파악해봤다.

* 우선 **.fa** 속성이 이미지를 그려주는건 알았다.

* 그리고 그 속성은

* font-awesome.min.css 파일에 있는 것도 알았다.

![](/assets/img/posts/Font-Awesome-Web-Application-Icons_1.png)

<br>

* 그런데 font-awesome.min.css 이 파일은 어디서 갖고오는거지?

* 내가 추가해준적이 없는데...?

* 그래서 그 파일의 출처를 다시 찾아봤다.

<br>

* 그리고 답을 찾았다.

* head.html 파일을 보니

* 다음과 코드가 있었다.

``` html
<link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
```

* 그리고

* 실제로 Network 탭에서 

* 브라우저가 로딩될 때 

* font-awesome.min.css 파일이 

* Load 되는것을 확인하였다.

![](/assets/img/posts/Font-Awesome-Web-Application-Icons_2.png)

<br>

* 궁금증이 풀린 필자는

* 마음이 편안해졌다.

<br>

* 추가적으로

* 다양한 아이콘을 사용하고 싶다면

* [Font Awesome Web Application Icons](https://www.w3schools.com/icons/fontawesome_icons_webapp.asp) 사이트를 참고하자 !
