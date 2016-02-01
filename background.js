
var contextId;

function bindEvents() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
        console.log('request: ' + JSON.stringify(request));
        console.log('sender: ' + JSON.stringify(sender));
        console.log('sendRequest: ' + JSON.stringify(sendRequest));
    });
}

function createMenu() {
    contextId = chrome.contextMenus.create({
        "title": '添加/更新当前位置到书签',
        "contexts": ["page"],
        "onclick": menuHandle
    });
}

function menuHandle() {
    console.log('click');
}


function init() {
    createMenu();
    bindEvents();
}

init();