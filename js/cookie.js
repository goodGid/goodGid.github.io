function checkCookie() {
    var cookie_value = getCookie("userUniqueKey");

    if (cookie_value != "") {
        alert("Welcome again " + cookie_value);
    } else { 
        // var new_key = prompt("Please enter new Cookie Key:", "");
        var new_key = "refreshCookie";
        if (new_key != "" && new_key != null) {
            setCookie("userUniqueKey", new_key);
        }
    }
}

function getCookie(cname) {
    var value = document.cookie.match('(^|;) ?' + cname + '=([^;]*)(;|$)');
    return value ? value[2] : "";
}
  
function getCookie2(cname) { 
    var name = cname + "=";
    var ca = document.cookie.split(';');
    
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
  
function setCookie(cname, cvalue){
    var d = new Date();
    var path = "path=/"

    // d.setTime(d.getTime() + (1 * 60 * 60 * 1000)); // 1 hour
    // d.setTime(d.getTime() + (10 * 60 * 1000)); // 5 minute
    // d.setTime(d.getTime() + (1 * 60 * 1000)); // 1 minute
    // d.setTime(d.getTime() + (10 * 1000)); // 10 second
    // d.setTime(d.getTime() + (5 * 1000)); // 5 second    
    d.setTime(d.getTime() + (10 * 60 * 1000))
    var expires = "expires=" + d.toUTCString() + ";";

    // var myObject = JSON.parse('{"id":1,"gender":"male"}');
    // document.cookie = 'myObj='+ JSON.stringify(myObject) +';expires=' + e;

    document.cookie = cname + "=" + cvalue + ";" + expires + path;
}

function deleteCookie(cname){
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}