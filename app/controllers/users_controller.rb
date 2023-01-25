class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    # def index
    #     users = User.all 
    #     render json: users
    # end

    before_action :logged_in?, only: [:take_course]

    def show
        if params[:id]
            user = User.find(params[:id])
        else
            user = find_user
        end
        courses = user.courses
        render json: user, include: ['courses', 'courses.sections', 'courses.sections.lessons', 'created_courses', 'created_courses.sections', 'created_courses.sections.lessons']
    end

    def create
        user = User.create!(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        user = find_user
        #binding.pry
        user.update!(user_params)
        render json: user
    end

    def destroy
        user = find_user
        if user == current_user && user.logged_in?
            user.destroy
            head :no_content
        else
            render json: {error: "user not found"}, status: :not_found
        end
    end

    def take_course
        user = find_user
        course = Course.find(params["course_id"])

       if user.courses.include?(course)
        render_already_signed_up_response
       else
        user.courses.push(course)
        render json: user
       end 
       
    end


    private 

    def find_user
        user = User.find(session[:user_id])
    end

    def user_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation, interests:[])
    end

    def render_not_found_response
        render json: {error: "User not found"}, status: :not_found
    end

    def render_unprocessable_entity_response
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    def render_already_signed_up_response
        render json: {error: "You have already signed up for this course"}, status: :unprocessable_entity
    end
end
