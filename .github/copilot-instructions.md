# Copilot Instructions - Trossets Material Tracker

## Repository Information
- **Repository**: https://github.com/fmarigarcia/trossets-material-tracker
- **Owner**: fmarigarcia (Francisco Marí García)
- **Main Branch**: master
- **License**: MIT
- **Visibility**: Public

## Project Overview
This is a full-stack material tracking system for a 3D printing business built with:
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and React
- **Backend**: Node.js with Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Deployment**: Docker containers with production-ready configuration
- **CI/CD**: GitHub Actions with comprehensive workflows

## Project Structure
```
trossets-material-tracker/
├── .github/              # GitHub workflows and templates
│   ├── workflows/       # CI/CD GitHub Actions
│   └── copilot-instructions.md # Copilot guidelines
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # Reusable React components
│   │   │   ├── ui/       # UI components (Button, Card, Input, etc.)
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   │       └── Button.test.tsx
│   │   │   │   ├── Card/
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   │       └── Card.test.tsx
│   │   │   │   └── Input/
│   │   │   │       ├── Input.tsx
│   │   │   │       ├── index.ts
│   │   │   │       └── __tests__/
│   │   │   │           └── Input.test.tsx
│   │   │   └── layout/   # Layout components
│   │   │       └── Sidebar/
│   │   │           ├── Sidebar.tsx
│   │   │           ├── index.ts
│   │   │           └── __tests__/
│   │   │               └── Sidebar.test.tsx
│   │   ├── contexts/    # React Context providers
│   │   │   └── AuthContext/
│   │   │       ├── AuthContext.tsx
│   │   │       ├── index.ts
│   │   │       └── __tests__/
│   │   │           └── AuthContext.test.tsx
│   │   ├── lib/         # Utilities and configurations
│   │   ├── styles/      # Global styles and Tailwind config
│   │   ├── types/       # TypeScript type definitions
│   │   ├── utils/       # Helper functions
│   │   │   ├── index.ts
│   │   │   └── __tests__/
│   │   │       └── index.test.ts
│   │   └── __tests__/   # Test utilities and global test setup
│   │       └── test-utils.tsx
│   ├── public/          # Static assets
│   ├── jest.config.js   # Jest configuration
│   ├── jest.setup.js    # Jest setup file
│   └── Dockerfile       # Frontend container configuration
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── routes/      # Express route handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── config/      # Configuration files (Swagger, etc.)
│   │   └── types/       # Backend type definitions
│   ├── prisma/          # Database schema and migrations
│   └── Dockerfile       # Backend container configuration
├── docs/                # Project documentation
│   └── CICD_SETUP.md   # CI/CD configuration guide
├── docker-compose.yml   # Development environment
├── docker-compose.prod.yml # Production environment
└── README.md           # Project documentation
```

## CI/CD Setup

### GitHub Actions Workflows
The project includes comprehensive CI/CD pipelines:

1. **Main CI/CD Pipeline** (`.github/workflows/ci.yml`)
   - Triggers: Push to master/main/develop, Pull requests
   - Actions: Frontend/backend testing, linting, security scanning, Docker builds
   - Deployment: Automated staging and production deployments

2. **Frontend Deployment** (`.github/workflows/deploy-frontend.yml`)
   - Platform: Vercel integration
   - Triggers: Push to master, manual dispatch
   - Features: Environment selection, preview URLs

3. **Backend Deployment** (`.github/workflows/deploy-backend.yml`)
   - Platforms: Railway, Render, Docker registry
   - Features: Database migrations, health checks
   - Triggers: Push to master, manual dispatch

4. **Pull Request Validation** (`.github/workflows/pr.yml`)
   - Features: Code quality checks, semantic PR validation
   - Preview deployments, breaking change detection
   - Automatic size labeling and test execution

5. **Database Migration** (`.github/workflows/migrate.yml`)
   - Manual trigger only for safety
   - Environment selection (dev/staging/production)
   - Production protection against destructive operations

6. **Release Management** (`.github/workflows/release.yml`)
   - Triggers: Git tags (v*)
   - Features: GitHub releases, Docker publishing, production deployment

