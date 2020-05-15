---
layout: post
title:  " Nginx 공식 문서(Docs) 읽어보기 : Wildcard names "
categories: Nginx
author: goodGid
---
* content
{:toc}

## Prologue

* Nginx 개념 관련해서 [Nginx Docs](http://nginx.org/en/docs/http/server_names.html)를 참고하여 개념을 학습하였다.

  그리고 이해한 바를 정리해 봤다.

  그렇기 때문에 틀린 부분이 있을 수 있다. 
  
  ( 잘못된 부분에 대해 피드백을 주시면 감사하겠습니다. )

* 전체적인 흐름을 이해하는 용도로 받아들이고 보다 정확한건 직접 [Nginx Docs](http://nginx.org/en/docs/http/server_names.html)를 읽도록 하자.




---

## [Wildcard names](http://nginx.org/en/docs/http/server_names.html#wildcard_names)

![](/assets/img/nginx/Nginx-Docs-Wild-Card_1.png)

* Wilicard Name은 *(asterisk)을 시작 또는 끝에만 사용이 가능하다.

  <p>ex) "*.example.org", "mail.*"</p>

  <p>그렇기 때문에 "www.*.example.org"와 "w*.example.org"는 잘못된 사용법이다.</p>

  위와 같은 경우는 [Regular Expressions]({{site.url}}/Nginx-Docs-Regular-Expressions/)을 사용해서 해결할 수 있다.

  <p>ex) "~^www\..+\.example\.org$", "~^w.*\.example\.org$"</p>




---

## Reference

* [Nginx Docs : Server names](http://nginx.org/en/docs/http/server_names.html)
