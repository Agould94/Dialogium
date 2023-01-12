class CoursesController < ApplicationController
    def index
        @courses = Course.all
        render json: @courses
    end

    def show
        course = find_course
        render json: course, include: ['sections', 'sections.lessons']
    end

    def create
        c = Completion.last.parse_completion
        course = generate_course_from_completion(c)
        render json: course
    end

    def destroy
    end

   
    private

    def course_params
        params
    end

    def find_course
      course = Course.find(params[:id])
    end

end
