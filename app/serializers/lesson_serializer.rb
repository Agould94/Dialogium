class LessonSerializer < ActiveModel::Serializer
  attributes :id, :name, :subject

  belongs_to :section
end
