class SectionSerializer < ActiveModel::Serializer
  attributes :id, :course_id, :lessons

  belongs_to :course
  has_many :lessons
 
end
