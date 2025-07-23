# Trossets Material Tracker

A comprehensive material tracking system for 3D printing businesses built with Next.js, Node.js, Prisma, and PostgreSQL.

## 🚀 Features

- **Material Management**: Track filament inventory, types, colors, and usage
- **Project Tracking**: Monitor material consumption per project
- **Cost Analysis**: Calculate material costs and project profitability
- **Low Stock Alerts**: Get notified when materials are running low
- **Print History**: Track successful prints and material usage
- **Supplier Management**: Manage supplier information and purchase history

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express and TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Deployment**: Docker containers with production-ready configuration

## 📦 Project Structure

```
trossets-material-tracker/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js backend API
├── docker/            # Docker configuration files
├── docker-compose.yml # Development environment setup
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Development Setup

1. **Clone and setup the project:**
   ```bash
   git clone <your-repo>
   cd trossets-material-tracker
   ```

2. **Start the development environment:**
   ```bash
   docker-compose up -d
   ```

3. **Setup the backend:**
   ```bash
   cd backend
   npm install
   npm run db:migrate
   npm run dev
   ```

4. **Setup the frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: PostgreSQL on localhost:5432

## 🌐 Deployment

### Using Docker

```bash
# Build and deploy all services
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

Detailed deployment instructions for various platforms:
- [Vercel (Frontend)](./docs/deployment/vercel.md)
- [Railway/Render (Backend)](./docs/deployment/railway.md)
- [Supabase (Database)](./docs/deployment/supabase.md)

## 📚 API Documentation

Once the backend is running, visit http://localhost:3001/api-docs for interactive API documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
