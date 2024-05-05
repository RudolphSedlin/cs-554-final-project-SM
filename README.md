# CS 554 Final Project - Forumblogs

# Database Configuration
## Collections
### Users
* **_id** : ObjectId
* **name** : object
    * **first** : string [1-25]
    * **last** : string [1-25]
* **username** : string [1-20]
* **pw_hash** : string
* **email** : string [1-50]
* **join_date** : Date
* **profile** : object
    * **bio** : string [1-200]
    * **picture** : string [url]
### Posts
* **_id** : ObjectId
* **title** : string [1-50]
* **body** : string [1-200]
* **author** : ObjectId
* **likes** : [ObjectId]
* **comments** : [ObjectId]
* **tags** : [ObjectId]
* **created_datetime** : DateTime
* **status** : int (0: active, 1: deleted)
* **visibility** : int (0: public, 1: private)
### Comments
* **_id** : ObjectId
* **body** : string [1-200]
* **author** : ObjectId
* **likes** : [ObjectId]
* **parent** : ObjectId
* **created_datetime** : DateTime
* **status** : int (0: active, 1: deleted)
### Tags
* **_id** : ObjectId
* **title** : string [1-30]
* **posts** : [ObjectId]
