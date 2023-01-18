class LessonSerializer < ActiveModel::Serializer
  attributes :id, :name, :subject

  has_many :videos
  belongs_to :section
end
