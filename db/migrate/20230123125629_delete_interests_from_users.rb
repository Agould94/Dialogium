class DeleteInterestsFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :interests
  end
end
