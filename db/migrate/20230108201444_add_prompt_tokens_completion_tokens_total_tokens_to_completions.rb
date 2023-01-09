class AddPromptTokensCompletionTokensTotalTokensToCompletions < ActiveRecord::Migration[7.0]
  def change
    add_column :completions, :prompt_tokens, :integer
    add_column :completions, :completion_tokens, :integer
    add_column :completions, :total_tokens, :integer
  end
end
