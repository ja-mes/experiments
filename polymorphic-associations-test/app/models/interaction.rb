class Interaction < ApplicationRecord
  has_many :interactions, as: :interactive
end
