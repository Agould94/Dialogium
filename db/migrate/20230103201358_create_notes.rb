class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.integer :course_work_id
      t.string :content

      t.timestamps
    end
  end
end
