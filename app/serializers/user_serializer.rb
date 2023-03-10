class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :interests, :courses, :created_courses, :full_name

  has_many :created_courses, include: ['sections']
  has_many :courses
end
