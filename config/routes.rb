BackboneDemo::Application.routes.draw do
  root :to => "site#root"
  
  namespace :api do
    resources :todos, :only => [:create, :index, :show] do
      resources :comments, :only => [:index]
    end

    resources :comments, :only => [:create, :show]
  end
end
