class LessonSerializer < ActiveModel::Serializer
  attributes :id, :name, :subject, :videos, :text

  has_many :videos
  belongs_to :section
end
