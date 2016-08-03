class Invoice < ApplicationRecord
  has_many :invoice_trans
  accepts_nested_attributes_for :invoice_trans
end
