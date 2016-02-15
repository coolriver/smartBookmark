var contextId,
    requestCur,
    senderCur;

function bindEvents() {
    // 响应来自content_script的message
    chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
        if (request.type === 'bookmark-position') {
            console.log('request: ' + JSON.stringify(request));
            console.log('sender: ' + JSON.stringify(sender));
            //console.log('sendRequest: ' + sendRequest);
            requestCur = request;
            senderCur = sender;
            //sendRequestCur = sendRequest;
            //sendRequest(requestCur);
        }
    });
}

function createMenu() {
    // 添加右键菜单
    var contexts = ["page", "selection", "link", "editable", "image", "video",
        "audio"
    ];
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
    console.log(obj);
    chrome.storage.sync.set(obj, function() {
        console.log('send callback');
        chrome.tabs.query({ // 查找当前tab
            active: true,
            currentWindow: true
        }, function(tabs) { // 发送消息到当前tab,添加书签相关dom节点
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'add-bookmark-cb',
                pageX: requestCur.pageX,
                pageY: requestCur.pageY
            });
        });
    });
}


function init() {
    createMenu();
    bindEvents();
}

init();
