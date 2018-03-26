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
- has_many : groups, through: :members


## Table: groups
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :users, through: :members


## Table: members
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## Table: message
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false, unique: true|
|group_id|integer|null: false, unique: true|

### Association
- belongs_to :user
- belongs_to :group
