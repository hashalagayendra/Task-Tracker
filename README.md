# Task Master

Task Master is a modern productivity and task tracking application designed to help you streamline your workflow, manage tasks efficiently, and gain insights into your productivity habits.

## 🚀 Features

- **Task Management**: Create, edit, delete, and organize tasks by priority and status.
- **Time Tracking**: Built-in timer to track the exact time spent on each task.
- **Productivity Analytics**: Visual insights into your daily activity, completed tasks, and time distribution.
- **Kanban Board**: Drag-and-drop interface (planned/in-progress) for better task visualization.
- **Authentication**: Secure user signup and login functionality.
- **Responsive Design**: A premium, dark-themed UI that works seamlessly across devices.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Context API
- **Routing**: React Router
- **Charts**: Recharts
- **HTTP Client**: Axios

### Backend

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)

## ⚙️ Prerequisites

Before you begin, ensure you have multiple terminals ready and the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/)

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

Create a `.env` file in the `backend` directory and configure your database connection:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="your-secret-key"
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the backend server:

```bash
npm run start:dev
```

The backend will start on `http://localhost:3000`.

### 3. Frontend Setup

Open a new terminal navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
