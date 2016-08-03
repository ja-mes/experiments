class Tran < ActiveRecord::Base
  belongs_to :transactionable, polymorphic: true
end
