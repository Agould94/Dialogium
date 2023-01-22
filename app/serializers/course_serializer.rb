class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :creator, :topic, :ranking, :difficulty, :users, :sections

  has_many :sections
  has_many :users
end
