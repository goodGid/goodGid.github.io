---
layout: post
title:  " Nginx 공식 문서(Docs) 읽어보기 : reload "
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

## [Starting, Stopping, and Reloading Configuration](http://nginx.org/en/docs/beginners_guide.html#control)

![](/assets/img/nginx/Nginx-Docs-Reload_1.png)

* Nginx 관련 Config 파일을 수정하더라도 

  현재 동작중인 Nginx에는 자동으로 적용이 되지 않는다.

* 적용 시키기 위해선 다음 명령어를 사용한다.

``` shell
$ nginx -s reload
```

* 이후 동작 과정은 다음과 같다.

* Master Process가 Config를 Reload 하라는 신호를 받는다.

  그러면 변경된 Config의 Syntax가 올바른지 체크를 하고 

  체크 성공 유무에 따라 행동이 달라진다.

---

* 만약 문제가 없다면 

  Master Process는 New Worker Process를 생성하고 변경된 Config대로 동작하라고 명령한다.

  그리고 Old Worker Process에게 Config가 변경되었으니까 
  
  현재 진행중인 Connection은 마무리 짓고 Shut Down 하라고 메시지를 보낸다.

---

* 만약 문제가 있다면 

  Master Process는 변경된 Config를 적용시키지 않고 

  Old Worker Process에게 더 이상 새로운 Connection을 맺지 말고

  현재 진행중인 Connection에 대해서만 작업을 마치고 Shut Down 하기를 요청한다.

  왜냐하면 Config가 변경되었기 때문에 Old Config로 동작해서는 안되기 때문이다.


---

## Reference

* [Nginx Docs : Beginner’s Guide](http://nginx.org/en/docs/beginners_guide.html)