/* jshint asi:true */

/**
 * [fixSidebar description]
 * 휠이 특정 위치로 구르면 사이드 바 랩에 고정 스타일을 추가하십시오.
 * 그렇지 않으면 스타일을 취소하십시오.
 */
(function() {
    increaseAccessCount(document.URL)

    if (window.innerWidth > 770) {

        var sidebarWrap = document.querySelector('.right>.wrap')

        //fix
        sidebarWrap.style.width = sidebarWrap.offsetWidth + "px"
        window.onscroll = function() {

            // 페이지 하단에서 롤인 거리
            var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
            // console.log('scrollTop : ', scrollTop)

            // 페이지 하단에서 롤인 거리
            var htmlHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
            // console.log('htmlHeight : ', htmlHeight)

            var scrollBottom = htmlHeight - window.innerHeight - scrollTop
            // window.innerHeight : 821
            // console.log('scrollBottom : ', scrollBottom)

            if (scrollTop < 53) {
                sidebarWrap.classList.remove('fixed')
                sidebarWrap.classList.remove('scroll-bottom')
            } else if (scrollBottom >= (190 - 38)) {
                sidebarWrap.classList.remove('scroll-bottom')
                sidebarWrap.classList.add('fixed')
            } else if (isMaxHeight()) { //content maxHeight에 도달
                sidebarWrap.classList.remove('fixed')
                sidebarWrap.classList.add('scroll-bottom')
            }
        }
        setContentMaxHeightInPC() // 디렉토리의 최대 높이 설정 (PC 쪽)
    }
    moveTOC() // 컨텐츠 전송
}());

function customAlert(htmlHeight, scrollTop){
    if (htmlHeight - 1200 < scrollTop){
        var alerted = sessionStorage.getItem('alerted') || '';
        if (alerted != 'yes') {
            alert("1회 노출");
            sessionStorage.setItem('alerted','yes');
        }
    }
}

/**
 * 디렉토리의 최대 높이 설정
 */
function setContentMaxHeightInPC() {
    var windowHeight = window.innerHeight
    var contentUl = document.querySelector('.content-ul')
    var contentMaxHeight = windowHeight - 77 - 60
    contentUl.style.maxHeight = contentMaxHeight + 'px'
}

/**
 * 최대 높이 도달
 * @return {Boolean} [description]
 */
function isMaxHeight() {
    var windowHeight = window.innerHeight
    var contentUl = document.querySelector('.content-ul')
    var contentMaxHeight = windowHeight - 77 - 60
    var contentHeight = contentUl.offsetHeight
    return contentMaxHeight === contentHeight
        // console.log(contentMaxHeight);
        // console.log(contentHeight);
}


//-------------mobile--------------
/**
 * 화면 너비가 770px보다 작으면 
 * 앵커 버튼을 클릭하여 디렉토리 상자를 팝업
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {
    if (window.innerWidth <= 770) {
        var anchorBtn = document.querySelector('.anchor')
        var rightDiv = document.querySelector('.right')

        /**
         * 앵커 버튼 듣기
         */
        anchorBtn.onclick = function(e) {
            e.stopPropagation()
            rightDiv.classList.add('right-show')
            anchorBtn.classList.add('anchor-hide')
        }

        // 본문을 모니터링하고 본문을 클릭하고 내용을 숨기십시오.
        document.querySelector('body').addEventListener('click', function() {
            rightDiv.classList.remove('right-show')
            anchorBtn.classList.remove('anchor-hide')
        })

        ancherPostion(anchorBtn, rightDiv) // 디렉토리 앵커의 고정 위치
        setContentMaxHeight() // 디렉토리의 최대 높이 설정
    }
}());

/**
 * 디렉토리 앵커의 고정 위치
 */
function ancherPostion(anchorBtn, rightDiv) {
    window.addEventListener('scroll', function() {
        // console.log('scroll');
        var top = anchorBtn.getBoundingClientRect().top
            // console.log(top);
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        if (scrollTop > 50) {
            anchorBtn.style.top = '20px'
            rightDiv.style.top = '20px'
        } else {
            anchorBtn.style.top = '76px'
            rightDiv.style.top = '76px'
        }
    })
}

/**
 * 디렉토리의 최대 높이 설정
 */
function setContentMaxHeight() {
    var windowHeight = window.innerHeight
    var contentUl = document.querySelector('.content-ul')
    var contentMaxHeight = windowHeight - 180
    contentUl.style.maxHeight = contentMaxHeight + 'px'
}

//-------------post Content----------------------
function moveTOC() {
    if (document.querySelector('#markdown-toc') !== null) {
        var TOCString = document.querySelector('#markdown-toc').innerHTML
        var contentUl = document.querySelector('#content-side')
        contentUl.insertAdjacentHTML('afterbegin', TOCString) // 문자열 삽입

        // if (!isAndroidWechatBrowser()) {

            // 부드러운 스크롤을 위해 스크롤 스타일 추가
            // add class "scroll", for smooth scroll
            var aTags = document.querySelectorAll('#content-side a')

            //add class for everyone
            // aTags.forEach(function () {
            //     console.log(this);
            // })
            for (var i = 0; i < aTags.length; i++) {
                // if (!aTags[i].classList.contains('scroll')) {
                //     aTags[i].classList.add('scroll')
                // }
                if (!aTags[i].hasAttribute('data-scroll')) {
                  aTags[i].setAttribute('data-scroll','');
                }

            }
        // }

    }
}

/**
 * WeChat 브라우저의 Android 버전을 판단하십시오.
 * @return {Boolean} [description]
 */
function isAndroidWechatBrowser() {
    var ua = navigator.userAgent.toLowerCase()
    return /micromessenger/.test(ua) && /android/.test(ua2)
}
