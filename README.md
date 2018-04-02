== README
# DB design_CHAT SPACE

## Table: users
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, unique: true, foreign_key: true|
|pwd|string|null: false, unique: true, foreign_key: true|

### Association
- has_many : messages
- has_many : groups, through: :group_users
- has_many : group_users


## Table: groups
|Column|Type|Options|
|------|----|-------|
<!-- |name|string|null: false, unique: true, index: true| -->
<!-- |name|string|null: false, unique: true| -->
|name|string|unique: true|


### Association
- has_many :users, through: :group_users
- has_many : group_users
- has_many : messages

## Table: goup_users
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## Table: messages
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
<!-- |user_id|references|null: false, unique: true|
|group_id|references|null: false, unique: true| -->

|user_id|references|foreign_key: true, index:true|
|group_id|references|foreign_key: true, index:true|

### Association
- belongs_to :user
- belongs_to :group
