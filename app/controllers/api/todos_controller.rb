class Api::TodosController < ApplicationController
  def create
    @todo = Todo.new(params[:todo])

    if @todo.save
      render :json => @todo
    else
      render :json => @todo.errors, :status => :unprocessable_entity
    end
  end
  
  def index
    @todos = Todo.all
    render :json => @todos
  end
  
  def show
    @todo = Todo.find(params[:id])
    render :json => @todo
  end
end
