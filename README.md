# Task Management API

This is a Task Management API built using Node.js, Express, and MongoDB. The API allows users to manage tasks, including creating, updating, deleting, and retrieving tasks. It also includes user authentication with JWT and provides routes for handling task-related operations.

## Deployed Application

You can access the deployed project here: [User InterFace](https://task-management-system-self.vercel.app/)
You can access the Backend API here: [Backend API](https://tms-bakcen-api.onrender.com/)

## Features

- User authentication using JWT.
- Task management (create, update, delete, get).
- Mark tasks as important or complete.
- Filter tasks by importance or completion.
- MongoDB as the database.
- Deployed at the vercel for frontend and bakcend on render

- ## API Endpoints

### Auth
- **Sign In**: `POST /api/v1/sign-in`
  - Body: `{ username, email, password }`
- **Log In**: `POST /api/v1/log-in`
  - Body: `{ username, password }`

### Tasks
- **Create**: `POST /api/v2/create-task`
  - Headers: `id, authorization`
  - Body: `{ title, desc }`
- **Get All**: `GET /api/v2/get-all-tasks`
  - Headers: `id, authorization`
- **Delete**: `DELETE /api/v2/delete-task/:id`
  - Headers: `id, authorization`
- **Update**: `PUT /api/v2/update-task/:id`
  - Headers: `id, authorization`
  - Body: `{ title, desc }`

### Status
- **Mark Complete**: `PUT /api/v2/update-complete-task/:id`
  - Headers: `id, authorization`

### Filters
- **Complete Tasks**: `GET /api/v2/get-complete-tasks`
  - Headers: `id, authorization`
- **Incomplete Tasks**: `GET /api/v2/get-incomplete-tasks`
  - Headers: `id, authorization`

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: react.js 
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: JWT (JSON Web Token)

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.16.1 or higher)
- [MongoDB](https://www.mongodb.com/)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-link.git](https://github.com/Ak-vishwakarma-01/Task-Management-System
