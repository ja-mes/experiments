class AddInvoiceIdToInvoiceTrans < ActiveRecord::Migration[5.0]
  def change
    add_column :invoice_trans, :invoice_id, :integer
  end
end
