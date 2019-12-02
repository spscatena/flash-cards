class CreateSubjects < ActiveRecord::Migration[6.0]
  def change
    create_table :subjects do |t|
      t.string :title
      t.string :description
      t.references :users, null: false, foreign_key: true

      t.timestamps
    end
  end
end
