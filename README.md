# Task Master

Task Master is a modern productivity and task tracking application designed to help you streamline your workflow, manage tasks efficiently, and gain insights into your productivity habits. It features a robust backend API serving a dynamic, responsive frontend with real-time updates and interactive data visualization.

## 🚀 Features

- **Task Management**: Create, edit, delete, and organize tasks by priority and status.
- **Time Tracking**: Built-in timer to track the exact time spent on each task.
- **Productivity Analytics**: Visual insights with pie charts and bar graphs showing task status distribution and priority breakdown.
- **Real-Time Updates**: Data stays in sync — even refreshing the browser fetches the latest state from the database instantly, ensuring you always see live, up-to-date information without manual reload delays.
- **Authentication**: Secure user signup and login functionality.
- **Responsive Design**: A premium, dark-themed UI that works seamlessly across devices.

## 📸 Screenshots

### Task Management — Active Tasks

![Task Management — Active Tasks](./screenshots/Screenshot%202026-02-11%20231142.png)

### Task Management — Completed Tasks

![Task Management — Completed Tasks](./screenshots/Screenshot%202026-02-11%20231827.png)

### Productivity Analytics

![Productivity Analytics](./screenshots/Screenshot%202026-02-11%20231846.png)

## 🛠️ Technologies Used

### Frontend

- **Framework**: React `v19.2.0`
- **Build Tool**: Vite `v7.3.1`
- **Styling**: TailwindCSS `v4.1.18`, Lucide React (Icons)
- **State Management**: React Context API
- **Routing**: React Router DOM `v7.13.0`
- **Charts**: Recharts `v3.7.0`
- **HTTP Client**: Axios

### Backend

- **Framework**: NestJS `v11.0.1`
- **Language**: TypeScript
- **Database**: PostgreSQL `v16+`
- **ORM**: Prisma `v7.3.0`
- **Authentication**: JWT (JSON Web Tokens), Passport, Bcrypt
- **API Documentation**: Swagger (via NestJS)

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Connection
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Authentication
JWT_SECRET="your-super-secret-key-change-this"

# Optional
NODE_ENV="development" # Set to 'production' for secure cookies
```

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Anka
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Configure your `.env` file as shown above. Then, run database migrations and generate the Prisma client:

```bash
# Generate Prisma Client (Important!)
npx prisma generate

# Run Migrations
npx prisma migrate dev --name init
```

Start the backend server:

```bash
npm run start:dev
```

The backend API will be available at `http://localhost:3000`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd ../frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## 🗄️ Database Setup

1. Ensure **PostgreSQL** is installed and running.
2. Create a new database (e.g., `taskmaster`).
3. Update the `DATABASE_URL` in your `backend/.env` file to point to this database.
4. Run `npx prisma generate` to create the Prisma Client based on your schema.
5. Run `npx prisma migrate dev` inside the `backend` folder to apply the schema and create tables (`User`, `Task`, `TaskTracker`).

## 🗃️ Database Structure

The application uses **PostgreSQL** with 3 core tables, managed by **Prisma ORM**.

### Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Task : "has many"
    Task ||--o{ TaskTracker : "has many"

    User {
        String id PK "UUID"
        String name
        String email "UNIQUE"
        String password "Hashed"
        DateTime createdAt
        DateTime updatedAt
        Boolean verify "default: false"
    }

    Task {
        String id PK "UUID"
        String title
        String description
        TaskStatus status "notStarted | running | pause | done"
        TaskPriority priority "high | medium | low"
        DateTime startTime
        DateTime endTime
        Int estimatedTime "In seconds"
        Int timeToSpend "Remaining seconds"
        DateTime createdAt
        DateTime updatedAt
        String userId FK
    }

    TaskTracker {
        String id PK "UUID"
        String taskId FK
        DateTime startTime "When timer started"
        DateTime pauseTime "When timer paused"
        Int timeDeference "Elapsed seconds for this session"
    }
```

### Table Descriptions

| Table           | Purpose                                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User**        | Stores user accounts with hashed passwords and email verification status.                                                                                                                                                 |
| **Task**        | Stores tasks with title, description, status (`notStarted`, `running`, `pause`, `done`), priority (`high`, `medium`, `low`), and time estimates in seconds.                                                               |
| **TaskTracker** | Records individual time tracking sessions for each task. Every start/pause cycle creates a tracker entry with the elapsed `timeDeference` (seconds). The sum of all tracker entries gives the total time spent on a task. |

### Enums

- **TaskStatus**: `notStarted` · `running` · `pause` · `done`
- **TaskPriority**: `high` · `medium` · `low`

## 🔄 Real-Time Data Freshness

Task Master ensures your data is always up to date:

- **On every page navigation**, the frontend fetches the latest tasks from the backend database.
- **Even refreshing the browser** triggers a fresh API call, so the UI always reflects the current database state — no stale data.
- Task state changes (start, pause, complete, update, delete) are immediately pushed to the React Context and reflected across all views (Dashboard, Tasks, Analytics) without needing a manual refresh.

## 📡 API Endpoints

### Auth & User (`/user`)

- `POST /user` — Register a new user.
- `POST /user/login` — Login and receive a JWT (set as HTTP-only cookie).
- `POST /user/logout` — Logout (clears auth cookie).
- `GET /user/validate` — Validate the current session/token.

### Tasks (`/task`)

- `GET /task` — Get all tasks for the logged-in user.
- `POST /task` — Create a new task.
- `PATCH /task/:id` — Update a task (title, description, priority, estimatedTime).
- `DELETE /task/:id` — Delete a task.
- `POST /task/:id/start` — Start the timer for a task.
- `POST /task/:id/pause` — Pause the timer for a task.
- `POST /task/:id/done` — Mark a task as completed.
