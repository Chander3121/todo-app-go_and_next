# Todo App - Go Backend & Next.js Frontend

A full-stack todo application built with a Go backend and Next.js frontend. This project demonstrates a modern web development setup with separate backend and frontend applications.

## Project Structure

```
todo-app-go-next/
├── todo-be-go/          # Go backend application
└── todo-fe-next/        # Next.js frontend application
```

## Overview

### Backend (todo-be-go)
A RESTful API server built with Go that handles all todo operations:
- Create, read, update, and delete todos
- Database integration
- RESTful endpoint routing

**Tech Stack:**
- Go 1.x
- Database connectivity via custom config

### Frontend (todo-fe-next)
A modern web interface built with Next.js for managing todos:
- Responsive UI built with React and TypeScript
- Client-side state management
- API integration with the Go backend

**Tech Stack:**
- Next.js
- React
- TypeScript
- Tailwind CSS (PostCSS)
- ESLint for code quality

## Prerequisites

### For Backend
- Go 1.16 or higher
- A running database instance (configure in `todo-be-go/config/db.go`)

### For Frontend
- Node.js 18.x or higher
- npm or yarn package manager

## Setup Instructions

### 1. Backend Setup (Go)

Navigate to the backend directory:
```bash
cd todo-be-go
```

Initialize dependencies:
```bash
go mod tidy
```

Configure your database connection in `config/db.go` with your database credentials and connection details.

Run the server:
```bash
go run main.go
```

The backend server will start on the configured port (typically `http://localhost:8080`).

#### Backend Structure
- `main.go` - Application entry point
- `config/db.go` - Database configuration
- `models/todo.go` - Todo data model
- `controllers/todo_controller.go` - Request handlers
- `routes/todo_routes.go` - API route definitions

### 2. Frontend Setup (Next.js)

Open a new terminal and navigate to the frontend directory:
```bash
cd todo-fe-next
```

Install dependencies:
```bash
npm install
```

Configure the API endpoint in `lib/api.ts` to point to your backend server (e.g., `http://localhost:8080`).

Run the development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to access the application.

#### Frontend Structure
- `app/page.tsx` - Main page component
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles
- `lib/api.ts` - API client for backend communication
- `public/` - Static assets

## Development Workflow

### Running Both Apps

**Terminal 1 - Start the Backend:**
```bash
cd todo-be-go
go run main.go
```

**Terminal 2 - Start the Frontend:**
```bash
cd todo-fe-next
npm run dev
```

Visit `http://localhost:3000` to use the application.

### Building for Production

**Backend:**
```bash
cd todo-be-go
go build -o todo-api
./todo-api
```

**Frontend:**
```bash
cd todo-fe-next
npm run build
npm start
```

## API Endpoints

The backend provides the following RESTful endpoints for todo management:
- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Fetch a specific todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

See `todo-be-go/routes/todo_routes.go` for detailed route definitions.

## Environment Configuration

### Frontend Configuration
Update the API base URL in `todo-fe-next/lib/api.ts`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
```

### Backend Configuration
Configure your database connection in `todo-be-go/config/db.go` with appropriate credentials and connection string.

## Testing

### Frontend
```bash
cd todo-fe-next
npm run lint
```

### Backend
```bash
cd todo-be-go
go test ./...
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors when the frontend tries to call the backend, ensure your Go backend is configured to accept requests from the frontend's origin.

### Database Connection Issues
Verify that your database is running and the connection string in `config/db.go` is correct.

### Port Already in Use
If port 3000 or 8080 is already in use, you can configure alternative ports in the respective application configurations.

## Git Workflow

This monorepo uses Git to track both the backend and frontend:

```bash
# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main
```

## Contributing

When contributing to this project:
1. Make changes in either `todo-be-go/` or `todo-fe-next/`
2. Test your changes thoroughly
3. Commit with descriptive messages
4. Push to your branch

## License

This project is open source and available under the MIT License.
