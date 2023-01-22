class LessonsController < ApplicationController

    def show
        lesson = find_lesson
        course = Course.find(params[:course_id].to_i)
        # section = course.sections[params[:section_id]]
        # lesson = section.lessons[params[:lessonNum]]

        render json: {lesson: lesson, course: course}
    end

    def create
        course = Course.find(params[:courseId].to_i)
        if course.creator == current_user
            section = course.sections[params[:sectionNum].to_i]
            lesson = section.lessons.create(lesson_params)

            video_ids = params[:video_ids]
            videos = video_ids.map do |id|
                ytvideo = Yt::Video.new id: id
                video = lesson.videos.create(url: "https://www.youtube.com/watch?v=#{id}", embed_url: "https://www.youtube.com/embed/#{id}", title: ytvideo.snippet.data["title"], channel: ytvideo.snippet.data["channelTitle"], description: ytvideo.snippet.data["description"], thumbnail: ytvideo.snippet.data["thumbnails"]["medium"]["url"])
            end

            puts videos

            render json: lesson
        else
            render_unauthorized_response
        end
    end

    def update
        lesson = Lesson.find(params[:id])
        lesson.update!(text: params["text"])

        render json: lesson

    end



    private

    def lesson_params
        params.permit(:name, :text, :subject)
    end

    def find_lesson
        course = Course.find(params[:course_id].to_i).sections[params[:section_id].to_i].lessons[params[:id].to_i]
    end

    def render_unauthorized_response
        render json: {error: "You Did not create this course."}, status: :unauthorized
    end
end
