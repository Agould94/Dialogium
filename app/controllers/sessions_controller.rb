class SessionsController < ApplicationController
    def create
        user = User.find_by(first_name: params[:firstName])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          puts session[:user_id]
          render json: user, status: :created
        else
          render json: { error: "Invalid username or password" }, status: :unauthorized
        end
      end
  
      def destroy
          session.delete :user_id
          head :no_content
      end
  
end
