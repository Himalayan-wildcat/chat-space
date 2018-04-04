class MessagesController < ApplicationController
  before_action :choose_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    # binding.pry
    if @message.save
      redirect_to group_messages_path(@group)
    else
       @message = @group.messages.includes(:user)
       flash.now[:alert] = 'type your messages here!!'
       render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def choose_group
    @group = Group.find(params[:group_id])
  end
end
