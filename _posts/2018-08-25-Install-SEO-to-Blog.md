---
layout: post
title:  " 블로그에 SEO(구글,네이버) 적용하기 "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}


# SEO란? 

* 검색 엔진 최적화 (영어: search engine optimization, SEO)는 웹 페이지 검색엔진이 자료를 수집하고 순위를 매기는 방식에 맞게 웹 페이지를 구성해서 검색 결과의 상위에 나올 수 있도록 하는 작업을 말한다.

---

# 작업 과정

## Sitemap 생성

sitemap을 google에 등록해 두면 주기적으로 크롤링을 통해 url을 연결시킨다. 

우선 sitemap을 생성하는 방법에 대해서 설명한다. 

블로그의 /root 경로에 **/sitemap.xml** 파일을 만들고 [코드](https://gist.github.com/goodGid/82752b012006f00787019ff5012cca09)를 복사해 넣는다. 

반드시 root 디렉토리에 넣어야 한다.

git과 commit으로 블로그를 업데이트 후 blog주소/sitemap.xml로 접속했을 때 

아래와 같은 화면이 나와야 정상적으로 sitemap이 등록된 것이다.

![](/assets/img/posts/install_seo_to_blog_1.png)


\+ sitemap을 custom 하고 싶을 경우

```
---
layout: post
title:  "제목"
date:   2016-03-14 12:00:00 
lastmod : 2016-03-15 12:00:00
sitemap :
  changefreq : daily
  priority : 1.0
---
```

sitemap에는 각 해당 글의 lastmod, sitemap.changefreq, sitemap.prioritye 등의 정보가 설정되는데, 

이것은 각 포스팅할 글의 맨 위에 다음과 같이 sitemap의 옵션을 추가해 줌으로써 추가적으로 설정 가능하다. 

설정이 없을 때의 default 설정은 sitemap.xml에 정의되어 있다.

<small> changefreq를 너무 짧게 하면 빈번한 접속으로 안좋은 영향을 미칠 수도 있다고 하니 적당히 하루 혹은 일주일로 하면 좋을 것 같다. </small> 

<br>

## 주의사항

* XML 에러

![](/assets/img/posts/install_seo_to_blog_2.png)

blog주소/sitemap.xml을 실행했을 때 

위와 같이 나오지 않는 경우는 아마 주소링크에 **&**와 같은 특수기호가 있는 경우가 있을 수 있다. 

실제로 필자는 파일명에 특수기호 '&'가 들어간 파일들 때문에 에러가 났다.

예를들어 파일의 이름이 URL의 링크 주소가 되는데, 만약 파일이름이 한글일 경우 url의 주소에 **%**의 기호가 들어가 있다. 

이럴경우 xml이 정상적으로 해석하지 못한다. 

따라서 최대한 URL의 링크가 되는 파일이름은 영문으로 만들고, 특수기호는 최대한 사용하지 않는 것이 좋다.

<br>

* _config.yml 안에 url 생략으로인한 에러

root 디렉토리에 존재하는 _config.yml 파일 내의 url 부분에 

자신의 블로그 url을 입력해야 sitemap.xml에서 site.url 부분을 사용 할 수 있다.

---

## RSS feed 생성

Rss feed는 naver와 daum에 등록하기 위함이다. 

sitemap.xml과 마찬가지로 root 디렉토리에 /feed.xml파일을 생성하고 [코드](https://gist.github.com/goodGid/80005823282d0b0e895ff1b8697028e8)를 복사한다.

---

## Robots.txt 생성

robots.txt파일에 sitemap.xml파일의 위치를 등록해 두면 

검색엔진의 크롤러들이 홈페이지를 크롤링하는데 도움을 주게 된다고 한다. 

root 디렉토리에 /robots.txt 파일을 만들고 [코드](https://gist.github.com/goodGid/f1cf91d5512d37e7fa3b165120f80bb7)를 복사한다.

---

# 사이트 등록

* Google (google search console등록)

[Google Search Console](https://www.google.com/webmasters/#?modal_active=none)

이 사이트에서 본인의 블로그를 등록해야 google에서 검색이 가능하다. 

속성추가 버튼을 눌러 본인의 blog 주소를 입력하여 사이트를 등록한다. 

좌측 탭에 [ 크롤링 > sitemaps ] 메뉴를 열어 우측 상단에 sitemap 추가 버튼을 눌러 sitemap.xml을 입력한다.

제출이 완료되면 sitemap.xml파일이 등록된 것을 확인할 수 있으며 색인이 접수 중임을 알 수 있다.

구글에게 sitemap.xml을 제출해야 구글이 내 블로그를 크롤링 하는 방식을 판단하고 검색엔진에 노출할 수 있다.

![](/assets/img/posts/install_seo_to_blog_3.png)

---

* Naver

[네이버 웹마스터 도구](https://webmastertool.naver.com/)

로그인하여 구글과 비슷하게 블로그 주소를 등록하는 과정을 거친다. 

그 후 “사이트 소유 확인”이라는 과정을 거치게 되는데 HTML 파일을 다운받아 블로그의 root에 업로드 하여 확인하는 과정을 거치게 된다. 

이 과정을 거치면 google의 analystics와 유사한 기능을 사용할 수 있는 것 같다. 

그 다음에 RSS를 등록하는 과정이 필요하다. 

왼쪽 메뉴에서 [ 요청 > RSS제출 ]을 클릭해서 URL을 포함한 주소인 블로그URL/feed.xml을 입력한다. 

<small>이상하게 URL을 복사해서 붙혀넣으니까 잘못된 RSS라고 떴다. 그래서 그냥 쳐봤더니 인증이 되었다. -_- </small>

![](/assets/img/posts/install_seo_to_blog_4.png)

추가적으로 요청 > 사이트맵제출로 들어가서 google과 마찬가지로 블로그URL/sitemap.xml을 입력해서 sitemap을 등록시켜 준다.

![](/assets/img/posts/install_seo_to_blog_5.png)

---

# Trouble Shooting

* 다음과 같은 로그가 sitemap.xml 호출 시 에러가 났다.

* 구글링을 해도 답이 안나와 [페이스북 - 생활코딩](https://www.facebook.com/groups/codingeverybody/permalink/2351188734921649/?comment_id=2351204004920122&notif_id=1535200528290286&notif_t=group_comment)에도 문의했지만 답이 나오지 않았다.

* 그리고 [Stackoverflow](https://stackoverflow.com/questions/23422316/xml-validation-error-entityref-expecting)에서 답을 찾앗다.

* 해결법은 단순했다. <br> XML에서 파일명에 `&`를 사용하면 xml이 해석을 하는데 에러가 발생한다.


---

# 참고

1. [지킬 블로그 구글 검색 가능하게 하는 방법](https://wayhome25.github.io/etc/2017/02/20/google-search-sitemap-jekyll/)

2. [github blog를 google에서 검색되도록 설정하기](http://jinyongjeong.github.io/2017/01/13/blog_make_searched/)


