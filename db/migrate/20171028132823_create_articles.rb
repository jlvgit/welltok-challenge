class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :description
      t.string :author
      t.text :tags, array: true, default: []

      t.timestamps
    end
  end
end
