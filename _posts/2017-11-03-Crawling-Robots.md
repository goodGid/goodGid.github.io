---
layout: post
title:  " Crawling :: Robots.txt "
date:   2017-11-03
excerpt: " Robots.txt "
cate : "post"
tag:
- Crawling
---

## Concept

* 로봇 배제 표준은 웹 사이트에 로봇이 접근하는 것을 방지하기 위한 규약으로, <br> 일반적으로 접근 제한에 대한 설명을 robots.txt에 기술한다.

* 이 규약은 권고안이며, 로봇이 robots.txt 파일을 읽고 접근을 중지하는 것을 목적으로 한다. <br> 따라서, 접근 방지 설정을 하였다고 해도, 다른 사람들이 그 파일에 접근할 수 있다. 

* robots.txt 파일은 항상 사이트의 루트 디렉토리에 위치해야 한다.



{% capture images %}
	/assets/img/posts/ec2_error_1.png
{% endcapture %}
{% include gallery images=images caption=" " cols=1 %}

## Example

만약 모든 로봇에게 문서 접근을 허락하려면, robots.txt에 다음과 같이 입력하면 된다.

User-agent: * <br>
Allow: /
{: .notice}


