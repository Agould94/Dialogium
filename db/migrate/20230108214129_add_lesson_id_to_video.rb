class AddLessonIdToVideo < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :lesson_id, :integer
  end
end
