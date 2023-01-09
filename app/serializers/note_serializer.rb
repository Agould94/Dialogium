class NoteSerializer < ActiveModel::Serializer
  attributes :id, :course_work_id, :content
end
