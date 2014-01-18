class Api::CommentsController < ApplicationController
  def create
    @comment = TodoComment.new(params[:comment])
    if @comment.save
      render "comments/show"
    else
      render :json => @comment.errors, :status => :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render "comments/show"
  end

  def index
    @comments = TodoComment.where(:todo_id => params[:todo_id])
    render "comments/index"
  end
  
  def show
    @comment = TodoComment.find(params[:id])
    render "comments/show"
  end
end