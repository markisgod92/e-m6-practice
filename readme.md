# Epicode - Module 6 Project
## Electronic Devices Shop backend

Created with Node, Express and MongoDB.
___

## API

| type | endpoint | token | description |
| --- | --- | --- | --- |
| GET | /users/all | required | Returns all users. |
| GET | /users/:userId | required | Returns a specific user with items posted and reviews. |
| POST | /users/create | - | Create a user account. |
| PUT | /users/:userId | restricted | Modify the user's data. Can only be modified by the specific user. |
| DELETE | /users/:userId | restricted | Delete the user's data. Can only be deleted by the specific user. |
| GET | /items/all | - | Returns all items. |
| GET | /items/:itemId | - | Return a specific item with user data. |
| GET | /items/search?key=value | - | Search for specific items. |
| POST | /items/create | required | Create a new item. |
| PUT | /items/:itemId | restricted | Modify the item's data. Can only be modified by the owner. |
| DELETE | /items/:itemId | restricted | Delete the item's data. Can only be deleted by the owner. |
___

## Instructions

- Clone the repository and install dependencies:
```bash
npm i
```

- In the root directory, create an `.env` file:
```
PORT=1234 // free port to run the server
MONGODB_URI='your-mongo-db-uri'
NODE_ENV='' // type "dev" for free error stacks
JWT_SECRET='your-jwt-secret'
```

- Run the server:
```bash
npm run dev
```

If everything is setup correctly, it should print:
```
Server up on port <YOURPORT>
MongoDB database connected.
```
___
