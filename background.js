// Go to the main screen when the icon is clicked
chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("main.html") });
});


// Strip security headers from responses
chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        var headers = info.responseHeaders;
        for (var i=headers.length-1; i>=0; --i) {
            var header = headers[i].name.toLowerCase();
            if (header == 'x-frame-options' || header == 'frame-options' || header == 'content-security-policy') {
                headers.splice(i, 1);
            }
        }
        return {responseHeaders: headers};
    },
    {
        urls: ['*://yandex.ru/*'],
        types: ['sub_frame']
    },
    ['blocking', 'responseHeaders']
);
