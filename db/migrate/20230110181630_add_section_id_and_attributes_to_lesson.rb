class AddSectionIdAndAttributesToLesson < ActiveRecord::Migration[7.0]
  def change
    add_column :lessons, :section_id, :integer
    add_column :lessons, :text, :string
  end
end
