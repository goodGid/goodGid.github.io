---
layout: post
title:  "Markdown Syntax"
categories: E.T.C
tags: E.T.C
author: goodGid
---
* content
{:toc}


[1. 정리되어 있는 Blog](https://help.github.com/articles/basic-writing-and-formatting-syntax/)

[2. 정리되어 있는 Blog](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)



# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

### Body text

**This is strong**

*This is emphasized*

italic Font

*내용이 들어갈 곳*

_내용이 들어갈 곳_




### Blockquotes

> Lorem ipsum dolor sit amet, test link adipiscing elit. Nullam dignissim convallis est. Quisque aliquam.


### Ordered Lists

1. Item one
   1. sub item one
   2. sub item two
   3. sub item three
2. Item two

### Unordered Lists

* Item one
* Item two
* Item three

## Tables

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|----
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|=====
| Foot1   | Foot2   | Foot3
{: rules="groups"}


|  \-- | \--- | \-\-- |

결과값


{% capture images %}
/assets/img/posts/md_syntax_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %} 



## Code Snippets

{% highlight css %}
#container {
  float: left;
  margin: 0 -240px 0 0;
  width: 100%;
}
{% endhighlight %}

{% highlight bash %}
whoami
{% endhighlight %}{: style='margin-left:30px;'}


## Buttons

Make any link standout more when applying the `.btn` class.

{% highlight html %}
<a href="#" class="btn btn-success">Success Button</a>
{% endhighlight %}

<div markdown="0"><a href="#" class="btn">Primary Button</a></div>
<div markdown="0"><a href="#" class="btn btn-success">Success Button</a></div>
<div markdown="0"><a href="#" class="btn btn-warning">Warning Button</a></div>
<div markdown="0"><a href="#" class="btn btn-danger">Danger Button</a></div>
<div markdown="0"><a href="#" class="btn btn-info">Info Button</a></div>

## KBD

Press <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> to move your car.


### Feature Image

You can set feature image per post. Just add `feature: some link` to your post's front matter.

```
feature: /assets/img/some-image.png
or
feaure: http://example.com/some-image.png
```    



## Notices

You can also add notices by appending `{: .notice}` to a paragraph.
{: .notice}


## Preview

{% capture images %}
	https://cloud.githubusercontent.com/assets/754514/14509716/61ac6c8e-01d6-11e6-879f-8308883de790.png
	https://cloud.githubusercontent.com/assets/754514/14509717/61ad05ae-01d6-11e6-85ae-5a817dd8763b.png
	https://cloud.githubusercontent.com/assets/754514/14509714/61a89708-01d6-11e6-8fcd-74b002a060df.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Moon Theme" cols=3 %}


![Moon Homepage](https://cloud.githubusercontent.com/assets/754514/14509720/61c61058-01d6-11e6-93ab-0918515ecd56.png)    
<center><b>Moon</b> is a minimal, one column jekyll theme.</center>

## MathJax

[MathJax](http://www.mathjax.org/) 

Here is an example MathJax inline rendering \\( 1/x^{2} \\), and here is a block rendering: 
\\[ \frac{1}{n^{2}} \\]


it is intended only for human readers.[^1]

[^1]: <http://en.wikipedia.org/wiki/Syntax_highlighting>





Consult [Jekyll's documentation](http://jekyllrb.com/docs/configuration/) for more information.


[Install Moon](https://github.com/TaylanTatli/Moon){: .btn}

<iframe width="560" height="315" src="//www.youtube.com/embed/SU3kYxJmWuQ" frameborder="0"> </iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZYX0FaqUeN4" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>


#### One Up

<figure>
	<a href="http://farm9.staticflickr.com/8426/7758832526_cc8f681e48_b.jpg"><img src="http://farm9.staticflickr.com/8426/7758832526_cc8f681e48_c.jpg"></a>
	<figcaption><a href="http://www.flickr.com/photos/80901381@N04/7758832526/" title=" Click Title "> Ttile txt</a>.</figcaption>
</figure>



#### Two Up

<figure class="half">
	<a href="http://placehold.it/1200x600.JPG"><img src="http://placehold.it/600x300.jpg"></a>
	<a href="http://placehold.it/1200x600.jpeg"><img src="http://placehold.it/600x300.jpg"></a>
	<figcaption>Two images.</figcaption>
</figure>


#### Three Up

<figure class="third">
	<img src="http://placehold.it/600x300.jpg">
	<img src="http://placehold.it/600x300.jpg">
	<img src="http://placehold.it/600x300.jpg">
	<figcaption>Three images.</figcaption>
</figure>


### Alternative way

{% capture images %}
	http://vignette2.wikia.nocookie.net/naruto/images/9/97/Hinata.png
	http://vignette4.wikia.nocookie.net/naruto/images/7/79/Hinata_Part_II.png
	http://vignette1.wikia.nocookie.net/naruto/images/1/15/J%C5%ABho_S%C5%8Dshiken.png
{% endcapture %}
{% include gallery images=images caption="Test images" cols=3 %}

=> gg

-> gg

==> gg

--> gg

\==> gg

\--> gg

