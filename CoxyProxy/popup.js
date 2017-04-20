
function main() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            let text = 'status: ' + xmlhttp.status + '<br>';
            if (xmlhttp.status == 200) {
                text += xmlhttp.responseText;
            }
            document.getElementById("myDiv").innerHTML = text;
        }
    };
    xmlhttp.open("GET", "http://localhost:10007/get?type=2&anon=3&cntr=Ru");
    xmlhttp.send();
}

window.addEventListener("load", main);
