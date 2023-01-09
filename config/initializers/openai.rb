require "ruby/openai"

puts( ENV['OPENAI_KEY'])

Ruby::OpenAI.configure do |config|
    config.access_token = ENV['OPENAI_KEY']
end

client = OpenAI::Client.new


puts(client.models.list)