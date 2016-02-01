
var contextId,
    requestCur,
    senderCur,
    sendRequestCur;

function bindEvents() {
    // 响应来自content_script的message
    chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
        if (request.type === 'bookmark-position') {
            console.log('request: ' + JSON.stringify(request));
            console.log('sender: ' + JSON.stringify(sender));
            console.log('sendRequest: ' + sendRequest);
            requestCur = request;
            senderCur = sender;
            sendRequestCur = sendRequest;
            sendRequest(requestCur);
        }
    });
}

function createMenu() {
    // 添加右键菜单
    var contexts = ["page","selection","link","editable","image","video",
        "audio"];
    contextId = chrome.contextMenus.create({
        "title": '保存当前位置到书签',
        "contexts": contexts,
        "onclick": menuHandle
    });
}

/**
 * 点击右键菜单
 * 保存当前书签信息到storage
 */
function menuHandle() {
    console.log('click');
    var value = {},
        key = senderCur.url,
        obj = {};

    value.pageX = requestCur.pageX;
    value.pageY = requestCur.pageY;
    value.progress = requestCur.progress;

    obj[key] = value;
    chrome.storage.sync.set(obj);
}


function init() {
    createMenu();
    bindEvents();
}

init();