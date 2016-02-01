document.addEventListener('DOMContentLoaded', function() {
  var list = [
    {name: 123},
    {name: 123},
    {name: 123},
    {name: 123}
  ];
  var html = renderList(list);
  $(document.body).append(html);
});