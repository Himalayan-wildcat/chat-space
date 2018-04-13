class UsersController < ApplicationController

  def index
    # paramsとして送られてきたkeywordをUserモデルのnameカラムを検索→@usersに代入
    # ログインユーザーはインクリメンタルサーチの対象外
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id:current_user)
    # json formatにてユーザー名取得→jbuilderにてJSに返す
    respond_to do |format|
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end


  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
