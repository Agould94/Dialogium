require 'net/http'
class Video < ApplicationRecord
    belongs_to :lesson


    def self.link_valid?(link)
        url = URI.parse(link)
        req = Net::HTTP::Get.new url
        ()
        res = Net::HTTP.start(url.host, url.port, 
            :use_ssl => url.scheme=='https'){|http| http.request req}
        puts res.
    end
end
