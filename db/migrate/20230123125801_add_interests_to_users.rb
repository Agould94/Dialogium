class AddInterestsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :interests, :text, array: true, default: []
  end
end
