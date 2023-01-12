class RemoveCourseWorkIdFromVideos < ActiveRecord::Migration[7.0]
  def change
    remove_column :videos, :course_work_id, :integer
  end
end
