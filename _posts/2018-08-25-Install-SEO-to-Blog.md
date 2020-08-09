---
layout: post
title:  " 블로그에 SEO(Google,Naver) 적용하기 "
categories: Technology
author: goodGid
---
* content
{:toc}

## SEO란? 

* 검색 엔진 최적화 (Search Engine Optimization, SEO)는 

  웹 페이지 검색 엔진이 
  
  자료를 수집하고 순위를 매기는 방식에 맞게 
  
  웹 페이지를 구성해서 
  
  검색 결과의 상위에 나올 수 있도록 하는 작업을 말한다.




---

## 작업 과정

### Sitemap 생성

* sitemap을 google에 등록해 두면 

  주기적으로 크롤링을 통해 URL을 연결시킨다. 

* sitemap을 생성하는 방법은 다음과 같다.

* /root 경로에 **/sitemap.xml** 파일을 만들고 [코드](https://gist.github.com/goodGid/82752b012006f00787019ff5012cca09)를 Copy&Paste 한다.

* 반드시 root 디렉토리에 넣어야 한다.

* 수정 후 {HostName}/sitemap.xml로 접속 시 

  아래와 같은 화면이 나와야 정상적으로 sitemap이 등록된 것이다.

![](/assets/img/posts/install_seo_to_blog_1.png)

---

### 주의사항

> XML 에러

![](/assets/img/posts/install_seo_to_blog_2.png)

* {HostName}/sitemap.xml로 접속 시 

  위와 같은 화면이 보이면

  파일명에 특수 기호가 사용되지 않았는지 의심해 봐야 한다.

* 실제로 필자는 '&'가 들어간 파일명 때문에 에러가 났다.

  ex) Good&Gid.md

* 또한 파일의 이름이 URL의 링크 주소가 되는데 

  ex) 파일명 : Install-SEO-to-Blog/

  ex) https://goodgid.github.io/Install-SEO-to-Blog/

  만약 파일 이름이 한글일 경우 

  한글이 인코딩되어 url 주소에 **%**의 기호가 들어간다.

  이 경우에도 xml이 정상적으로 해석하지 못하여 에러가 발생 할 수 있다. 

* 따라서 가능하다면 파일 이름은 영문으로 만들고 

  특수기호는 최대한 사용하지 않는 것이 좋다.

---

> _config.yml 


``` yml
# Site settings
title: Gidhub
brief-intro: BE Developer
baseurl: "" # the subpath of your site, e.g. /blog

# 잘못된 설정
url: "" # the base hostname & protocol for your site

# 올바른 설정
url: "https://goodgid.github.io" # the base hostname & protocol for your site
```

* _config.yml 파일에서 

  url 값이 비어있어 에러가 발생 할 수 있다.

---

## RSS feed 생성

* Rss feed는 Naver와 Daum에 등록하기 위함이다.

* sitemap.xml과 마찬가지로 

  root 디렉토리에 /feed.xml 파일을 생성하고 [코드](https://gist.github.com/goodGid/80005823282d0b0e895ff1b8697028e8)를 Copy&Paste 한다.

---

## Robots.txt 생성

* robots.txt 파일에 

  sitemap.xml 파일의 위치를 등록해 시켜두면

  검색 엔진의 크롤러들이 홈페이지를 크롤링하는데 도움을 줄 수 있다.

* root 디렉토리에 /robots.txt 파일을 생성하고 [코드](https://gist.github.com/goodGid/f1cf91d5512d37e7fa3b165120f80bb7)를 Copy&Paste 한다.

---

## 사이트 등록

### Google

> [Google Search Console](https://www.google.com/webmasters/#?modal_active=none)

* 이 사이트에서 본인의 블로그를 등록해야 Google에서 검색이 가능하다. 

* *속성 추가* 버튼을 눌러 

  본인의 blog 주소를 입력하여 사이트를 등록한다. 

* 좌측 탭에 [ 크롤링 > sitemaps ] 메뉴를 열어 

  우측 상단에 *sitemap 추가* 버튼을 눌러 
  
  'sitemap.xml'을 입력한다.

* Google에 sitemap.xml을 등록하면

  자신의 블로그를 크롤러들이 크롤링하여 노출이 가능해진다.

![](/assets/img/posts/install_seo_to_blog_3.png)

---

### Naver

> [네이버 웹마스터 도구](https://webmastertool.naver.com/)

* Google과 비슷하게 블로그 주소를 등록하는 과정을 거친다. 

* 그 후 '사이트 소유 확인' 과정을 거치게 되는데 

  HTML 파일을 다운받아 블로그의 root에 업로드 하여 인증을 한다.

* 그 다음에 RSS를 등록하는 과정이 필요하다. 

* 왼쪽 메뉴에서 [ 요청 > RSS제출 ]을 클릭 후 

  URL을 포함한 주소인 {HostName}/feed.xml을 입력한다. 

![](/assets/img/posts/install_seo_to_blog_4.png)

* 추가적으로 

  **요청 > 사이트 맵 제출**을 클릭 후 
  
  Google과 마찬가지로 'sitemap.xml'을 입력한다.

![](/assets/img/posts/install_seo_to_blog_5.png)

---

## Summary

* sitemap.xml 호출 시 에러가 발생하여서 난처했다.

* 구글링을 하여도 답을 못찾겠어서 [페이스북 - 생활코딩](https://www.facebook.com/groups/codingeverybody/permalink/2351188734921649/?comment_id=2351204004920122&notif_id=1535200528290286&notif_t=group_comment)에도 문의했지만 답이 나오지 않았다.

* 그러다 [Stackoverflow](https://stackoverflow.com/questions/23422316/xml-validation-error-entityref-expecting)에서 답을 찾앗다.

* 문제는 XML에서 파일명에 '&'를 사용하면 xml이 해석을 하는데 에러가 발생하기 때문에

  파일명에 특수 기호를 다 제거하였더니 정상적으로 동작하였다.


---

## Reference

* [지킬 블로그 구글 검색 가능하게 하는 방법](https://wayhome25.github.io/etc/2017/02/20/google-search-sitemap-jekyll/)

* [github blog를 google에서 검색되도록 설정하기](http://jinyongjeong.github.io/2017/01/13/blog_make_searched/)


