# Secure Task Management System

A full-stack **Task Management System** built using **NestJS + TypeORM (SQLite)** with support for:
- Authentication (JWT)
- Role-Based Access Control (RBAC)
- Organization hierarchy
- Audit logging for CRUD actions

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | NestJS (TypeScript) |
| Database | SQLite (via TypeORM) |
| Authentication | JWT (Passport.js) |
| Authorization | Custom RolesGuard (Owner/Admin/Viewer) |
| Infrastructure | Nx Monorepo Workspace |

---

## Setup Instructions

### 1 Clone the repository
```bash
git clone https://github.com/sam/secure-task-management-system.git
cd secure-task-management-system
```

### 2 Install dependencies
```bash
npm install
```

### 3 Run the backend (API)
```bash
npx nx serve api
```

The API runs at http://localhost:3000/api

You should see:
```json
{ "message": "🚀 API is running successfully!" }
```
- Authentication
    - Register

        POST /api/auth/register
        ```json
        {
        "email": "admin@example.com",
        "password": "admin123",
        "role": "Owner"
        }
        ```

    - Login

        POST /api/auth/login
        ```json
        {
        "email": "admin@example.com",
        "password": "admin123"
        }


    - Response:

        { "access_token": "<jwt-token>" }


        Use this token in headers:

        Authorization: Bearer <jwt-token>


- API Endpoints
    - User & Auth
        Method	Endpoint	        Description
        POST	/api/auth/register	Register a new user
        POST	/api/auth/login	    Login and get JWT token
- Tasks
    Method	Endpoint	    Description
    GET	    /api/tasks	    Get all tasks
    POST	/api/tasks	    Create task
    PUT	    /api/tasks/:id	Update task (status, etc.)
    DELETE	/api/tasks/:id	Delete task

- Organizations
    Method	Endpoint	        Description
    GET	    /api/organizations	List organizations
    POST	/api/organizations	Create parent/child organization

- Audit Logs

    Every create, update, and delete operation is automatically recorded in the audit_log table.

    Field	Description
    action	CREATE / UPDATE / DELETE
    entityType	e.g. Task
    entityId	UUID of entity
    performedBy	User email
    timestamp	Action time