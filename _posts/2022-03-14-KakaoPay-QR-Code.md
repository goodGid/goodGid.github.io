---
layout: post
title:  " 블로그에 카카오페이(KakaoPay) QR코드 추가하기 (feat. Modal, Popup, Jekyll) "
categories: Technology
author: goodGid
---
* content
{:toc}

## Prologue

* 오랜만에 블로그를 수정했다.

  수정을 하게 된 이유는 버그(?)를 제보받게 되어서 하게 되었다.

* 19.10.12일에 블로그에 [Buy me Coffee](https://bit.ly/3Kvtdxw) 서비스를 추가했다.

  해당 서비스는 커피 한 잔 정도를 감사의 마음으로 전달할 수 있는 간편 이체 서비스이다.

* 사실 저걸 붙였던 이유는 그냥 재밌어 보여서 붙였고

  누가 나에게 커피를 보내주겠어? 라는 생각으로 기억 속에서 잊고 지내다

  우연치 않게 블로그 방문자분을 실제로 만나게 되었는데

  그 분께서 저 서비스를 이용해서 마음을 전달하고 싶었는데 
  
  한국에서는 지원이 안 된다는 이야기를 들었다. (띠용)

* 그래서 어차피 내 블로그의 방문자는 대부분 한국인이니

  이참에 [Buy me Coffee](https://www.buymeacoffee.com/equEhZO) 대신 [카카오페이 QR 코드](https://github.com/goodGid/goodGid.github.io/pull/2/files)를 넣기로 했다. 😀



---

## KakaoPay QR 추가

* 참고로 이 글에서 이야기하는 작업 내용은

  절대적으로 필자 블로그 구조에 맞게 작업을 한 것이니

  어떤식으로 작업을 했는지 그 느낌만 이해하고

  본인의 블로그에 알맞게 코드를 추가하면 된다. ㅎㅎ

---

### 버튼 이미지 & KakaoPay QR

* 우선 버튼에 사용할 이미지와 실제 본인 계정의 KakaoPay QR 코드 발급이 필요하다.

  버튼에 사용할 [이미지](https://github.com/goodGid/goodGid.github.io/blob/master/assets/img/kakaopay/kakaopay_logo.png)는 인터넷에서 찾으면 되고

  [KakaoPay QR 코드](https://github.com/goodGid/goodGid.github.io/blob/master/assets/img/kakaopay/kakaopay_qr.png)는 인터넷에서 생성 방법을 찾으면 쉽게 발급할 수 있으므로 이 글에서는 따로 다루지 않겠다.

---

### html 파일 수정

* **[head.html](https://github.com/goodGid/goodGid.github.io/blob/master/_includes/head.html)**와 **[header.html](https://github.com/goodGid/goodGid.github.io/blob/master/_includes/header.html)** 두 곳을 수정하였다.

> [head.html](https://github.com/goodGid/goodGid.github.io/blob/master/_includes/head.html)

``` html
...
<link rel="stylesheet" href="/css/kakaopay-modal.css">
...
```

* html 작업에 꽃 ! 

  가장 상위 계층인 head.html에서 CSS 처리를 위해 생성한 [kakaopay-modal.css 파일](https://github.com/goodGid/goodGid.github.io/blob/master/css/kakaopay-modal.css)을 import 한다.

---

> [header.html](https://github.com/goodGid/goodGid.github.io/blob/master/_includes/header.html)

``` html
...
<li class="li-kakaopay-btn">
    <!-- Trigger/Open The Modal -->
    <button id="kakaoPayBtn"><img src="{% raw %}{{ site.url }}{% endraw %}/assets/img/kakaopay/kakaopay_logo.png"></button>

    <!-- The Modal -->
    <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
        <img src="{% raw %}{{ site.url }}{% endraw %}/assets/img/kakaopay/kakaopay_qr.png" class="kakaopay-qr-img">
        <p>글이 도움이 되었을까요? 😀</p>
    </div>
</li>
...
<script src="{% raw %}{{ site.url }}{% endraw %}/js/kakaopay.js"> </script> 
...
```

* header.html의 코드는 Navigation Bar 영역을 담당한다.

  그래서 위 코드는 Navigation Bar에 카카오페이 버튼을 그려준다.

  ![](/assets/img/tech/KakaoPay-QR-Code_1.png)


* 그리고 저 카카오페이 버튼을 클릭하면 

  [kakaopay.js](https://github.com/goodGid/goodGid.github.io/blob/master/js/kakaopay.js)에 정의되어있는 로직이 동작하면서 다음과 같은 이미지가 뜬다.

  ![](/assets/img/tech/KakaoPay-QR-Code_2.png)

---

> [kakaopay.js](https://github.com/goodGid/goodGid.github.io/blob/master/js/kakaopay.js)

``` js
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var kakaoPayBtn = document.getElementById("kakaoPayBtn");

// When the user clicks the button, open the modal 
kakaoPayBtn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

window.onload = function() {
    hideKakaopayBtnIfMobileEnv();
};

function hideKakaopayBtnIfMobileEnv(){
    var UserAgent = navigator.userAgent;
    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
        document.getElementsByClassName("li-kakaopay-btn")[0].style.display = 'none'
        return true;
    } else {
        return false;
    }
}
```

* PC 혹은 Mobile로 블로그에 접근할 수 있는데

  Mobile 에서는 QR 코드를 띄우는 게 좋아 보이지 않아서

  PC 환경에서만 KakaoPay QR을 볼 수 있도록 **hideKakaopayBtnIfMobileEnv( )** 메소드를 이용하여 처리하였다.

---

## Summary

* 작업 내용을 쉽게 볼 수 있도록 [Github PR](https://github.com/goodGid/goodGid.github.io/pull/2)을 생성해두었으니 참고하자 !