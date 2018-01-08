---
layout: post
title:  " EC2 :: Middleware (2) "
date:   2018-01-08
excerpt: " EC2 :: Middleware (2) "
cate : "post"
tag:
- EC2
---


## EC2에서 인스턴스 표준시간대 변경

1. 현재 표준시간대 확인
{% highlight JavaScript %}
  date
{% endhighlight %}


{% capture images %}
  /assets/img/posts/localtime_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}


2. 표준 시간대 파일 찾기
  1. 전체 시간대 탐색
{% highlight JavaScript %}
  ls /usr/share/zoneinfo
{% endhighlight %}

  2. 서울이 Asia에 있으므로 Asia폴더 접근
{% highlight JavaScript %}
  ls /usr/share/zoneinfo/Asia
{% endhighlight %}

{% capture images %}
  /assets/img/posts/localtime_3.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

3. LocalTime을 원하는 시간으로 바꾸기
{% highlight JavaScript %}
  sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
{% endhighlight %}

4. ubuntu 재부팅
{% highlight JavaScript %}
  sudo reboot
{% endhighlight %}
재부팅하는데 5 ~ 10분이 걸린다

5. 바뀐 시간대 확인
{% highlight JavaScript %}
  date
{% endhighlight %}

{% capture images %}
  /assets/img/posts/localtime_2.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}