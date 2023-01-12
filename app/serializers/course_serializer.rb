class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_id, :topic, :ranking, :difficulty

  has_many :sections
end
