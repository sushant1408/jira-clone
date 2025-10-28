# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment Setup

### Prerequisites

Before running the project, you need to set up an Appwrite account and obtain API credentials:

1. **Appwrite** (Backend Database & Authentication)
   - Create account at https://cloud.appwrite.io
   - Create a new project
   - Set up collections for: Workspaces, Projects, Tasks, Members
   - Create a storage bucket for images
   - Generate a private API key for server-side operations

### Environment Variables

Copy `.env.example` to `.env` and fill in your Appwrite credentials:

```bash
cp .env.example .env
```

Then update `.env` with your actual Appwrite credentials:

**Important**: Never commit `.env` to version control. Use `.env.example` to document required variables without exposing secrets.

## Project Overview

This is a **Jira Clone** - a full-stack project management application built with Next.js. It's a SaaS-style workspace-based tool with projects, tasks, and team collaboration features.

**Tech Stack:**
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix UI)
- **Backend:** Hono (running on Vercel serverless), Node-Appwrite SDK
- **Database:** Appwrite (BaaS)
- **Data Fetching:** React Query (TanStack Query)
- **Forms:** React Hook Form + Zod validation
- **Drag & Drop:** @hello-pangea/dnd (drag-n-drop for kanban)
- **UI Libraries:** recharts (analytics), react-big-calendar, date-fns, lucide-react icons

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 3008)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linting (ESLint via Next.js)
npm run lint
```

## Architecture Overview

### Directory Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes (sign-in, sign-up)
│   ├── (dashboard)/         # Main dashboard with sidebar layout
│   ├── (standalone)/        # Settings, invite, workspace join pages
│   ├── api/[[...route]]/    # Hono API router
│   └── layout.tsx           # Root layout with providers
│
├── features/                # Domain-driven features (modular)
│   ├── auth/                # Authentication (OAuth, sessions)
│   ├── workspaces/          # Workspace management (create, settings, invite)
│   ├── projects/            # Project management
│   ├── tasks/               # Task CRUD, views (table, kanban, calendar)
│   └── members/             # Team member management
│
├── components/              # Shared UI components
│   ├── ui/                  # shadcn/ui components (Radix-based)
│   ├── app-sidebar.tsx      # Main navigation sidebar
│   ├── navbar.tsx           # Top navigation
│   ├── workspace-switcher.tsx
│   ├── query-provider.tsx   # React Query setup
│   └── ... other shared components
│
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities & clients
│   ├── appwrite.ts         # Appwrite client (admin & session)
│   ├── hono.ts             # Hono typed RPC client
│   ├── session-middleware.ts
│   └── oauth.ts
│
└── config/                  # Configuration
    ├── db-constants.ts     # Appwrite database/collection IDs
    └── site.ts             # Site metadata
```

### Feature Pattern

Each feature follows a consistent structure:
```
features/[feature]/
├── api/                    # React Query hooks (use-get-*, use-create-*, etc)
├── components/             # Feature UI components (modals, forms, lists)
├── server/                 # Hono API routes
├── types.ts                # TypeScript types/enums
├── form-schemas.ts         # Zod validation schemas
└── utils.ts                # Helper functions
```

### API Architecture

- **Backend API:** Hono framework running as serverless functions in `/api/[[...route]]/route.ts`
- **Client RPC:** `hc` client from Hono provides type-safe API calls (`@/lib/hono`)
- **Pattern:** API endpoints are modular by feature (auth, workspaces, projects, tasks, members)
- **Validation:** Zod schemas via `@hono/zod-validator`

### Data Flow

1. **UI Components** call React Query hooks (`use-*` files in feature `/api`)
2. **React Query hooks** call the **Hono RPC client**
3. **Hono RPC client** hits **Next.js API routes** (`/api/[[...route]]/`)
4. **API routes** route to feature-specific **Hono routers**
5. **Hono routers** interact with **Appwrite database** via session or admin clients

### Authentication & Sessions

- Uses **Appwrite authentication** with OAuth support
- Session stored in **HTTP-only cookies** (AUTH_COOKIE from `@/features/auth/constants`)
- **createSessionClient()** in `lib/appwrite.ts` reads session from cookies
- **createAdminClient()** uses server-side API key for privileged operations
- Middleware (`sessionMiddleware`) injects authenticated user & databases into Hono context

## Key Patterns & Conventions

### Component Organization

- **Page components** use `.tsx` and are in `app/` (App Router)
- **Server Components** are default; use `"use client"` only when needed (forms, interactivity)
- **Client Components** for modals, forms, dropdowns (features like CreateTaskModal, EditTaskModal)
- UI components in `components/ui/` are shadcn/ui (Radix-based), mostly client-only

### Forms & Validation

- Use **React Hook Form** + **Zod** for validation
- Schema definition in `features/[feature]/form-schemas.ts`
- Forms often wrapped in responsive modals via `<ResponsiveModal>`

### State Management

- **Server State:** React Query (TanStack Query) for API data
- **URL State:** `nuqs` for search params (filters, sorting)
- **UI State:** React component state + modals stored in global modals

### Modal System

Modals are defined in the dashboard layout and triggered globally:
- `<CreateWorkspaceModal />`, `<CreateProjectModal />`, `<CreateTaskModal />`, `<EditTaskModal />`
- Modals typically controlled via custom hooks like `useConfirm()`, `useCreateTaskModal()`, etc.

