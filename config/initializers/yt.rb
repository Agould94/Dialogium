require 'yt'


puts ENV['YOUTUBE_API_KEY']
Yt.configure do |config|
    config.api_key = ENV['YOUTUBE_API_KEY']
    config.log_level = :debug
end

