class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  validates :text, presence: true, length: { maximum: 50 }
  validates :post_id, presence: true
  validates :user_id, presence: true
end
