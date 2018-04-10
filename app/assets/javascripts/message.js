$(function () {
  function buildHTML(message){
  var html = `<div class="chat-space">
                <div class="upper-chat-space">
                  <div class="upper-chat-space__name">
                    ${message.user.name}
                  </div>
                  <div class="upper-chat-space__date">
                  </div>
                </div>
                <div class="lower-chat-space">
                  <dib class="lower-chat-space__text">
                  </div>
                  <p class="lower-message__content">
                    ${message.body}
                  </p>
                </div>
              </div>`
  return html;
  }
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
    .fail(function(){
      alert('エラーです。');
    })
  })
});
