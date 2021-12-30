function increaseAccessCount(currentUrl){
    var xhr = new XMLHttpRequest();

    var data = {
        accessUrl: currentUrl
    };

    xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 201) {
        console.log(xhr.responseText);
    } else {
        console.error(xhr.responseText);
    }
    };

    // xhr.open("POST","http://localhost:8080/increase/view-count");
    // xhr.open("POST", "https://goodgid.ga/increase/view-count");
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.send(JSON.stringify(data));
}