# 🎟️ Event Management API

A RESTful API built with **Node.js**, **Express**, and **PostgreSQL** (via **Prisma ORM**) to manage users, events, and registrations.

---

## 🌐 Base URL
**https://event-api-89d4.onrender.com**

---

## 📘 Endpoints

### 👤 User Routes

#### ➕ Create a User
**POST** `/users`  
Create a new user.

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```
**Response**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com"
}
```
#### 📋 Get All Users
**GET** `/users`  
Fetch all registered users.
**Response**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
]

```



### 🎉 Event Routes

#### ➕ Create an Event
**POST** `/events`  
Create a new event.

**Request Body**
```json
{
  "title": "Tech Conference 2025",
  "start_time": "2025-11-01T10:00:00.000Z",
  "location": "Delhi",
  "capacity": 100
}

```
**Response**
```json
{
  "id": "uuid",
  "title": "Tech Conference 2025",
  "start_time": "2025-11-01T10:00:00.000Z",
  "location": "Delhi",
  "capacity": 100,
  "created_at": "2025-10-15T09:00:00.000Z"
}

```


#### 📋 Get All Events
**GET** `/events`  
Fetch all events.

#### 📘 Get Event by ID
**GET** `/events/:id`  
Fetch details of a specific event by its ID.


### 📝 Registration Routes

#### ➕ Register a User for an Event
**POST** `/registrations`  
Register a user for a specific event.

**Request Body**
```json
{
  "user_id": "uuid",
  "event_id": "uuid"
}


```
**Response**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "event_id": "uuid",
  "registered_at": "2025-10-15T09:05:00.000Z"
}


```
#### 📋 Get All Registrations
**GET** `/registrations`  
Fetch all registrations.


#### ⚙️ Response Codes
| Status Code | Meaning                              |
|------------|--------------------------------------|
| 200        | Success                              |
| 201        | Created                              |
| 400        | Bad Request                          |
| 404        | Not Found                            |
| 409        | Conflict (e.g., user already registered) |
| 500        | Internal Server Error                |


#### 📚 Tech Stack

- Node.js + Express.js
- PostgreSQL
- Prisma ORM

