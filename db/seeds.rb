require 'csv'

article = []

CSV.foreach('./lib/seeds/import.csv', :headers => true) do |row|
  row = row.to_hash
  row.delete("Id")
  row["tags"] = row["tags"].gsub(/\s+/, "").split(",") if !row["tags"].nil?
  if row.values.exclude? nil
    Article.create!(row)
  else
    next
  end
end
