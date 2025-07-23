# Trossets Material Tracker - Frontend

This is the frontend application for the Trossets Material Tracker, built with Next.js 13+ (App Router), TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Update the `.env.local` file with your configuration:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Dashboard**: Overview of materials, projects, and inventory
- **Material Management**: Track filament inventory and stock levels
- **Project Tracking**: Monitor 3D printing projects and costs
- **Purchase Management**: Record material purchases and expenses
- **Supplier Database**: Maintain supplier information
- **Analytics**: Material usage and cost analysis
- **Authentication**: User login and registration
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + React Query
- **HTTP Client**: Axios
- **Icons**: React Icons (Feather Icons)
- **Charts**: Recharts
- **Forms**: React Hook Form

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── materials/         # Material management pages
│   ├── projects/          # Project management pages
│   ├── purchases/         # Purchase management pages
│   ├── suppliers/         # Supplier management pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── providers.tsx     # App providers
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── forms/            # Form components
│   ├── charts/           # Chart components
│   └── layout/           # Layout components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utilities and configurations
├── styles/               # Global styles
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## API Integration

The frontend communicates with the backend API through the `apiClient` in `src/lib/api.ts`. All API endpoints are typed and include:

- Authentication (login, register, logout)
- Dashboard statistics
- Material CRUD operations
- Project CRUD operations
- Supplier CRUD operations
- Purchase CRUD operations

## Authentication

The app uses JWT token-based authentication. The auth state is managed through React Context (`AuthContext`) and persisted in localStorage.

## Styling

The app uses Tailwind CSS with a custom color palette and component classes. Global styles are defined in `src/styles/globals.css`.

## Development Guidelines

1. Use TypeScript for all components and utilities
2. Follow the established file and folder structure
3. Use the provided UI components for consistency
4. Implement proper error handling and loading states
5. Make components responsive using Tailwind classes
6. Use React Query for API calls and caching

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL

## Building for Production

```bash
npm run build
npm run start
```

## Contributing

1. Follow the established code style and structure
2. Add proper TypeScript types for new features
3. Include error handling and loading states
4. Test components thoroughly
5. Update documentation when needed
