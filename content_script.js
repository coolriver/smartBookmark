var $doc = $(document),
    $body = $(document.body),
    $tag = null,
    heightTotal = $doc.height();

function insertBookTag(position) {
    var isFirst = $tag ? false : true,
        pageX = position.pageX,
        pageY = position.pageY;

    $tag = $tag ? $tag : $('<div id="book-mark-tag">tag</div>');
    console.log(pageX, pageY);
    $tag.css({
        top: pageY + 'px',
        left: pageX + 'px'
    });

    if (isFirst) {
        $body.append($tag);
        $tag = $('#book-mark-tag');
    }
}

function checkBookmark(e) { // 初始化时检测storage中当前页面的书签信息
    var url = location.href;
    chrome.storage.sync.get(url, function(data) {
        data = data[url];
        console.log('get: ' + JSON.stringify(data));
        if (!data) {
            console.log('this page do not have a position bookmark'); 
            return;
        }
        insertBookTag(data);
        $body.animate({
            scrollTop: data.pageY
        }, 1000);
    });
}

function bindEvents() {
    $doc.on('mouseup', function(e) { // 右键记录当前位置，并发送message给background
            console.log(e.which);

            if (e.which === 3) {
                chrome.runtime.sendMessage({
                    type: 'bookmark-position',
                    pageX: e.pageX,
                    pageY: e.pageY,
                    progress: Math.floor(e.pageY * 100 / heightTotal)
                });
            }
        })
        .on('ready', checkBookmark);

    chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
        if (request.type === 'add-bookmark-cb') {
            insertBookTag(request);
        }
    });
}

function init() {
    $tag = $('#book-mark-tag');
    if ($tag.length === 0) {
        $tag = null;
    }
    bindEvents();
}

init();
