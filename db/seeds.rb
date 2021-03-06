# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


u1 = User.create(username: 'sabrina', password: 'sabrina')
u2 = User.create(username: 'ryanrc', password: 'ryryanrcan')

s1 = Subject.create!(title: "Math", description: 'Fractions',user_id:1)
s2 = Subject.create!(title: "Science", description: 'Biology of plants',user_id:2)
s3 = Subject.create!(title: "History", description: 'American Civil War',user_id:2)

# s1.cards.create(title: "Blank", question: "What is 2+2?", answer: '4', answer_notes: 'just add 2 and 2', learned: true)
# s2.cards.create(title: "Blank", question: "What do plants need to survive?", answer: 'Water', answer_notes: 'They also need the sun', learned: false)
# s3.cards.create(title: "Blank", question: "Who was president during the civil war?", answer: 'Abraham Lincoln', answer_notes: 'Lincoln was killed before the war was over', learned: true)