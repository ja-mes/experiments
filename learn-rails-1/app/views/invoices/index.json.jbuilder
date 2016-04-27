json.array!(@invoices) do |invoice|
  json.extract! invoice, :id, :amount, :date, :memo
  json.url invoice_url(invoice, format: :json)
end
