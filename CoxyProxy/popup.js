
const http_codes = {
    ok: 200,
    not_found: 404,
    no_conn: 0
};

function onToggleProxy(el) {
    console.log('onToggleProxy')
    if (el.checked) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let text = 'status: ' + xhr.status + '<br>';
                document.getElementById('myDiv').innerHTML = text;
                if (xhr.status == http_codes.ok) {
                    //console.log(xhr.responseText);
                    let proxies = JSON.parse(xhr.responseText).proxies;
                    //console.log(proxies);
                    let proxy = proxies[0];
                    console.log('setting: ', proxy);
                    let config = {
                        mode: 'fixed_servers',
                        rules: {
                            proxyForHttps: {
                                scheme: 'socks4',
                                host: proxy.ip,
                                port: proxy.port
                            }
                        }
                    };
                    chrome.proxy.settings.set({ value: config, scope: 'regular' }, function () { });
                    chrome.storage.local.set({ 'proxy_enabled': true }, function () {
                        //console.log('set');
                    });
                }
            }
        };
        xhr.open('GET', 'http://localhost:10007/get?type=2&anon=3&cntr=Ru');
        xhr.send();
    } else {
        chrome.storage.local.set({ 'proxy_enabled': false }, function () {
            console.log('set');
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let toggle = document.getElementById('toggleProxy');
    chrome.storage.local.get([ 'proxy_enabled' ], function (objs) {
        if (objs['proxy_enabled'] === undefined) {
            chrome.storage.local.set({ 'proxy_enabled': false }, function () {
                console.log('proxy_enabled was undefined, set to false');
            });
        }
        toggle.checked = objs.proxy_enabled;
        toggle.addEventListener('change', function (ev) {
            console.log(ev);
            onToggleProxy(toggle);
        });
    });
});
