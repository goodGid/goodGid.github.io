---
layout: post
title:  " Nginx 옵션 : server_tokens "
categories: HTTP
author: goodGid
---
* content
{:toc}

## Nginx

* Nginx에 대한 개념 및 적용 방법은 [Nginx 적용하기]({{site.url}}/Nginx/)을 참고하자.

---

## Nginx 옵션 : Server_Tokens

* 만약 Nginx의 보안 취약점이 발견되어

  Nginx 개발자들이 이를 수정하여 업데이트를 하더라도

  현재 자신이 사용하는 서비스의 Nginx Version은 최신이 아닐 수 있다.

* 이런 상황에서 악의적인 공격자들은 

  Nginx의 Version을 보고 발견된 Nginx 보안 취약점을 통해 서버에 공격을 가할 수 있다.

* 그렇기 때문에 그런 악의적인 공격을 방지하기 위해 

  Nginx의 Version을 Reponse에서 명시하지 않도록 하는 옵션이 **server_tokens** 이다.





---

## Nginx Config


> /etc/nginx/sites-available/default

```
server {

  listen 80;
  listen [::]:80;
  server_name My_Project_Name;

  # The nginx version is not specified in the response header Because of security.
  # default : on
  server_tokens off;

  location / {

    proxy_pass http://localhost:8080;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
  }
}
```

* 위 설정은 굉장히 기본적인 설정이므로 

  만약 HTTPS 설정과 Load Balance 기능 활성화를 원한다면

  위 설정을 무시하고 [Nginx Configuration](https://gist.github.com/goodGid/19aceb989a86adbb4560e976cf437453)으로 변경한다.


---

### server_tokens on

![](/assets/img/http/Nginx-Option-Server-Tokens_1.png)

* Nginx Version이 노출된다.

---

### server_tokens off

![](/assets/img/http/Nginx-Option-Server-Tokens_2.png)

* Nginx Version이 노출되지 않음을 확인할 수 있다.


---

## Reference

* [[Nginx] Hardening Nginx](https://velog.io/@minholee_93/Nginx-Hardening-Nginx)