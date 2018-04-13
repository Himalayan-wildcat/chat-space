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
      list.append(html);
    }

    // when there is NO match found
    function show_no_user(user){
      var html = `
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">
                      ${user}
                    </p>
                  </div>
                 `
      list.append(html);
    }
    $('#user-search-field').on('keyup', function(){
      var input = $(this).val();
      if (input !== null ){
        $.ajax({
          url: '/users',
          type: 'GET',
          data: {keyword: input},
          dataType: 'json',
        })
        .done(function(users){
          $('#user-search-result').empty();
          if(users.length !== 0){
            users.forEach(function(user){
              show_user(user);
            });
          }
          else{
            show_no_user('No Match Found');
          }
        })
        .fail(function(){
          alert('No User Matched.');
        })
      }
    })
  });
