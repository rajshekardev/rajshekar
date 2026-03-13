# Raj Shekar S

<p align="start">
  A Playground project where i experiment with new technologies and ideas. 
  <br>
</p>

<p align="start">
  <b>Test links</b>
</p>
<p align="center">
  <a href="https://rajshekar.dev">
    <img alt="rajshekar.dev" src="https://img.shields.io/badge/rajshekar.dev-111827?style=for-the-badge&logo=googlechrome&logoColor=white">
  </a>
  <a href="https://api.rajshekar.dev/api-reference">
    <img alt="api.rajshekar.dev" src="https://img.shields.io/badge/api.rajshekar.dev-F97316?style=for-the-badge&logo=cloudflare&logoColor=white">
  </a>
  <a href="https://rajshekar.dev/apk">
    <img alt="Mobile APK" src="https://img.shields.io/badge/Mobile_APK-Download-000020?style=for-the-badge&logo=android&logoColor=white">
  </a>
  <a href="https://rajshekar.dev/tui">
    <img alt="CLI Tool" src="https://img.shields.io/badge/CLI_Tool-Command-555555?style=for-the-badge&logo=gnumetall&logoColor=white">
  </a>
</p>

---

## 🏗️ Architecture
**Monorepo architecture** 

A central **Hono** server utilizes **oRPC** to provide a single source of truth for all types.

API definitions are shared across every client, ensuring that breaking changes are caught at compile-time for Web, Native, and TUI.

Optimized for Cloudflare Workers and D1 database for global low-latency performance. Database sharding, clustering to serve users efficiently.

## 📱 The Platform

| Surface    | Purpose             | Primary Stack                                                             |
| :--------- | :------------------ | :------------------------------------------------------------------------ |
| **Web**    | Public Portfolio    | [TanStack Start](https://tanstack.com/start/), React, Tailwind, shadcn/ui, React Query, Tanstack DB, Tanstack AI, Hotkeys & more  |
| **API**    | Core Infrastructure | [Hono](https://hono.dev/), oRPC, Better Auth, Drizzle, Cloudflare D1, Alchemy, etc.      |
| **Native** | Mobile Dashboard    | [Expo](https://expo.dev/), React Native, Uniwind, HeroUI Native           |
| **TUI**    | Operational Control | [OpenTUI](https://opentui.dev/), React, TanStack Query, Zustand           |

## 🛠️ Technology Stack

### Backend & Infrastructure
[![Hono](https://img.shields.io/badge/Hono-E36002?style=flat-square&logo=hono&logoColor=white)](https://hono.dev/)
[![oRPC](https://img.shields.io/badge/oRPC-8752E1?style=flat-square&logoColor=white)](https://orpc.unnoq.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-111827?style=flat-square&logo=fingerprint&logoColor=white)](https://better-auth.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=000)](https://orm.drizzle.team/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_D1-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/d1/)

### Frontend (Web & Native)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack](https://img.shields.io/badge/TanStack-FF4154?style=flat-square&logo=tanstack&logoColor=white)](https://tanstack.com/)
[![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)

### Tooling & Observability
[![Biome](https://img.shields.io/badge/Biome-60A5FA?style=flat-square&logo=biome&logoColor=white)](https://biomejs.dev/)
[![Sentry](https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=sentry&logoColor=white)](https://sentry.io/)
[![PostHog](https://img.shields.io/badge/PostHog-1D1F23?style=flat-square&logo=posthog&logoColor=white)](https://posthog.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)](https://turbo.build/)

---

## 🚀 Local Development

This project uses [Bun](https://bun.sh) for performance and ease of use.

```bash
# Install dependencies for the monorepo
bun install

# Start all platform surfaces in development mode
bun run dev

# Deploy to Cloudflare
bun run deploy
```
