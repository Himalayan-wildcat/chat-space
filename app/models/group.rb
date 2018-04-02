class Group < ApplicationRecord
  validates :name, presence: true, allow_blank: false
  has_many :users, through: :group_users
  has_many :group_users
  has_many :messages
end

