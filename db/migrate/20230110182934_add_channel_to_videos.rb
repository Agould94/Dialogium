class AddChannelToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :channel, :string
  end
end
