class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post
  before_action :set_comment, except: [:create]
  before_action :require_same_user, only: [:destroy, :edit, :update]

  def create
    # debugger
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user
    @comment.save

    respond_to do |format|
      format.js
    end
  end

  def destroy
    @comment.destroy

    respond_to do |format|
      format.js
    end
  end

  def edit
  end

  def update
    if @comment.update(comment_params)
      flash[:success] = "Comment was successfully updated"
      redirect_to post_path(@post)
    else
      render 'edit'
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:text, :post_id)
  end

  def set_post
    @post = Post.find(params[:post_id])
  end

  def set_comment
    @comment = @post.comments.find(params[:id])
  end

  def require_same_user
    if @comment.user != current_user
      flash[:danger] = "You can only edit or delete your own comments"
      redirect_to root_path
    end
  end
end
