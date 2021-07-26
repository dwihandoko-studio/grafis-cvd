if (window.parent != window) {
    window.__MAIN_DOMAIN__ = 'https://covid19.go.id';
    var domainList = ['https://covid19.go.id'];
    window.addEventListener('message', function (e) {
        if (domainList.indexOf(e.origin) < 0) return;
        if (!e.data || e.data !== 'success') return;
        window.__MAIN_DOMAIN__ = e.origin;
    });
    domainList.forEach(function (e) {
        window.parent.postMessage({'state':'check'}, e);
    });
    setTimeout(function() {
        window.onresize = function() {
            console.log('message posted!', (new Date()).toUTCString());
            window.parent.postMessage({'state': 'loaded', 'height': document.body.offsetHeight, 'path': window.location.pathname, 'delay': 10}, window.__MAIN_DOMAIN__);
        };
        window.onbeforeunload = function() {
            window.parent.postMessage({'state': 'unload'}, window.__MAIN_DOMAIN__);
            return null;
        };
        window.onresize();

        if (document.readyState == 'loading') {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', window.onresize);
            }
            else document.attachEvent('onreadystatechange', function(){
                if (document.readyState=='complete') window.onresize();
            });
        }
    }, 950);
}