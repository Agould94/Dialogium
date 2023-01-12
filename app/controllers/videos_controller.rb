
class VideosController < ApplicationController

    def create

    end

    private
    def video_params
        params.permit(:video, :channel, :link)
    end
end
