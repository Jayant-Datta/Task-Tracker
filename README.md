# Task Tracker

A versatile task tracking application featuring both a **Command Line Interface (CLI)** and a **REST API** built with Node.js, Express, and MongoDB (Mongoose).

> **Project URL**: https://roadmap.sh/projects/task-tracker

This project is a solution for the [Task Tracker](https://roadmap.sh/projects/task-tracker) project on [roadmap.sh](https://roadmap.sh).

---

## Features

- **CLI Support**: Add, update, view, filter, and delete tasks directly from your terminal.
- **RESTful API**: Full CRUD endpoints testable via Postman or HTTP clients.
- **Auto-Incrementing IDs**: Tasks receive sequential integer IDs (`1, 2, 3...`).
- **Dynamic Overdue Tracking**: Automatically transitions expired in-progress tasks to `pending` when their deadline passes.
- **Due Date Support**: Custom deadlines with validation against past dates.

---

## Task Properties

Each task contains:
- `id`: A unique sequential integer identifier.
- `description`: A short description of the task.
- `status`: Current state (`in-progress`, `pending`, `completed`).
- `duedate`: Deadline date and time.
- `createdAt` / `updatedAt`: Automatic timestamps.

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- MongoDB Atlas or local MongoDB instance

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Jayant-Datta/Task-Tracker.git
cd Task-Tracker
npm install
```

---

## CLI Usage

Run tasks directly from your terminal using `node cli.js`:

### Adding a new task
```bash
# Add a task with default 7-day due date
node cli.js add "Buy groceries"

# Add a task with specific due date
node cli.js add "Submit report" "2026-10-25T18:00:00"
```

### Listing tasks
```bash
# List all tasks
node cli.js list

# Filter by status
node cli.js list completed
node cli.js list pending
node cli.js list in-progress
```

### Updating tasks
```bash
# Update description
node cli.js update 1 "Buy groceries and cook dinner"

# Mark as in-progress
node cli.js mark-in-progress 1

# Mark as done
node cli.js mark-done 1
```

### Deleting tasks
```bash
node cli.js delete 1
```

---

## REST API Usage

Start the dev server:
```bash
npm run dev
```
The server runs on `http://localhost:3000`.

### Endpoints

| Method | Endpoint | Description | Sample Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/addtask` | Create a new task | `{"description": "Study Node", "duedate": "2026-10-25"}` |
| **PATCH** | `/updatetask` | Mark task completed | `{"id": 1}` |
| **DELETE** | `/deletetask` | Delete a task | `{"id": 1}` |
| **GET** | `/ListAllTask` | List tasks grouped by status | - |
| **GET** | `/ListPendingTask` | List only pending tasks | - |
| **GET** | `/ListInProgressTask`| List only in-progress tasks | - |
| **GET** | `/ListCompletedTask` | List only completed tasks | - |

---

## License

ISC License
