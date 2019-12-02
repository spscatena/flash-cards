class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :title
      t.text :question
      t.text :answer
      t.text :answer_notes
      t.boolean :learned
      t.references :subjects, null: false, foreign_key: true

      t.timestamps
    end
  end
end
