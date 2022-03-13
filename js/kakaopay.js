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