# Copilot Instructions - Trossets Material Tracker

## Project Overview
This is a full-stack material tracking system for a 3D printing business built with:
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and React
- **Backend**: Node.js with Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Deployment**: Docker containers with production-ready configuration

## Project Structure
```
trossets-material-tracker/
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # Reusable React components
│   │   ├── lib/         # Utilities and configurations
│   │   └── types/       # TypeScript type definitions
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── routes/      # Express route handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── controllers/ # Business logic
│   │   ├── services/    # Data access layer
│   │   └── utils/       # Helper functions
│   └── prisma/          # Database schema and migrations
└── docker/              # Docker configuration files
```

## Core Business Logic

### Material Management
- Track filament inventory (PLA, ABS, PETG, TPU, etc.)
- Monitor material types, colors, brands, and suppliers
- Calculate remaining material based on usage
- Track material costs per kilogram

### Project Tracking
- Create and manage 3D printing projects
- Track material consumption per project
- Calculate project costs based on material usage
- Monitor project status (planned, in-progress, completed, cancelled)

### Purchase Management
- Record material purchases from suppliers
- Track purchase history and costs
- Update material inventory automatically
- Manage supplier information

### Cost Analysis
- Calculate material costs for projects
- Track profit margins
- Generate cost reports
- Monitor material efficiency

## Database Schema Key Models

### Material
- Properties: name, type, brand, color, diameter, density, cost per kg
- Inventory: total weight, used weight, remaining weight
- Relationships: supplier, project materials, purchases

### Project
- Properties: name, description, status, dates, estimated/actual costs
- Relationships: user, project materials

### ProjectMaterial (junction table)
- Tracks material usage per project
- Records: weight used, cost, notes

### Purchase
- Records material purchases
- Properties: quantity, weight, costs, purchase date
- Relationships: material, supplier, user

## Coding Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces for all data structures
- Use enums for fixed value sets (MaterialType, ProjectStatus, UserRole)
- Implement proper error handling with custom error types

### Backend (Node.js/Express)
- Follow RESTful API conventions
- Use middleware for authentication, validation, and error handling
- Implement proper request/response types
- Use Prisma for all database operations
- Include OpenAPI/Swagger documentation

### Frontend (Next.js/React)
- Use App Router for routing
- Implement server components where appropriate
- Use client components only when necessary (interactivity, state)
- Follow React best practices for component composition
- Use Tailwind CSS for styling with consistent design system

### Database (Prisma/PostgreSQL)
- Use descriptive model and field names
- Implement proper relationships with foreign keys
- Include created/updated timestamps
- Use appropriate data types (DateTime, Float, Int, String)
- Implement cascading deletes where appropriate

## API Endpoints Structure

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Materials
- `GET /api/materials` - List all materials
- `POST /api/materials` - Create new material
- `GET /api/materials/:id` - Get material details
- `PUT /api/materials/:id` - Update material
- `DELETE /api/materials/:id` - Delete material

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/materials` - Add material to project

### Suppliers
- `GET /api/suppliers` - List all suppliers
- `POST /api/suppliers` - Create new supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Purchases
- `GET /api/purchases` - List purchases
- `POST /api/purchases` - Record new purchase
- `GET /api/purchases/:id` - Get purchase details

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/low-stock` - Get low stock alerts
- `GET /api/dashboard/recent-projects` - Get recent projects

## UI/UX Guidelines

### Design System
- Use consistent color scheme for material types
- Implement responsive design for mobile and desktop
- Use loading states and error boundaries
- Provide clear feedback for user actions

### Material Management UI
- Display materials in cards or table format
- Show visual indicators for low stock
- Use color coding for material types
- Implement search and filtering capabilities

### Project Management UI
- Show project progress and status clearly
- Display material usage with visual charts
- Provide cost breakdown views
- Enable easy material addition to projects

### Dashboard
- Display key metrics and statistics
- Show low stock alerts prominently
- Provide quick access to recent projects
- Include cost analysis charts

## Security Considerations

### Authentication
- Use JWT tokens with proper expiration
- Implement rate limiting on auth endpoints
- Hash passwords with bcrypt
- Validate all user inputs

### Authorization
- Implement role-based access control (Admin/User)
- Protect routes with authentication middleware
- Validate user ownership of resources

### Data Validation
- Use Joi or similar for request validation
- Sanitize user inputs
- Implement proper error handling
- Use HTTPS in production

## Performance Considerations

### Database
- Use proper indexing on frequently queried fields
- Implement pagination for large datasets
- Use database transactions for complex operations
- Optimize Prisma queries with includes and selects

### Frontend
- Implement proper loading states
- Use React Query or SWR for data fetching
- Optimize bundle size with code splitting
- Use Next.js Image optimization

## Development Workflow

### Environment Setup
1. Start PostgreSQL database with Docker Compose
2. Run Prisma migrations
3. Seed database with sample data
4. Start backend development server
5. Start frontend development server

### Testing Strategy
- Unit tests for utility functions
- Integration tests for API endpoints
- Component tests for React components
- E2E tests for critical user flows

### Deployment
- Use Docker containers for consistent deployment
- Implement CI/CD pipeline
- Use environment variables for configuration
- Monitor application performance and errors

## Common Patterns to Follow

### Error Handling
```typescript
// API responses should follow this pattern
{
  success: boolean;
  data?: any;
  error?: {
    message: string;
    details?: any;
  };
}
```

### Database Operations
```typescript
// Always use try-catch with Prisma operations
try {
  const result = await prisma.material.create({
    data: materialData,
    include: { supplier: true }
  });
  return { success: true, data: result };
} catch (error) {
  throw new CustomError('Failed to create material', 400);
}
```

### React Components
```typescript
// Use proper TypeScript interfaces
interface MaterialCardProps {
  material: Material;
  onUpdate: (material: Material) => void;
}

// Implement error boundaries and loading states
```

When working on this project, always consider the business context of 3D printing material management and ensure that features support efficient inventory tracking, cost management, and project planning.
