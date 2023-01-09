class CreateCourseWorks < ActiveRecord::Migration[7.0]
  def change
    create_table :course_works do |t|
      t.integer :course_id

      t.timestamps
    end
  end
end
