class Completion < ApplicationRecord

    def parse_completion
        parsed_response={}
        lines = self.text.split("\n \n")
        lines.each do |line|
            print line
        end

        #{Title: title, "Section 1":{LessonA: {}} }
        lines.inspect
    end

end

