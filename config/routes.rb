Rails.application.routes.draw do
  
  
  resources :notes
  resources :blogs
  resources :videos
  resources :course_works
  resources :courses 
  resources :sections 
  resources :lessons
    
  resources :users
  resources :completions, only: [:index, :show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  

  get '/search', to: "videos#search"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "signup", to: "users#create"
  get "/me", to: "users#show"
  patch '/take_course', to: "users#take_course"

  get '/hello', to: 'application#hello_world'

  get 'completion', to: 'completions#generate_completion'
  patch 'lessoncompletion/:id', to: 'completions#generate_lesson'
  get 'completions', to: 'completions#index'
end
