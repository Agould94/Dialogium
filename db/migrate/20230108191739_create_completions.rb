class CreateCompletions < ActiveRecord::Migration[7.0]
  def change
    create_table :completions do |t|
      t.string :prompt
      t.string :text
      t.string :topic

      t.timestamps
    end
  end
end
