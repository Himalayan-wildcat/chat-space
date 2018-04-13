$(function(){
    var list = $('#user-search-result');

    // when there is a match found
    function show_user(user){
      var html = `
                  <div class="chat-group-users">
                    <div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">
                        ${user.name}
                      </p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>
                        追加
                      </a>
                    </div>
                  </div>
                  `
      return html;
    }

    // when there is NO match found
    function show_no_user(){
      var html = `
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">
                      Show No User
                    </p>
                  </div>
                 `
      list.append(html);
    }
    $('#user-search-field').on('keyup', function(){
      var input = $(this).val();
      if (input !== "" ){
        $.ajax({
          url: '/users',
          type: 'GET',
          data: {keyword: input},
          dataType: 'json',
        })
        .done(function(users_data){
          if(users_data.length !== 0){
            var html = "";
            users_data.forEach(function(user){
              html += show_user(user);
              list.html(html);
            });
          }
          else{
            show_no_user();
          }
        })
        .fail(function(){
          alert('No User Matched.');
        })
      }
      else{
        $('#user-search-result').empty();
      }
    })
  });
