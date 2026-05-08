# SchoolSync Architecture

## Overview
SchoolSync is a SaaS school management platform built with a mobile-first, low-bandwidth-optimized architecture.

## Tech Stack

### Web Application
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Components | shadcn/ui + Custom |
| State | Zustand |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| HTTP Client | Axios |
| Icons | Lucide React |
| Dark Mode | next-themes |

### Mobile Application
| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo |
| Routing | Expo Router |
| Language | TypeScript |
| State | Zustand |
| Data Fetching | TanStack Query |
| HTTP Client | Axios |

## Folder Structure

### Web (`frontend/src/`)
```
app/                    # Next.js App Router pages
  (auth)/               # Auth route group (login, forgot-pw, otp, reset)
  (dashboard)/          # Protected dashboard route group
  select-role/          # Role selection gateway
  layout.tsx            # Root layout with providers
  globals.css           # Design system tokens + base styles

components/
  ui/                   # Base UI components (Button, Input, Card, Badge, etc.)
  dashboard/            # Dashboard widgets (StatCard, AttendanceRing, etc.)
  shared/               # Cross-cutting (Sidebar, TopNavbar, MobileBottomTabs, EmptyState)
  forms/                # Form-specific components
  tables/               # Data table components
  charts/               # Chart components

features/
  dashboard/            # Role-specific dashboard compositions
  auth/                 # Auth feature logic
  students/             # Student feature logic
  attendance/           # Attendance feature logic
  fees/                 # Fee feature logic

config/                 # Navigation config, role definitions
hooks/                  # Custom hooks (useMediaQuery, useDebounce)
lib/                    # Utilities (cn, formatters, animations, tokens, validators)
services/               # API client and service layer
store/                  # Zustand stores (auth, ui)
types/                  # TypeScript interfaces
```

### Mobile (`frontend/mobile/`)
```
app/                    # Expo Router screens
  (auth)/               # Auth flow (login)
  (tabs)/               # Bottom tab screens (home, assignments, results, timetable, profile)

src/
  theme/                # Token system + ThemeProvider
  services/             # API client
  hooks/                # Custom hooks
  store/                # Zustand stores
  types/                # Shared types
```

## Data Flow

```
User Action → Component → Zustand Store (UI state)
                       → TanStack Query (server state) → Axios → API
                       → React Hook Form → Zod Validation → API
```

## State Management

- **Zustand** for client state (auth, UI preferences, sidebar state)
- **TanStack Query** for server state (data fetching, caching, invalidation)
- **React Hook Form** for form state (controlled inputs, validation)

## Authentication Flow

```
Login → API → Tokens stored in localStorage/Zustand
     → Role Selection Gateway (if multiple roles)
     → Dashboard (role-specific)
     → Auto token refresh via Axios interceptor
     → 401 → Redirect to login
```

## Route Protection

- Server: Next.js middleware checks auth cookies
- Client: `useAuthStore` + redirect in layout components
- Mobile: Expo Router redirect in root layout

## Performance Optimizations

1. **Code splitting**: Automatic per-route via Next.js App Router
2. **Lazy loading**: Dynamic imports for heavy components (charts, modals)
3. **Skeleton loading**: Shown during data fetches
4. **Image optimization**: Next.js `<Image>` component
5. **Reduced motion**: Respects `prefers-reduced-motion` media query
6. **Font optimization**: Google Fonts via `next/font` (zero layout shift)

## User Roles

| Role | Access Level |
|------|-------------|
| Super Admin | Platform-wide — all schools, users, analytics |
| School Admin | School-wide — students, staff, fees, academics |
| Teacher | Class-level — attendance, assignments, results |
| Parent | Child-level — attendance, fees, academics |
| Student | Self — timetable, assignments, results |
