class Completion < ApplicationRecord
    @@total_tokens = []

    def parse_completion
        parsed_response={}
        lines = self.text.split("\n")
        new_lines = lines.map do |line|
            new_line = line.strip
            new_line
        end
        #new_lines.compact_blank
        lines_to_split = new_lines.compact_blank
        #puts lines_to_split
        title = lines_to_split.shift
        category_index = lines_to_split.find_index("Category:")
        section_1_index = lines_to_split.find_index("Section 1:")
        category = lines_to_split[category_index..section_1_index-1]
        parsed_response[:title] = title
        parsed_response[:category] = category[0].split(": ")[1].downcase
        parsed_response[:course] = find_sections(lines_to_split)
        #puts parsed_response
        return parsed_response
    end

    def self.generate_course_from_completion(parsed_completion, user_id, topic)
        title = parsed_completion[:title]
        category = parsed_completion[:category]
        oneA = parsed_completion[:course][:section1][:lesson_a]
        oneB = parsed_completion[:course][:section1][:lesson_b]
        oneC = parsed_completion[:course][:section1][:lesson_c]
        section_2 = parsed_completion[:course][:section2]
        twoA = parsed_completion[:course][:section2][:lesson_a]
        twoB = parsed_completion[:course][:section2][:lesson_b]
        twoC = parsed_completion[:course][:section2][:lesson_c]
        section_3 = parsed_completion[:course][:section3]
        threeA = parsed_completion[:course][:section3][:lesson_a]
        threeB = parsed_completion[:course][:section3][:lesson_b]
        threeC = parsed_completion[:course][:section3][:lesson_c]

        course = Course.create(title: title, category: category, user_id: user_id, topic: topic)
        
        s1 = course.sections.create(number: 1)
        s2 = course.sections.create(number: 2)
        s3 = course.sections.create(number: 3)

       l1a = s1.lessons.create(name: oneA[:name], subject: oneA[:subject])
       l1b = s1.lessons.create(name: oneB[:name], subject: oneB[:subject])
       l1c = s1.lessons.create(name: oneC[:name], subject: oneC[:subject])
       l2a = s2.lessons.create(name: twoA[:name], subject: twoA[:subject])
       l2b = s2.lessons.create(name: twoB[:name], subject: twoB[:subject])
       l2c = s2.lessons.create(name: twoC[:name], subject: twoC[:subject])
       l3a = s3.lessons.create(name: threeA[:name], subject: threeA[:subject])
       l3b = s3.lessons.create(name: threeB[:name], subject: threeB[:subject])
       l3c = s3.lessons.create(name: threeC[:name], subject: threeC[:subject])
        
       
    #    v1a = {url: oneA[:link], title: oneA[:video], channel: oneA[:channel]}
    #    v1b = {url: oneB[:link], title: oneB[:video], channel: oneB[:channel]}
    #    v1c = {url: oneC[:link], title: oneC[:video], channel: oneC[:channel]}
    #    v2a = {url: twoA[:link], title: twoA[:video], channel: twoA[:channel]}
    #    v2b = {url: twoB[:link], title: twoB[:video], channel: twoB[:channel]}
    #    v2c = {url: twoC[:link], title: twoC[:video], channel: twoC[:channel]}
    #    v3a = {url: threeA[:link], title: threeA[:video], channel: threeA[:channel]}
    #    v3b = {url: threeB[:link], title: threeB[:video], channel: threeB[:channel]}
    #    v3c = {url: threeC[:link], title: threeC[:video], channel: threeC[:channel]}
        
    #    if Video.link_valid?(v1a[:url])
    #     l1a.videos.create(url: v1a[:url], title: v1a[:title], channel: v1a[:channel] )
    #    end
    #    if Video.link_valid?(v1b[:url])
    #     l1b.videos.create(url: v1b[:url], title: v1b[:title], channel: v1b[:channel] )
    #    end
    #    if Video.link_valid?(v1c[:url])
    #     l1c.videos.create(url: v1c[:url], title: v1c[:title], channel: v1c[:channel] )
    #    end
    #    if Video.link_valid?(v2a[:url])
    #     l2a.videos.create(url: v2a[:url], title: v2a[:title], channel: v2a[:channel] )
    #    end
    #    if Video.link_valid?(v2b[:url])
    #     l2b.videos.create(url: v2b[:url], title: v2b[:title], channel: v2b[:channel] )
    #    end
    #    if Video.link_valid?(v2c[:url])
    #     l2c.videos.create(url: v2c[:url], title: v2c[:title], channel: v2c[:channel] )
    #    end
    #    if Video.link_valid?(v3a[:url])
    #     l3a.videos.create(url: v3a[:url], title: v3a[:title], channel: v3a[:channel] )
    #    end
    #    if Video.link_valid?(v3b[:url])
    #     l3b.videos.create(url: v3b[:url], title: v3b[:title], channel: v3b[:channel] )
    #    end
    #    if Video.link_valid?(v3c[:url])
    #     l3c.videos.create(url: v3c[:url], title: v3c[:title], channel: v3c[:channel] )
    #    end

        
        return course
    end 
      
    def self.add_total_tokens
        self.all.each do |c|
            @@total_tokens.push(c.total_tokens)
        end
    end

    def self.total_tokens
        @@total_tokens.compact().sum()
    end

    self.add_total_tokens()

    private

    def find_sections(lines)
        parsed_response = {}
        section_1_index = lines.find_index("Section 1:") 
        section_2_index = lines.find_index("Section 2:") 
        section_3_index = lines.find_index("Section 3:")
        section_4_index = lines.find_index("Section 4: Further Information") || lines.find_index("Section 4:") || lines.find_index("Further Information:")

        # puts section_1_index
        # puts section_2_index
        # puts section_3_index
        # puts section_4_index
        section_1 = lines[section_1_index..section_2_index-1]
        section_2 = lines[section_2_index..section_3_index-1]
        section_3 = lines[section_3_index..section_4_index-1]
        section_4 = lines[section_4_index..lines.length]
        parsed_response[:section1] = find_lessons(section_1)
        parsed_response[:section2] = find_lessons(section_2)
        parsed_response[:section3] = find_lessons(section_3)
        parsed_response[:section4] = section_4

        return parsed_response
    end

    def find_lessons(section)
        lessons = {}
       lesson_a_index = section.find_index("Lesson A:")
       lesson_b_index = section.find_index("Lesson B:")
       lesson_c_index = section.find_index("Lesson C:")
       #puts lesson_a_index
       lesson_a = section[lesson_a_index..lesson_b_index-1]
       lesson_b = section[lesson_b_index..lesson_c_index-1]
       lesson_c = section[lesson_c_index..section.length]
       lessons[:lesson_a] = parse_lessons(lesson_a)
       lessons[:lesson_b] = parse_lessons(lesson_b)
       lessons[:lesson_c] = parse_lessons(lesson_c)
        
       return lessons
    end

    def parse_lessons(lesson)
        lesson_info = {}

       lesson.shift()
        split_lesson_info = lesson.map do |lesson_information|
           lesson_information.split(":", 2)
        end

        #puts split_lesson_info.inspect

        split_lesson_info.each do |lesson_info_arr|
            #puts lesson_info_arr[1].inspect
            info_symbol = lesson_info_arr[0].downcase.to_sym
            info_string = lesson_info_arr[1].lstrip
            #puts lesson_info
            #puts info_symbol.inspect
            lesson_info[info_symbol] = info_string
        end

        return lesson_info
    end

end

