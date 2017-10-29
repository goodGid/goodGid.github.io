---
layout: post
title:  " Node :: Url and Querystring "
date:   2017-10-22
excerpt: " Url and Querystring "
cate : "post"
tag:
- Node.js
---


## Code
{% highlight JavaScript %}


const url = require('url');
const querystring = require('querystring');

let urlPath = 'https://www.google.co.kr/search?a=b&c=d&e=f';

let urlParsed = url.parse(urlPath);
let queryParsed = querystring.parse(urlParsed.query);

console.log(urlParsed);
console.log("======================================================================");
console.log(urlParsed.path);
console.log("======================================================================");
console.log(queryParsed);


{% endhighlight %}

---


## Output

{% capture images %}
    /assets/img/posts/url&querystring_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

## File

[Url&Qeurystring.js](https://github.com/goodGid/Node.js/blob/master/Source/url_and_querystring.js)
