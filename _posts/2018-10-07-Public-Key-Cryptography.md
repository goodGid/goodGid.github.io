---
layout: post
title:  " 공개 키 암호 방식(Public Key Crytography) "
categories: Technology
tags: Technology
author: goodGid
---
* content
{:toc}

## 공개 키 암호 방식이란?

* **공개 키 암호 방식(公開 - 暗號 方式, public-key cryptography)**은 암호 방식의 한 종류로 <br> 사전에 비밀 키를 나눠가지지 않은 사용자들이 안전하게 통신할 수 있도록 한다. 

* 공개 키 암호 방식에서는 *공개 키* 와 *비밀 키* 가 존재하며 <br> 공개 키는 누구나 알 수 있지만 그에 대응하는 비밀 키는 키의 소유자만이 알 수 있어야 한다.

* 공개 키 암호를 구성하는 알고리즘은 **대칭 키 암호 방식**과 비교하여 **비대칭 암호(非對稱暗號)**라고 부르기도 한다.






---

## 대표 알고리즘

### RSA

* RSA 암호와 같은 초기 암호들은 **두 개**의 **큰 소수**를 **곱한 숫자**를 문제로 사용한다. 

* 사용자는 **임의의 큰 소수**를 **두 개** 골라 **비밀 키**로 삼고 그 **곱한 값**을 **공개 키**로 공개한다.

* 큰 수의 소인수 분해는 대단히 풀기 어려운 문제에 속하기 때문에 <br> 다른 사람들은 비밀 키를 알 수 없을 것이라는 사실이 보장된다.

* 그러나 최근 이 분야의 연구가 크게 진전되어 RSA의 안전성을 보장하기 위해서는 <br> 수천비트 이상의 큰 소수를 키로 사용해야 한다.

* Youtube 영상 : [암호학, RSA 알고리즘에 대해 알아보자(공개키 기반 암호 시스템)](https://www.youtube.com/watch?v=7Wo6aBlcYu0)


---

## 질문

> Q. 공개키 알고리즘에서 개인키로 암호화한 내용을 공개키로 복호화할 수 있나요?

* Facebook에 [질문](https://www.facebook.com/groups/codingeverybody/permalink/2425685487471973/?comment_id=2425687414138447&reply_comment_id=2425766587463863&notif_id=1538897680326645&notif_t=group_comment)을 남겼고 다양한 답변이 달렸다.

* 한줄 요약하자면 RSA 방식은 가능하다. 

![](/assets/img/posts/public_key_cryptography_1.png)

![](/assets/img/posts/public_key_cryptography_3.png)

* 추가적으로 **전자 서명**에서도 **개인키로 암호화 -> 공개키로 복호화**하는 과정이 들어간다.

![](/assets/img/posts/public_key_cryptography_2.gif)

---

## 참고

* [공개 키 암호 방식](https://ko.wikipedia.org/wiki/%EA%B3%B5%EA%B0%9C_%ED%82%A4_%EC%95%94%ED%98%B8_%EB%B0%A9%EC%8B%9D)

* [Facebook 질문](https://www.facebook.com/groups/codingeverybody/permalink/2425685487471973/?comment_id=2425687414138447&reply_comment_id=2425766587463863&notif_id=1538897680326645&notif_t=group_comment)
