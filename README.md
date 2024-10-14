# Task Management API

This is a Task Management API built using Node.js, Express, and MongoDB. The API allows users to manage tasks, including creating, updating, deleting, and retrieving tasks. It also includes user authentication with JWT and provides routes for handling task-related operations.

## Features

- User authentication using JWT.
- Task management (create, update, delete, get).
- Mark tasks as important or complete.
- Filter tasks by importance or completion.
- MongoDB as the database.
- Deployed and accessible via the provided link.

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


## Deployed Application

You can access the API here: [Task Management API](https://task-management-system-self.vercel.app/)

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: JWT (JSON Web Token)
- **Environment Variables**: dotenv

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.16.1 or higher)
- [MongoDB](https://www.mongodb.com/)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-link.git](https://github.com/Ak-vishwakarma-01/Task-Management-System
