---
layout: post
title:  " Crawling :: Robots.txt "
categories: Technology
tags: Crawling
author: goodGid
---
* content
{:toc}


## Concept

* 로봇 배제 표준은 웹 사이트에 로봇이 접근하는 것을 방지하기 위한 규약으로, <br> 일반적으로 접근 제한에 대한 설명을 robots.txt에 기술한다.

* 이 규약은 권고안이며, 로봇이 robots.txt 파일을 읽고 접근을 중지하는 것을 목적으로 한다. <br> 따라서, 접근 방지 설정을 하였다고 해도, 다른 사람들이 그 파일에 접근할 수 있다. 

* robots.txt 파일은 항상 사이트의 루트 디렉토리에 위치해야 한다.

## Example

* 만약 모든 로봇에게 문서 접근을 허락하려면, `robots.txt`에 다음과 같이 입력하면 된다.

User-agent: * <br>
Allow: /
{: .notice}

* 모든 로봇을 차단하려면, `robots.txt`에 다음과 같이 입력하면 된다.

User-agent: * <br>
Disallow: /
{: .notice}

* 모든 로봇에 세 디렉터리 접근을 차단하려면, `robots.txt`에 다음과 같이 입력하면 된다.

User-agent: * <br>
Disallow: /cgi-bin/ <br>
Disallow: /tmp/ <br>
Disallow: /junk/
{: .notice}


* 모든 로봇에 특정 파일 접근을 차단하려면, `robots.txt`에 다음과 같이 입력하면 된다.

User-agent: * <br>
Disallow: /directory/file.html
{: .notice}


* BadBot 로봇에 모든 파일 접근을 차단하려면, `robots.txt`에 다음과 같이 입력하면 된다.

User-agent: BadBot <br>
Disallow: /
{: .notice}


* BadBot 과 Googlebot 로봇에 특정 디렉터리 접근을 차단하려면, `robots.txt`에 다음과 같이 입력하면 된다.

User-agent: BadBot <br>
User-agent: Googlebot <br>
Disallow: /private/
{: .notice}

* 다양하게 조합하여 사용할 수 있다.

User-agent: googlebot　　　　　　　　# googlebot 로봇만 적용 <br>
Disallow: /private/　　　　　　　　　# 이 디렉토리를 접근 차단한다. <br>
<br>
User-agent: googlebot-news　　　　　# googlebot-news 로봇만 적용 <br>
Disallow: /　　　　　　　　　　　　　# 모든 디렉토리를 접근 차단한다. <br>
<br>
User-agent: *　　　　　　　　　　　　# 모든 로봇 적용 <br>
Disallow: /something/　　　　　　　　# 이 디렉토리를 접근 차단한다.
{: .notice}
