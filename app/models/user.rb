class User < ApplicationRecord
  has_secure_password
  has_many :subjects
  validates :password, length: { minimum: 6 }
  validates :username, presence: true, uniqueness: true
end
