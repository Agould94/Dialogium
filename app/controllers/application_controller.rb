class ApplicationController < ActionController::API
    include ActionController::Cookies

    def hello_world
      session[:count] = (session[:count] || 0) + 1
      render json: { count: session[:count] }
    end

    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

  private

      def logged_in?
          unless session[:user_id]
              render_not_logged_in_response
          end
      end

      

      def render_not_logged_in_response
          render json: {errors: ["You need to be logged in to access this feature."]}, status: :unprocessable_entity
      end
  
end
