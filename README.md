# Nexus Dashboard

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Nexus is a state-of-the-art, high-performance monitoring and telemetry dashboard. Built with **Nuxt 4** and **Vue 3**, it provides real-time insights, advanced analytics, and a cinematic user experience for system administration.

---

## Features

- **Real-time Telemetry**: Live data streaming using RxJS for instant system health updates.
- **Advanced Analytics**: Detailed visualization of metrics with Apache ECharts.
- **System Heatmaps**: Interactive spatial representations of system load and distribution.
- **Log Explorer**: High-performance log management with virtual scrolling for large datasets.
- **Secure Authentication**: Robust session management using `nuxt-auth-utils`.
- **Premium UI/UX**: Cinematic aesthetic built with Tailwind CSS, Shadcn Vue, and Radix Vue.
- **Offline Resilience**: Local data persistence leveraging Dexie.js (IndexedDB).

---

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Future-ready compatibility)
- **UI Components**: [Shadcn Vue](https://www.shadcn-vue.com/) & [Radix Vue](https://www.radix-vue.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Visualizations**: [Apache ECharts](https://echarts.apache.org/)
- **Form Logic**: [VeeValidate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/)
- **Reactive Programming**: [RxJS](https://rxjs.dev/)
- **Database**: [Dexie.js](https://dexie.org/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)

---

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- Corepack enabled (for pnpm) or npm/yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/nexus-dashboard.git
   cd nexus-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   NUXT_SESSION_PASSWORD=your_random_long_password_here
   ```

### Development

Start the development server:
```bash
npm run dev
```
The dashboard will be available at `http://localhost:3000`.

---

## Project Structure

```text
app/
├── assets/         # Global styles and static assets
├── components/     # Vue components (UI, Dashboard, Shared)
├── composables/    # Nuxt composables (Telemetry, Auth, etc.)
├── layouts/        # Page layouts
├── middleware/     # Route middleware (Auth guards)
├── pages/          # Application views (Index, Analytics, Logs, etc.)
├── stores/         # Pinia state stores
├── types/          # TypeScript definitions
└── workers/        # Web Workers for heavy computations
```

---

## Deployment

Build the production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## Performance

Nexus is optimized for performance using:
- **Tree-shaking**: Only importing used components and icons.
- **Virtual Scrolling**: Rendering only visible log entries for maximum smoothness.
- **Web Workers**: Offloading heavy data processing from the main thread.
