class AddDescriptionThumbnailToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :description, :string
    add_column :videos, :thumbnail, :string
  end
end
