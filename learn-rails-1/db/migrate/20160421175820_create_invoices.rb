class CreateInvoices < ActiveRecord::Migration[5.0]
  def change
    create_table :invoices do |t|
      t.decimal :amount
      t.date :date
      t.string :memo

      t.timestamps
    end
  end
end
