class CreateSections < ActiveRecord::Migration[7.0]
  def change
    create_table :sections do |t|
      t.string :course_id

      t.timestamps
    end
  end
end
