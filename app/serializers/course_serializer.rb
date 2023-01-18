class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :creator, :topic, :ranking, :difficulty

  has_many :sections
end
