class User < ApplicationRecord
    has_secure_password

    has_many :created_courses, :class_name => :Course, :foreign_key=>"user_id"
    has_many :course_works, through: :courses

    has_many :user_courses
    has_many :courses, through: :user_courses

    validates :first_name, presence: :true

    def full_name
        "#{first_name} #{last_name}"
    end
end
