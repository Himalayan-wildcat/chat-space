class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new

    #メッセージがあれば、最新のidよりも新しいmessageのid検索結果を@messagesに代入
    if params[:message_id].present?
      @messages = @group.messages.where('id > ?', params[:message_id])

    else
      @messages = @group.messages.includes(:user)
    end

    respond_to do |format|
      format.html { @messages }
      format.json { @messages }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group)}
        format.json
      end
    else
       @messages = @group.messages.includes(:user)
       flash.now[:alert] = 'メッセージを入力して下さい。'
       render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
