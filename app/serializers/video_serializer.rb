class VideoSerializer < ActiveModel::Serializer
  attributes :id, :lesson_id, :url, :title, :description, :channel, :thumbnail, :embed_url

  belongs_to :lesson
end
