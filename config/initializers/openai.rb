require "ruby/openai"


Ruby::OpenAI.configure do |config|
    config.access_token = ENV['OPENAI_KEY']
end

client = OpenAI::Client.new

