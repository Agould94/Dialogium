class DropCourseWorks < ActiveRecord::Migration[7.0]
  def change
    drop_table :course_works
  end
end
