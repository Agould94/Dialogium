class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.integer :course_work_id
      t.string :url
      t.string :title

      t.timestamps
    end
  end
end
