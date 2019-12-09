class Subject < ApplicationRecord
  belongs_to :user
  has_many :cards, dependent: :destroy
  attribute :cards_learned
end
