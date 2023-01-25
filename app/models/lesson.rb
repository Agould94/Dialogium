class Lesson < ApplicationRecord
    belongs_to :section
    has_many :videos

    validates :name, presence: true
    validates :subject, presence: true
end
