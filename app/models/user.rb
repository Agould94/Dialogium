class User < ApplicationRecord
    has_secure_password

    has_many :courses
    has_many :course_works, through: :courses

    has_many :courses, through: :user_course

    

    def full_name
        "#{first_name} #{last_name}"
    end
end
