class BlogSerializer < ActiveModel::Serializer
  attributes :id, :course_work_id, :text, :title
end