### Required Secrets
For full CI/CD functionality, configure these GitHub secrets:
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- `DATABASE_URL`
- `RAILWAY_TOKEN` or `RENDER_API_KEY`
- `DOCKER_REGISTRY` (optional for custom deployments)

## Commit Policies

### Conventional Commits
Use conventional commit format for all commits:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**
```
feat(frontend): add material filtering by type and brand
fix(backend): resolve authentication token validation issue
docs: update API documentation for material endpoints
ci: add automated security scanning to pipeline
```

### Branch Strategy
- **master**: Production-ready code
- **develop**: Integration branch for features
- **feature/***: Feature development branches
- **hotfix/***: Critical production fixes
- **release/***: Release preparation branches

### Pull Request Requirements
- Semantic PR title following conventional commits
- All CI checks must pass
- Code review required for master branch
- Automatic preview deployment for frontend changes
- Breaking change detection and validation

### Release Process
1. Create release branch from develop
2. Update version in package.json files
3. Update CHANGELOG.md with release notes
4. Create pull request to master
5. Tag release after merge: `git tag v1.0.0`
6. Push tag to trigger release workflow

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

## Development Workflow

### Local Development Setup
1. **Clone repository**: `git clone https://github.com/fmarigarcia/trossets-material-tracker.git`
2. **Install dependencies**: Run `npm install` in both frontend and backend directories
3. **Environment setup**: Copy `.env.example` files and configure local variables
4. **Database setup**: Use Docker Compose for local PostgreSQL instance
5. **Start development**: Use `npm run dev` for hot reloading

### Docker Development
```bash
# Start all services (database, backend, frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Testing Strategy
- **Frontend**: Jest + React Testing Library for unit/integration tests
  - **Component Tests**: Located in each component's `__tests__/` folder
  - **Context Tests**: Located in each context's `__tests__/` folder
  - **Utility Tests**: Located in `utils/__tests__/` folder
  - **Test Utilities**: Global test setup in `src/__tests__/test-utils.tsx`
- **Backend**: Jest + Supertest for API testing
- **E2E**: Playwright for end-to-end testing (planned)
- **Database**: Separate test database with automated setup/teardown

### Component Organization
- **Structure**: Each component has its own folder with:
  - `ComponentName.tsx` - Main component file
  - `index.ts` - Export file for clean imports
  - `__tests__/ComponentName.test.tsx` - Component tests
- **Import Pattern**: Use `import { ComponentName } from '@/components/ui/ComponentName'`
- **Test Pattern**: Tests are co-located with components for better maintainability

### Code Quality Tools
- **ESLint**: Code linting with Next.js and TypeScript configurations
- **Prettier**: Code formatting with consistent style
- **TypeScript**: Strict type checking enabled
- **Husky**: Pre-commit hooks for linting and testing

## ESLint Configuration & Linting Rules

### Frontend ESLint Configuration
**Location**: `frontend/eslint.config.mjs`
**Extends**: `['next/core-web-vitals', 'next/typescript', 'prettier']`

#### Mandatory Linting Rules
1. **No Explicit `any` Types** (`@typescript-eslint/no-explicit-any`)
   ```typescript
   // ❌ Avoid
   function process(data: any): any {}
   
   // ✅ Preferred
   function process(data: unknown): ProcessResult {}
   function process<T>(data: T): ProcessedData<T> {}
   ```

2. **No Unused Variables** (`@typescript-eslint/no-unused-vars`)
   ```typescript
   // ❌ Avoid
   import { unused, used } from './module';
   catch (error) { /* error not used */ }
   
   // ✅ Preferred
   import { used } from './module';
   catch { /* no variable if not used */ }
   catch (error) { console.error(error); }
   ```

3. **No Empty Object Types** (`@typescript-eslint/no-empty-object-type`)
   ```typescript
   // ❌ Avoid
   interface EmptyProps {}
   
   // ✅ Preferred
   interface EmptyProps extends Record<string, never> {}
   type EmptyProps = Record<string, never>;
   ```

4. **Proper Error Handling**
   ```typescript
   // ❌ Avoid
   catch (error: any) {
     throw new Error(error.message);
   }
   
   // ✅ Preferred
   catch (error: unknown) {
     const message = error instanceof Error ? error.message : 'Unknown error';
     throw new Error(message);
   }
   ```

5. **JSX File Extensions**
   - Use `.tsx` for files containing JSX
   - Use `.ts` for pure TypeScript files
   ```
   ✅ Component.tsx (contains JSX)
   ✅ utils.ts (no JSX)
   ```

### Backend ESLint Configuration
**Location**: `backend/eslint.config.mjs`
**Extends**: `['js/recommended', 'typescript-eslint/recommended']`

#### Backend-Specific Rules
1. **API Error Handling**
   ```typescript
   // ❌ Avoid
   catch (error: any) {
     res.status(500).json({ error: error.message });
   }
   
   // ✅ Preferred
   catch (error: unknown) {
     const message = error instanceof Error ? error.message : 'Internal server error';
     res.status(500).json({ success: false, error: { message } });
   }
   ```

2. **Type-Safe Request/Response**
   ```typescript
   // ✅ Preferred
   interface ApiResponse<T = unknown> {
     success: boolean;
     data?: T;
     error?: { message: string; details?: unknown };
   }
   ```

### Linting Commands
- **Frontend**: `npm run lint` (check), `npm run lint:fix` (auto-fix)
- **Backend**: `npm run lint` (check), `npm run lint:fix` (auto-fix)

### Pre-commit Requirements
- All files must pass ESLint validation
- Zero warnings or errors allowed
- Type checking must pass (`npm run type-check`)
- Tests must pass before commit

### Common Linting Issues & Solutions

#### 1. Browser Compatibility
```typescript
// ❌ Avoid (iteration not compatible with older browsers)
for (const [key, value] of params.entries()) {}

