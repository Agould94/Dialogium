require 'yt'

# require 'google/apis'
# require 'google/apis/youtube_v3'

puts ENV['YOUTUBE_API_KEY']
Yt.configure do |config|
    config.api_key = ENV['YOUTUBE_API_KEY']
    config.log_level = :debug
end

# Google::Apis::YoutubeV3.configure do |config|
#     config.key = ENV['YOUTUBE_API_KEY']
# end
