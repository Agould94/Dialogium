class CreateBlogs < ActiveRecord::Migration[7.0]
  def change
    create_table :blogs do |t|
      t.integer :course_work_id
      t.string :text
      t.string :title

      t.timestamps
    end
  end
end
