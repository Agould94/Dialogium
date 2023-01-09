class AddCourseIdToLessons < ActiveRecord::Migration[7.0]
  def change
    add_column :lessons, :course_id, :integer
  end
end
