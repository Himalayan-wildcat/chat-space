$(function(){
  function buildHTML(message){
    var html  =  `
                <div class="chat-space">
                  <div class="upper-chat-space">
                    <div class="upper-chat-space__name">
                      ${message.user_name}
                    </div>
                    <div class="upper-chat-space__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-chat-space">
                    <div class="lower-chat-space__text">
                      <p>
                        ${message.body}
                      </p>
                      ${message.image ? '<img src = "'+　message.image　+'" >' : ""}
                    </div>
                  </div>
                </div>
                `
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var fd = new FormData(this);
    // var href = window.location.href + '/messages'
    // var url = $(this).attr('action')
    $.ajax({
      url: $(this).attr('action'),
      type: "POST",
      data: fd,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    //ajax処理が機能した場合
    .done(function(data){
      var html = buildHTML(data);
      $('.mid-content').append(html)
      $('.lower-content__text').val('')
    //コメント追加後、画面を下にスクロール
      $('.mid-content').animate({scrollTop: $('.mid-content')[0].scrollHeight}, 'fast')
    })
    //ajax処理が機能しなかった場合
    .fail(function(){
      alert('エラーです。');
    })
    //.done/.fail処理後のprevent Default処理
    // $('.lower-content__text').prop("disabled", false);
    return false;
  })
})
