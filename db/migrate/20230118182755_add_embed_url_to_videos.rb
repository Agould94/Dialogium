class AddEmbedUrlToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :embed_url, :string
  end
end
