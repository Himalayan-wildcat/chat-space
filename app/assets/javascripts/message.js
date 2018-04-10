$(function () {
  // function buildHTML(message){
  // var html = `<p>
  //             `
  //
  // return html;
  // }
  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var fd = new FormData($(this).get(0));
    var href = window.location.href + '/messages'
    // $.ajax($(this).attr('action'),{
    $.ajax({
      type: "POST",
      data: fd,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      console.log(data);
      var html = buildHTML(data);
      $('.mid-content').append(html)
      $('.lower-content__text').val('')
    })
    // .fail(function(){
    //   alert('エラーです。');
    // })
  })
});
