---
layout: post
title:  " Nginx 공식 문서(Docs) 읽어보기 : Regular Expressions "
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

## [Regular Expressions](http://nginx.org/en/docs/http/server_names.html#regex_names)

![](/assets/img/nginx/Nginx-Docs-Regular-Expressions_1.png)

* Regex을 사용하기 위해서는 반드시 **~(tilde)**로 시작해야한다.

* 만약 ~로 시작을 하지 않는다면 Nginx는 정확하게 같은 Name으로 체크를 한다.

> Case : server_name

```
server_name  ~^www\d+\.example\.net$;
```

> Case : location

```
// ~와 "" 사이에 띄워쓰기가 들어간다.
location ~ "^/web/settings/(.*)" { 
  ...
}
```

---

* **^**와 **$** 기호를 사용하자.

  문법적으로는 요구되지 않지만 논리적으로 요구가 된다.

---

* Regex에 **{** 혹은 **}**가 포함되어 있다면 반드시 **"(quote)**로 감싸져야 한다.

```
server_name  "~^(?<name>\w\d{1,3}+)\.example\.net$";
```

* 만약 "(quote)로 감싸져 있지 않으면 

  Nginx는 다음과 같은 에러 메시지를 보여준다.

```
directive "server_name" is not terminated by ";" in ...
```



---

## Reference

* [Nginx Docs : Server names](http://nginx.org/en/docs/http/server_names.html)
