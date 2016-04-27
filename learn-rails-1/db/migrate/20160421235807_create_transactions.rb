class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :trans do |t|
      t.references :transactionable, polymorphic: true
    end
  end
end
