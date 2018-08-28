---
layout: post
title:  " Jekyll 블로그에 Google Analytics 사용하기 "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

# Google Analytics란?

* 사이트에 소스코드를 입력해두면, Google Analytics 홈페이지에서 구글이 사용자 행태를 분석해 모아둔 데이터를 볼 수 있다.

---

# 작업과정 

## 1. Google Analytics 계정 생성

[Google Analytics](https://marketingplatform.google.com/about/analytics/) 접속해서 계정을 생성한다.

---

## 2. 추적 ID 가져오기

필요한 정보 기입 후 **추적 ID 가져오기** 버튼 클릭

![](/assets/img/posts/install_google_analytics_1.png)

<br>

약관 동의 후 **추적 ID**를 저장한다.

**jekyll** 템플릿이라면 기본적으로 **_config.yml** 파일이 있을 것이다.

```
google_analytics_id: UA-1234-5678 // 자신의 추적 아이디 입력
```

---

## 3. head.html 수정

일반적으로 Jekyll 템플릿을 사용했다면 **_includes** 폴더에 **head.html**파일이 있을 것이다.

그 파일의 상단 부분에 다음 코드를 입력해주게 되면 끝이다.

아래 코드에서 [1]과 [2]의 기능은 같다.

[1]은 _config.yml에 입력한 값을 참조하는 방식이고

[2]는 바로 입력하는 방식이다. 

``` js
{% raw  %}
{% if site.google_analytics_id %}
    <script>
    // google analytics
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', '{{site.google_analytics_id}}', 'auto'); // [1]
      ga('create', 'UA-1234-5678', 'auto'); // [2]
      ga('send', 'pageview');

    </script>
{% endif %}
{% endraw  %}
```

<br>

만약 **head.html**에 코드를 넣지 않고 따로 파일로 관리하고 싶다면

**analytics.html**과 같이 파일을 만든 후

``` js
{% raw  %}
{% if site.google_analytics_id %}
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', '{{site.google_analytics_id}}', 'auto');
  ga('create', 'UA-1234-5678', 'auto');
  ga('send', 'pageview');

</script>
{% endif %}
{% endraw  %}

```

추적하려는 글의 상단 부분에 위에 만든 **analytics.html**파일을 include 시켜준다.


``` html
{% raw  %}
<!DOCTYPE html>
<html>
	{% include analytics.html %}
	{% include head.html %}

	<body>

	{% include header.html %}

	<div class="page-content">
	  <div class="wrap">
	  {{ content }}
	  </div>
	</div>

	{% include footer.html %}

	</body>
</html>
{% endraw  %}
```

## 4. 마무리

* [Google Analytics](https://marketingplatform.google.com/about/analytics/) 접속해서 다양한 로그를 확인해 볼 수 있다.


