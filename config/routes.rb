Rails.application.routes.draw do
  resources :lessons
  resources :notes
  resources :blogs
  resources :videos
  resources :course_works
  resources :courses
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/hello', to: 'application#hello_world'
  get 'completion', to: 'prompt_completions#generate_completion'
end
