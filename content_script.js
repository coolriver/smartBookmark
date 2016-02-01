var $doc = $(document),
    $body = $(document.body),
    $tag = null;

function insertBookTag(pageX, pageY) {
    var isFirst = $tag ? false : true;

    $tag = $tag ? $tag : $('<div id="book-mark-tag">tag</div>');
    $tag.css({
        top: pageY + 'px',
        left: pageX + 'px'
    });

    if (isFirst) {
        $body.append($tag);
        $tag = $('#book-mark-tag');
    }
}

function bindEvents() {
    $doc.on('mouseup', function(e) {
            console.log(e.which);
            chrome.runtime.sendMessage({
                type: 'mouseup-message',
                pageX: e.pageX,
                pageY: e.pageY
            });

            insertBookTag(e.pageX, e.pageY);
        })
        .on('ready', function(e) {
            if ($tag) { // if book mark tag exist
                $body.animate({
                    scrollTop: $tag.css('top')
                }, 1000);
            }
/*            chrome.storage.sync.set({
                'river': 123123
            }, function(data) {
                chrome.storage.sync.get('river', function(data) {
                    console.log('get: ' + JSON.stringify(data));
                });
                console.log('set: ' + JSON.stringify(data));
            });*/

            chrome.storage.sync.get('river', function(data) {
                console.log('get: ' + JSON.stringify(data));
            });
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
