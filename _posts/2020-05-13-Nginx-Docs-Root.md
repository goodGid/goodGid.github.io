---
layout: post
title:  " Nginx 공식 문서(Docs) 읽어보기 : root "
categories: Nginx
author: goodGid
---
* content
{:toc}

## Prologue

* Nginx 개념 관련해서 [Nginx Docs](http://nginx.org/en/docs/beginners_guide.html)를 참고하여 개념을 학습하였다.

  그리고 이해한 바를 정리해 봤다.

  그렇기 때문에 틀린 부분이 있을 수 있다. 
  
  ( 잘못된 부분에 대해 피드백을 주시면 감사하겠습니다. )

* 전체적인 흐름을 이해하는 용도로 받아들이고 보다 정확한건 직접 [Nginx Docs](http://nginx.org/en/docs/beginners_guide.html)를 읽도록 하자.




---

## Root

![](/assets/img/nginx/Nginx-Docs-Root_1.png)

```
location / {
    root /data/www;
}
```

* Location Block에 명시되어 있는 Prefix에 매칭되는 URI 요청이 들어오면

  그 URI에는 Root 필드의 값으로 명시된 Path가 추가된다.

  ex) /index.html 요청이 들어오면 /data/www/index.html 파일이 응답된다.

* 만약 Location Block에 매칭되는 Block이 여러개 있다면

  가장 긴 Prefix에 해당되는 Block이 적용된다.

* Prefix가 **/**일 경우에는 모든 URI 요청이 매칭된다.

  그렇기 때문에 가장 낮은 우선 순위라고 생각해도 무방하다.


---


## [Serving Static Content](http://nginx.org/en/docs/beginners_guide.html#static)

![](/assets/img/nginx/Nginx-Docs-Root_2.png)

* 다음과 같은 Server Block이 있다.

``` 
server {
    location / {
        root /data/www;
    }

    location /images/ {
        root /data;
    }
}
```

* 만약 http://localhost/some/example.html 요청이 들어오면

  Nginx는 root 값으로 명시한 **/data/www**를 추가하여

  /data/www/some/example.html 파일을 응답한다.
  
---

* 만약 http://localhost/images/example.png 요청이 들어오면

  "location /" 에도 매칭이 되지만

  "location /images/" Block 우선 순위에 밀려

  Nginx는 root 값으로 명시한 **/data**를 추가하여

  /data/images/example.png 파일을 응답한다.




---

## Reference

* [Nginx Docs : Beginner’s Guide](http://nginx.org/en/docs/beginners_guide.html)