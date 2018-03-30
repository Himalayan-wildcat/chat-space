class UsersController < ApplicationController

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    # redirect_to root_path unless current_user.update(user_params)
    else
      render :edit
    end
  end

  private
  def user_params
    params.permit(:name, :email).require(:user)
  end
end
