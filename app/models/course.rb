class Course < ApplicationRecord

    has_many :users, through: :user_course
    has_many :sections

    belongs_to :creator, :class_name => :User, :foreign_key=> "user_id"

   
end
