---
layout: post
title:  "Moon Jekyll Theme 2 "
date:   2016-04-06
excerpt: "Minimal, one column Jekyll theme for your blog."
cate : "project"
tag:
- jekyll 
- moon
- blog
- about
- theme
comments: true
---

![Moon Homepage](https://cloud.githubusercontent.com/assets/754514/14509720/61c61058-01d6-11e6-93ab-0918515ecd56.png)    
    
<center><b>Moon</b> is a minimal, one column jekyll theme.</center>


<iframe src="https://ghbtns.com/github-btn.html?user=TaylanTatli&repo=Moon&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>    
      
## Installation
* Fork the [Moon repo](https://github.com/TaylanTatli/Moon/fork)
* Edit `_config.yml` file.
* Remove sample posts from `_posts` folder and add yours.
* Edit `index.md` file in `about` folder.
* Change repo name to `YourUserName.github.io`    
     
That's all.

## Preview

{% capture images %}
	https://cloud.githubusercontent.com/assets/754514/14509716/61ac6c8e-01d6-11e6-879f-8308883de790.png
	https://cloud.githubusercontent.com/assets/754514/14509717/61ad05ae-01d6-11e6-85ae-5a817dd8763b.png
	https://cloud.githubusercontent.com/assets/754514/14509714/61a89708-01d6-11e6-8fcd-74b002a060df.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Moon Theme" cols=3 %}

---

{% capture images %}
	https://cloud.githubusercontent.com/assets/754514/14509718/61b09a20-01d6-11e6-8da1-4202ae4d83cd.png
	https://cloud.githubusercontent.com/assets/754514/14509715/61aa9d00-01d6-11e6-81a6-c6837edf2e84.png
{% endcapture %}
{% include gallery images=images caption="Moon Theme on Small Screen Size" cols=2 %}      
      
See a [live version of Moon](http://taylantatli.github.io/Moon) hosted on GitHub.      


#### url

Used to generate absolute urls in `sitemap.xml`, `feed.xml`, and for generating canonical URLs in `<head>`. When developing locally either comment this out or use something like `http://localhost:4000` so all assets load properly. *Don't include a trailing `/`*.

Examples:

{% highlight yaml %}
url: http://taylantatli.me/Moon
url: http://localhost:4000
url: //cooldude.github.io
url:
{% endhighlight %}





### Feature Image

You can set feature image per post. Just add `feature: some link` to your post's front matter.

```
feature: /assets/img/some-image.png
or
feaure: http://example.com/some-image.png
```    
 This also will be used for twitter card:
