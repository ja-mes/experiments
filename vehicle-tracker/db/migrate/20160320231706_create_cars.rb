class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.integer :year
      t.string :make
      t.string :model

      t.string :color
      t.decimal :total_cost
    end
  end
end
