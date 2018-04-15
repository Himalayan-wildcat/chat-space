json.array! @messages do |message|
  json.id message.id
  json.body message.body
  json.image message.image.url
  json.date message.created_at.to_s(:default)
  json.user_name message.user.name
end