## Key Files & Concepts

### Must-Know Files

- **`src/app/api/[[...route]]/route.ts`** - Main API router, imports all feature routes
- **`src/lib/appwrite.ts`** - Appwrite client setup (critical for DB operations)
- **`src/lib/hono.ts`** - Hono typed RPC client
- **`src/app/layout.tsx`** - Root layout with React Query & NuqsAdapter
- **`src/app/(dashboard)/layout.tsx`** - Dashboard layout with sidebar & modals
- **`src/config/db-constants.ts`** - Appwrite database/collection IDs (environment-dependent)

### Appwrite Structure

Database IDs are stored in environment variables:
```
NEXT_PUBLIC_APPWRITE_ENDPOINT
NEXT_PUBLIC_APPWRITE_PROJECT
NEXT_PUBLIC_APPWRITE_DATABASE_ID
NEXT_PUBLIC_APPWRITE_WORKSPACES_ID  (collection)
NEXT_PUBLIC_APPWRITE_PROJECTS_ID    (collection)
NEXT_PUBLIC_APPWRITE_TASKS_ID       (collection)
NEXT_PUBLIC_APPWRITE_MEMBERS_ID     (collection)
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID
NEXT_APPWRITE_KEY                   (private server key)
```

### UI Component Library

Uses **shadcn/ui** (Radix UI + Tailwind). Common components:
- `Button`, `Input`, `Label`, `Dialog`, `Select`, `Tabs`, `Dropdown Menu`
- `Checkbox`, `Avatar`, `Tooltip`, `Popover`, `Scroll Area`
- Custom icons from `lucide-react`

### Task Views

Application supports multiple task views:
- **Table View** - Data table with sorting/filtering
- **Kanban View** - Drag-n-drop by status (using @hello-pangea/dnd)
- **Calendar View** - react-big-calendar for scheduled view
- **Overview** - Analytics dashboard with recharts

## Common Development Tasks

### Adding a New API Endpoint

1. Create route in `features/[feature]/server/route.ts` using Hono syntax
2. Wrap with `zValidator` for input validation + `sessionMiddleware` for auth
3. Create React Query hook in `features/[feature]/api/use-*.tsx`
4. Import and use hook in component

### Adding a New Feature

1. Create `src/features/[feature]/` directory
2. Add subdirectories: `api/`, `components/`, `server/`, and files: `types.ts`, `form-schemas.ts`
3. Create Hono router in `server/route.ts`
4. Import router in `/api/[[...route]]/route.ts`
5. Create React Query hooks for all API operations
6. Build UI components using shadcn/ui + React Hook Form

### Working with Modals

- Modals are instantiated in dashboard layout
- Create custom hook to control modal state (e.g., `useCreateTaskModal()`)
- Hook provides `open()`, `close()` methods and form context
- Modal component is a client component that reads from the custom hook

### Filtering & Search

- Use `nuqs` for URL search parameters (preserved on page reload)
- Search params include: `workspaceId`, `projectId`, `assigneeId`, `status`, `dueDate`, `search`
- React Query refetch when filters change

## Deployment

- Deployed to **Vercel** (Next.js native platform)
- API runs as serverless functions (Hono + `handle()` from hono/vercel)
- Requires Appwrite backend (can be self-hosted or BaaS)
- Environment variables must be set for Appwrite connection

## Recent Development Focus

Recent commits indicate active work on:
- Views: calendar, kanban (drag-n-drop), table, and analytics
- Task management: creation, editing, filtering, bulk updates
- Workspace/project management: settings, member invites
- OAuth authentication
- UI polish and component refactoring

## Libraries & Dependencies

### Frontend Libraries
- **next** - React framework with App Router and SSR
- **react** & **react-dom** - Core React library
- **typescript** - Static type checking
- **tailwindcss** - Utility-first CSS framework
- **@radix-ui/** - Headless UI component library (buttons, dialogs, dropdowns, etc.)
- **shadcn/ui** - Pre-built Radix UI components with Tailwind styling
- **lucide-react** - Icon library with React components

### Data Fetching & State Management
- **@tanstack/react-query** - Server state management and caching
- **nuqs** - URL search params state management
- **react-hook-form** - Lightweight form state management
- **zod** - TypeScript-first schema validation

### Backend & API
- **hono** - Lightweight web framework for API routes
- **hono/vercel** - Vercel serverless adapter for Hono
- **node-appwrite** - Official Appwrite SDK for Node.js
- **@hono/zod-validator** - Zod validation middleware for Hono

### UI & Visualization
- **recharts** - Composable charting library for analytics
- **react-big-calendar** - Calendar view component for scheduling
- **date-fns** - Modern date utility library
- **@hello-pangea/dnd** - Drag-and-drop library for kanban boards

### Form & Input Handling
- **react-hook-form** - Efficient form state management
- **zod** - Schema validation with TypeScript support

### Development Tools
- **eslint** - Code linting
- **@types/node** - TypeScript types for Node.js
- **@types/react** - TypeScript types for React

### Database & Backend Services
- **Appwrite** - Open-source backend-as-a-service for authentication, database, and storage
