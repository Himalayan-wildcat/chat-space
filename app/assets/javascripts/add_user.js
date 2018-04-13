$(function(){

  var list = $('#chat-group-user')

  function addUser(user_id, user_name){
    var html = `
                <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>
                    ${user_name}
                  </p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn '>
                    削除
                  </a>
                </div>
                `
    list.append(html);
  }

  //add the log-in users to a chat member
  $("#user-search-result").on("click", ".user-search-add", function(e) {
    e.preventDefault();
    $(this).parent().remove();
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    addUser(user_id, user_name);
  });

  //put back the added users on the list
  $("#chat-group-users").on("click", ".user-search-remove", function() {
      $(this).parent().remove();
  })
})
