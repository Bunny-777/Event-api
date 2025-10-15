# 🎟️ Event Management REST API

A **backend project** built using **Node.js**, **Express**, and **PostgreSQL** with **Prisma ORM**.  
This API provides a complete event management system where users can create events, register or cancel participation, and view statistics for each event.

---

## 🚀 Features

✅ Create and manage events  
✅ User registration for events  
✅ Cancel registrations  
✅ View upcoming events (custom sorted)  
✅ View event statistics  
✅ Data validation and error handling  
✅ PostgreSQL + Prisma ORM integration  
✅ RESTful architecture with clean folder structure

---

## 📚 Tech Stack

- **Node.js** — Backend runtime  
- **Express.js** — Web framework  
- **PostgreSQL** — Relational database  
- **Prisma ORM** — Database modeling and query builder

---

## 🌐 Base URL
**https://event-api-89d4.onrender.com**

---

## 📘 Endpoints

### 👤 User Routes

#### ➕ Create a User
**POST** `/api/v1/users/create`  
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
**GET** `/api/v1/users`  
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


### 🎫 Event Routes

#### ➕ Create an Event
**POST** `/api/v1/events/create`  
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
    "message": "Event created",
    "eventId": "e9379d92-c782-4020-8b8f-4049bbbf87cf"
}

```



#### 📘 Get Event by ID
**GET** `/api/v1/events/:id`  
Fetch details of a specific event by its ID.


**Response**


```json
{
    "id": "e703747a-db17-4666-bd4a-47655fd8a21e",
    "title": "Manvi's show",
    "start_time": "2026-08-09T18:30:00.000Z",
    "location": "Dubai",
    "capacity": 101,
    "created_at": "2025-10-15T10:34:22.109Z",
    "registrations": [
        {
            "id": "5d9d55fb-b679-4f25-ac2c-30278fd902f4",
            "user_id": "00d58d6f-e3ce-423e-b59a-45d4dfa5e582",
            "event_id": "e703747a-db17-4666-bd4a-47655fd8a21e",
            "registered_at": "2025-10-15T15:32:56.939Z",
            "user": {
                "id": "00d58d6f-e3ce-423e-b59a-45d4dfa5e582",
                "name": "lakshya",
                "email": "lakshya@email"
            }
        }
    ]
}
```
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /api/v1/events/create | Create a new event |
| GET    | /api/v1/events/:id | Get event details (with users) |
| POST   | /api/v1/events/register | Register a user for an event |
| POST   | /api/v1/events/cancel | Cancel a user’s registration |
| GET    | /api/v1/events/upcoming/all | List upcoming events |
| GET    | /api/v1/events/:id/stats | View event stats |



#### ⚙️ Response Codes
| Status Code | Meaning                              |
|------------|--------------------------------------|
| 200        | Success                              |
| 201        | Created                              |
| 400        | Bad Request                          |
| 404        | Not Found                            |
| 409        | Conflict (e.g., user already registered) |
| 500        | Internal Server Error                |


## 📂 Folder Structure
```tree
src/
├── db.js
├── index.js
├── controllers/
│ ├── event.controller.js
│ └── user.controller.js
├── routes/
│ ├── index.js
│ ├── event.route.js
│ └── user.route.js
└── prisma/
└── schema.prisma

```
---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Bunny-777/Event-api.git
cd Event-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a .env file in the project root and add your PostgreSQL connection string:
```bash
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/eventsdb?schema=public"
```


### 4️⃣ Setup Prisma & Database
Run migrations and generate Prisma client:
```bash
npx prisma migrate dev --name init
npx prisma generate
```


### 5️⃣ Start the Server
```bash
node src/index.js
```

By default, the API runs on:
```bash
http://localhost:3000
```
