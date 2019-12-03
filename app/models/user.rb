class User < ApplicationRecord
  # has_secure_password
  # validates :password, length: { minimum: 6 }
  # validates :username, presence: true, uniqueness: true
  has_many :subjects
end
