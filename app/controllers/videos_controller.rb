
class VideosController < ApplicationController

    def create
        
        lesson = Lesson.find(params[:lesson_id])

        video_ids = params[:video_ids]
        videos = video_ids.map do |id|
            ytvideo = Yt::Video.new id: id
            video = lesson.videos.create(url: "https://www.youtube.com/watch?v=#{id}", embed_url: "https://www.youtube.com/embed/#{id}", title: ytvideo.snippet.data["title"], channel: ytvideo.snippet.data["channelTitle"], description: ytvideo.snippet.data["description"], thumbnail: ytvideo.snippet.data["thumbnails"]["medium"]["url"])
        end
        render json: lesson
       
    end

    def search
        key = ENV["YOUTUBE_API_KEY"]
        puts Rails.env
        puts key
        puts params[:search]
        search = params[:search]
        uri = URI('https://www.googleapis.com/youtube/v3/search')
        params = {:key => key, :part => 'snippet', :q=>search}
        uri.query = URI.encode_www_form(params)

        response = Net::HTTP.get_response(uri)
       render json: response.body
    end

    private
    def video_params
        params.permit(:video, :channel, :link)
    end
end
