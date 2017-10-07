---
layout: post
title:  "Markdown Syntax"
date:   2016-03-15
excerpt: "Just about everything you'll need to style in the theme: headings, paragraphs, blockquotes, tables, code blocks, and more."
cate : "post"
comments: true
---

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

### Body text

**This is strong**
*This is emphasized*

![Smithsonian Image](https://mmistakes.github.io/minimal-mistakes/images/3953273590_704e3899d5_m.jpg)
{: .image-right}

### Blockquotes

> Lorem ipsum dolor sit amet, test link adipiscing elit. Nullam dignissim convallis est. Quisque aliquam.

## List Types

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

## Code Snippets

{% highlight css %}
#container {
  float: left;
  margin: 0 -240px 0 0;
  width: 100%;
}
{% endhighlight %}

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

You can also use `<kbd>` tag for keyboard buttons.

{% highlight html %}
<kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
{% endhighlight %}

Press <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> to move your car. **Midtown Maddness!!**


### Feature Image

You can set feature image per post. Just add `feature: some link` to your post's front matter.

```
feature: /assets/img/some-image.png
or
feaure: http://example.com/some-image.png
```    
 This also will be used for twitter card:


## Notices

**Watch out!** You can also add notices by appending `{: .notice}` to a paragraph.
{: .notice}


## Preview

{% capture images %}
	https://cloud.githubusercontent.com/assets/754514/14509716/61ac6c8e-01d6-11e6-879f-8308883de790.png
	https://cloud.githubusercontent.com/assets/754514/14509717/61ad05ae-01d6-11e6-85ae-5a817dd8763b.png
	https://cloud.githubusercontent.com/assets/754514/14509714/61a89708-01d6-11e6-8fcd-74b002a060df.png
{% endcapture %}
{% include gallery images=images caption="Screenshots of Moon Theme" cols=3 %}

---


![Moon Homepage](https://cloud.githubusercontent.com/assets/754514/14509720/61c61058-01d6-11e6-93ab-0918515ecd56.png)    
<center><b>Moon</b> is a minimal, one column jekyll theme.</center>

---

## MathJax

[MathJax](http://www.mathjax.org/) 


Here is an example MathJax inline rendering \\( 1/x^{2} \\), and here is a block rendering: 
\\[ \frac{1}{n^{2}} \\]


---