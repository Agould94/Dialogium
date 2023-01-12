Rails.application.routes.draw do
  resources :sections
  resources :lessons
  resources :notes
  resources :blogs
  resources :videos
  resources :course_works
  resources :courses
  resources :users
  resources :completions, only: [:index, :show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "signup", to: "users#create"
  get "/me", to: "users#show"

  get '/hello', to: 'application#hello_world'
  get 'completion', to: 'completions#generate_completion'
  get 'completions', to: 'completions#index'
end
