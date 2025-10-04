# Portfolio Project

A modern portfolio website built with Next.js frontend and NestJS backend, featuring PostgreSQL database with Prisma ORM.

## Tech Stack

### Frontend

- **Next.js 15.3.4** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Three Fiber** - 3D graphics
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zustand** - State management
- **React Query** - Server state management
- **i18next** - Internationalization

### Backend

- **NestJS** - Node.js framework
- **PostgreSQL** - Relational database
- **Prisma** - ORM for database management
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Infrastructure

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Node.js 22** - Runtime environment

## Project Structure

```
├── next-app/                 # Next.js frontend application
│   ├── src/                 # Source code
│   ├── public/             # Static assets
│   ├── package.json         # Frontend dependencies
│   └── ...
├── nest-server/             # NestJS backend application
│   ├── src/                 # Source code
│   ├── prisma/             # Database schema and migrations
│   ├── package.json         # Backend dependencies
│   └── ...
├── docker-compose.yaml      # Multi-container setup
├── dockerfile              # Frontend Docker configuration
├── server.dockerfile        # Backend Docker configuration
└── .env                    # Environment variables (create from example)
```

## Prerequisites

Before running this project, ensure you have the following installed:

- **Docker** and **Docker Compose**
- **Node.js** (v22 or higher)
- **npm** or **yarn** package manager

## Quick Start with Docker

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd porfolio-project
```

### 2. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
# Application Ports
APP_PORT=3000
SERVER_PORT=7110
DATABASE_PORT=5432

# Database Configuration
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=portfolio_db
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:${DATABASE_PORT}/${POSTGRES_DB}?schema=public"

# Node Environment
NODE_ENV=development

# JWT Secret (generate a strong secret)
JWT_SECRET=your_jwt_secret_here
```

### 3. Start the application

```bash
docker-compose up --build
```

This command will:

- Build and start PostgreSQL database
- Build and start NestJS backend server
- Build and start Next.js frontend application
- Set up database migrations automatically

### 4. Access the application

- **Frontend**: <http://localhost:3000>
- **Backend API**: <http://localhost:7110/api>
- **Database**: PostgreSQL running on port 5432

## Development Setup (Without Docker)

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd next-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start development server:

    ```bash
    npm run dev
    ```

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd nest-server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up database:

    ```bash
    # Generate Prisma client
    npx prisma generate

    # Run database migrations
    npx prisma migrate dev
    ```

4. Start development server:

    ```bash
    npm run start:dev
    ```

## Database Management

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Running Database Commands in Docker

```bash
# Access database container
docker-compose exec database psql -U your_db_user -d portfolio_db

# Run Prisma migrations in backend container
docker-compose exec nestjs-server npm run prisma:dev:deploy
```

## API Documentation

The backend API includes RESTful endpoints and WebSocket support. You can explore the API using the provided `server-api.http` file or tools like Postman.

### Example API Endpoints

- `GET /api/health` - Health check
- `GET /api/projects` - Get portfolio projects
- `POST /api/contact` - Submit contact form
- WebSocket events for real-time features

## Testing

### Frontend Tests

```bash
cd next-app
npm run lint    # ESLint check
```

### Backend Tests

```bash
cd nest-server
npm run test    # Run unit tests
npm run test:e2e # Run end-to-end tests
npm run lint    # ESLint check
```

## Building for Production

### Using Docker (Recommended)

```bash
# Set NODE_ENV to production
NODE_ENV=production docker-compose up --build
```

### Manual Build

**Frontend:**

```bash
cd next-app
npm run build
npm start
```

**Backend:**

```bash
cd nest-server
npm run build
npm run start:prod
```

## Environment Variables

Key environment variables needed for proper operation:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token generation
- `NODE_ENV` - Environment (development/production)
- `APP_PORT` - Frontend application port
- `SERVER_PORT` - Backend API port
- `DATABASE_PORT` - Database port

## Troubleshooting

### Common Issues

1. **Database connection errors**: Ensure PostgreSQL is running and credentials are correct
2. **Port conflicts**: Change ports in `.env` file if default ports are occupied
3. **Docker build failures**: Clear Docker cache with `docker system prune`
4. **Prisma migration issues**: Run `npx prisma migrate reset` to reset database

### Docker Commands

```bash
# Stop all containers
docker-compose down

# Rebuild containers
docker-compose up --build

# View logs
docker-compose logs

# Remove volumes (warning: deletes data)
docker-compose down -v
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using modern web technologies
