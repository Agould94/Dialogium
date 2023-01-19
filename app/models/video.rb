require 'net/http'

class Video < ApplicationRecord
    belongs_to :lesson


    def self.link_valid?(link)
        key = ENV["YOUTUBE_API_KEY"]
        url = Yt::URL.new link
        id = url.id

        uri = URI('https://www.googleapis.com/youtube/v3/videos')
        params = {:key => key, :part => 'snippet', :id=>id}
        uri.query = URI.encode_www_form(params)
        response = Net::HTTP.get_response(uri)

        parsed_response = JSON.parse(response.body)

         if parsed_response["items"].length == 0
            puts "invalid"
            false
         else
            puts "valid"
            true
         end
    end

    private

   
end
