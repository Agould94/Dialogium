class Course < ApplicationRecord

    has_many :user_courses
    has_many :users, through: :user_courses
    has_many :sections

    belongs_to :creator, :class_name => :User, :foreign_key=> "user_id"

   
end
