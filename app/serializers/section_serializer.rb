class SectionSerializer < ActiveModel::Serializer
  attributes :id, :course_id

  belongs_to :course
  has_many :lessons
end
