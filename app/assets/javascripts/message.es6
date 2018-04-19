$(function(){

  //メッセージ非同期送信処理（ajax）
  function buildHTML(message){
    let html  =  `
                <div class="chat-space" data-id="${message.id}" >
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

  /*
  メッセージ自動更新処理機能
    - setIntervalにて毎5秒おきに関数updata処理実行
    - 現在のページから遷移した場合は、clearIntervalにて解除
  */
  $(function(){
    let message_timer = setInterval(update, 5000);
    window.location.href.match(/\/groups\/\d+\/messages/) ? message_timer : clearInterval(message_timer)　
  });
  //update関数処理処理
  function update () {
    var message_id = $('.chat-space').last().data('id');

    $.ajax ({
      url: location.pathname,
      type: 'GET',
      data: {message_id: message_id},
      dataType: 'json',
    })

    //メッセージが更新された時のみ.always実行
    .always(function(message_data){
      // console.log(this);
      //message controllerから返信処理を受けたmessageがlatest-message_idよりも新しい場合htmlの更新を実行する。
      message_data.forEach(function(message){
        if (message.id > message_id  ){
          let html = ""
          html += buildHTML(message);
          $('.mid-content').append(html);
        }

        // コメント追加後、画面を下にスクロール
        $('.mid-content').animate({scrollTop: $('.mid-content')[0].scrollHeight}, 'fast')
      })
    })
    return false
  }
})
