# TalentFlow AI - Live Links

## Deployment Complete

## Web Application

| Service | URL |
|---------|-----|
| **Production** | https://web-glopresc.vercel.app |
| **Login** | https://web-glopresc.vercel.app/login |
| **Dashboard** | https://web-glopresc.vercel.app/dashboard |
| **Vercel Dashboard** | https://vercel.com/glopresc/web |
| **GitHub Repository** | https://github.com/glorino/talentflow-ai |

## Mobile Applications

| Platform | Link |
|----------|------|
| **Expo Dashboard** | https://expo.dev (after EAS setup) |
| **iOS Build** | Run: `cd apps/mobile && eas build --platform ios` |
| **Android Build** | Run: `cd apps/mobile && eas build --platform android` |

## API Endpoints

```
Production:  https://web-glopresc.vercel.app/api

POST /api/auth              - Login/Register (action: "login" | "register")
GET  /api/auth/me           - Get current user (requires Bearer token)
POST /api/migrate           - Run DB migration (requires secret)
GET  /api/employees         - List employees
POST /api/employees         - Create employee
GET  /api/ai                - List AI agents
POST /api/ai                - Execute AI agent
POST /api/ai/workflows/:id  - Execute workflow
GET  /api/companies/:id/stats - Company stats
```

## Authentication

| Method | Details |
|--------|---------|
| **Type** | JWT (Neon PostgreSQL + bcrypt + jose) |
| **Admin** | admin@talentflow.ai / admin123 |
| **Token** | Bearer token in Authorization header |

## Database

| Service | URL |
|---------|-----|
| **Neon Console** | https://console.neon.tech |
| **Driver** | @neondatabase/serverless (HTTP) |

## Environment Variables (Set in Vercel)

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-here
# Optional AI keys:
OPENAI_API_KEY=sk-...
GOOGLE_AI_API_KEY=...
ANTHROPIC_API_KEY=...
```

## Pages Built

| Page | URL | Status |
|------|-----|--------|
| Login | /login | Live |
| Dashboard | /dashboard | Live |
| Recruitment Jobs | /recruitment/jobs | Live |
| AI Agent Dashboard | /ai/dashboard | Live |
| API Health | /api/ai | Live |
