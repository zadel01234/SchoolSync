# SchoolSync Design System

## Color Palette

### Primary (Indigo)
| Token | Hex | Usage |
|-------|-----|-------|
| primary-50 | `#eef2ff` | Hover backgrounds |
| primary-100 | `#e0e7ff` | Active/selected backgrounds |
| primary-500 | `#6366f1` | Light mode accent |
| primary-600 | `#4f46e5` | **Primary actions, CTAs** |
| primary-700 | `#4338ca` | Hover state |

### Success (Emerald)
| Token | Hex | Usage |
|-------|-----|-------|
| success-500 | `#10b981` | Success states, positive metrics |
| success-600 | `#059669` | Success hover |

### Warning (Amber)
| Token | Hex | Usage |
|-------|-----|-------|
| warning-500 | `#f59e0b` | Warning states, pending items |

### Destructive (Red)
| Token | Hex | Usage |
|-------|-----|-------|
| danger-500 | `#ef4444` | Error states, destructive actions |
| danger-600 | `#dc2626` | Error hover |

### Neutrals (Slate)
Full scale from slate-50 (`#f8fafc`) to slate-950 (`#020617`)

## Typography

### Font Families
- **Body/UI**: Inter
- **Headings**: Plus Jakarta Sans
- **Code**: JetBrains Mono

### Scale
| Class | Size | Line Height | Usage |
|-------|------|------------|-------|
| text-xs | 12px | 16px | Captions, badges |
| text-sm | 14px | 20px | Body small, labels |
| text-base | 16px | 24px | Body default |
| text-lg | 18px | 28px | Subheadings |
| text-xl | 20px | 28px | Section titles |
| text-2xl | 24px | 32px | Page titles |
| text-3xl | 30px | 36px | Hero text |
| text-4xl | 36px | 40px | Dashboard metrics |

### Weights
- Light (300): De-emphasized text
- Regular (400): Body text
- Medium (500): Labels, navigation
- Semibold (600): Card titles, table headers
- Bold (700): Page headings
- Extrabold (800): Hero/metric numbers

## Spacing

4px base unit. Scale: 0→24 (0px→96px)

Common usage:
- `gap-2` (8px): Inline element spacing
- `gap-3` (12px): Card internal spacing
- `gap-4` (16px): Section gaps, padding
- `gap-6` (24px): Dashboard section gaps
- `p-4` (16px): Mobile card padding
- `p-5` (20px): Desktop card padding
- `p-6` (24px): Page section padding

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| rounded-md | 10px | Inputs, small buttons |
| rounded-lg | 12px | Cards, panels |
| rounded-xl | 16px | Large cards, modals |
| rounded-2xl | 20px | Feature cards |
| rounded-full | 9999px | Avatars, badges, pills |

## Shadows

| Token | Usage |
|-------|-------|
| shadow-xs | Subtle elevation (inputs) |
| shadow-card | Card resting state |
| shadow-card-hover | Card hover state |
| shadow-md | Dropdowns, popovers |
| shadow-lg | Modals, dialogs |

## Breakpoints

| Name | Width | Target |
|------|-------|--------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

## Dark Mode

Enabled via `next-themes` with CSS variable swapping. All semantic tokens have light/dark variants defined in `globals.css`.

Toggle: System detection + manual override via TopNavbar button.

## Component Catalog

### Base UI
Button, Input, Card, Badge, Avatar, Skeleton, Alert, Progress, Dialog, Popover, Tooltip, DropdownMenu, Select, Checkbox, Radio, Switch, Separator

### Dashboard
StatCard, AttendanceRing, StudentProfileCard, EmptyState

### Navigation
Sidebar (collapsible), TopNavbar, MobileBottomTabs

### Layout
AuthLayout (split-screen), DashboardLayout (sidebar + topbar + content)
