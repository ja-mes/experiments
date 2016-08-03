class CreateInvoiceTrans < ActiveRecord::Migration[5.0]
  def change
    create_table :invoice_trans do |t|
      t.decimal :amount
      t.string :memo

      t.timestamps
    end
  end
end
