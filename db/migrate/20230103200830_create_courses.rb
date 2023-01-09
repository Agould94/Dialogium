class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :title
      t.integer :user_id
      t.string :topic
      t.integer :ranking
      t.integer :difficulty

      t.timestamps
    end
  end
end