// ✅ Preferred
params.forEach((value, key) => {});
```

#### 2. Type Assertions
```typescript
// ❌ Avoid
const result = data as any;

// ✅ Preferred
interface ExpectedType { /* properties */ }
const result = data as ExpectedType;
```

#### 3. Import Organization
```typescript
// ✅ Preferred order
import React from 'react';                    // External libraries
import { NextPage } from 'next';              // Framework imports
import { Component } from '@/components';     // Internal absolute imports
import { utility } from '../utils';          // Internal relative imports
```

#### 4. Testing Files
```typescript
// ✅ All test files should import jest-dom
import '@testing-library/jest-dom';

// ✅ Use proper file extensions
// Component.test.tsx (for components with JSX)
// utils.test.ts (for utility functions)
```

### API Development
- **Swagger/OpenAPI**: Auto-generated documentation at `/api-docs`
- **Postman Collection**: Available for API testing
- **Type Safety**: Shared types between frontend and backend
- **Error Handling**: Consistent error response format

### Security Considerations
- **Authentication**: JWT tokens with secure HTTP-only cookies
- **Authorization**: Role-based access control (USER, ADMIN)
- **Input Validation**: Zod schemas for request validation
- **Rate Limiting**: Express rate limiting middleware
- **CORS**: Configured for frontend domain only
- **Security Headers**: Helmet.js for security headers

## Coding Standards

### TypeScript
- Use strict TypeScript configuration with `noImplicitAny: true`
- **Never use `any` types** - use `unknown`, specific interfaces, or generics
- Define proper interfaces for all data structures
- Use enums for fixed value sets (MaterialType, ProjectStatus, UserRole)
- Implement proper error handling with custom error types
- **Type-safe error handling**: Always catch `error: unknown` and check types
- **Generic constraints**: Use proper generic constraints instead of `any`
  ```typescript
  // ✅ Preferred
  function process<T extends Record<string, unknown>>(data: T): ProcessedData<T>
  
  // ❌ Avoid
  function process(data: any): any
  ```

### Backend (Node.js/Express)
- Follow RESTful API conventions
- Use middleware for authentication, validation, and error handling
- Implement proper request/response types with `ApiResponse<T>` interface
- Use Prisma for all database operations
- Include OpenAPI/Swagger documentation
- **Consistent error responses**: Always return `{ success: boolean, data?, error? }`
- **Type-safe middleware**: Define proper middleware types
- **Input validation**: Use Zod or Joi for runtime type checking

### Frontend (Next.js/React)
- Use App Router for routing
- Implement server components where appropriate
- Use client components only when necessary (interactivity, state)
- Follow React best practices for component composition
- Use Tailwind CSS for styling with consistent design system
- **Component testing**: Always include `@testing-library/jest-dom` in test files
- **JSX syntax**: Use `.tsx` extension for files containing JSX
- **Import organization**: External → Framework → Internal absolute → Internal relative
- **Unused imports**: Remove all unused imports to pass linting

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

#### Production Environments
- **Frontend**: Deployed on Vercel with automatic deployments from master branch
- **Backend**: Deployed on Railway/Render with Docker containers
- **Database**: PostgreSQL on cloud provider (Supabase/Railway/Neon)
- **Container Registry**: GitHub Container Registry for Docker images

#### Environment Variables
**Production Frontend (.env.production)**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**Production Backend**
```env
DATABASE_URL=postgresql://user:pass@host:port/database
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://yourdomain.com
```

#### Health Checks and Monitoring
- **Backend Health Endpoint**: `/health` - Returns service status and uptime
- **Database Health**: Connection status monitoring
- **Performance Monitoring**: Response time tracking
- **Error Tracking**: Comprehensive error logging and alerts

#### Deployment Process
1. **Staging**: Automatic deployment on push to develop branch
2. **Production**: Automatic deployment on push to master branch
3. **Rollback**: Manual process through deployment platform
4. **Database Migrations**: Automated via CI/CD pipeline

#### Infrastructure as Code
- **Docker Compose**: Local development environment
- **GitHub Actions**: CI/CD pipeline configuration
- **Environment Management**: Separate configs for dev/staging/production

## Performance Optimization

### Frontend Optimization
- **Next.js App Router**: Server-side rendering and static generation
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Analysis**: Webpack Bundle Analyzer for size optimization
- **Caching Strategy**: SWR/React Query with intelligent cache invalidation

### Backend Optimization
- **Database Indexing**: Proper indexes on frequently queried fields
- **Connection Pooling**: Prisma connection pooling
- **Caching**: Redis for session and API response caching (planned)
- **Rate Limiting**: Prevent API abuse and ensure fair usage
- **Compression**: Gzip compression for API responses

### Database Optimization
- **Query Optimization**: Prisma query optimization and includes
- **Migrations**: Incremental migrations with rollback capability
- **Backup Strategy**: Automated daily backups
- **Monitoring**: Query performance and slow query detection

## Troubleshooting Guide

### Common Development Issues
1. **Database Connection**: Check PostgreSQL is running and credentials are correct
2. **Port Conflicts**: Ensure ports 3000 (frontend) and 3001 (backend) are available
3. **Environment Variables**: Verify all required variables are set in .env files
4. **Prisma Issues**: Run `npx prisma generate` after schema changes

### CI/CD Issues
1. **Failed Tests**: Check test logs in GitHub Actions
2. **Build Failures**: Verify all dependencies are in package.json
3. **Deployment Failures**: Check environment variables and secrets configuration
4. **Migration Failures**: Ensure database is accessible and migrations are valid

### Production Issues
1. **Application Errors**: Check application logs and error tracking
2. **Performance Issues**: Monitor database queries and API response times
3. **Authentication Issues**: Verify JWT secrets and token expiration
4. **Database Issues**: Check connection limits and query performance

## Documentation Links
- **API Documentation**: Available at `/api-docs` when backend is running
- **CI/CD Setup Guide**: `docs/CICD_SETUP.md`
- **Database Schema**: `backend/prisma/schema.prisma`
- **Environment Examples**: `.env.example` files in root and frontend directories

## Contact and Support
- **Repository**: https://github.com/fmarigarcia/trossets-material-tracker
- **Owner**: Francisco Marí García (fmarigarcia)
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and community support
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
