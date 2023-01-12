class CompletionSerializer < ActiveModel::Serializer
    attributes :id, :prompt, :text, :parse_completion
end