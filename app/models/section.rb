class Section < ApplicationRecord
    belongs_to :course

    has_many :lessons, -> {order(:created_at)}
end
