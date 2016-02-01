var renderList = function(list) {
    var _out_ = [];
    _out_.push('<ul>');
    for (var len = list.length, i=0; i < len; i++) {
        var item = list[i];
        _out_.push('<li>');
        _out_.push(item.name);
        _out_.push('</li>');
    }
    _out_.push('</ul>');
    return _out_.join('');
};