# CS 554 Final Project - Forumblogs


### Instructions

### To run the server, complete the following instructions:
### 1. do 'npm install; to install the necessary packages for the project.
### 2. do 'npm run build' to compile the various pages through NextJS
### 3. do 'npm run start' and clink the link to localhost:3000 to be taken to our forum!

<!-- # Database Configuration
## Collections
### Users
* **_id** : ObjectId
* **uid** : FirebaseUid
* **name** : object
    * **first** : string [1-25]
    * **last** : string [1-25]
* **username** : string [1-20]
* **pw_hash** : string [pw 12-30]
* **email** : string
* **join_timestamp** : DateTime
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
* **created_timestamp** : DateTime
* **status** : int (0: active, 1: deleted)
* **visibility** : int (0: public, 1: private) -->