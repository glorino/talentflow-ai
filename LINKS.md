# TalentFlow AI - Live Links

## ✅ Deployment Complete

## 🌐 Web Application

| Service | URL |
|---------|-----|
| **Production** | https://web-glopresc.vercel.app |
| **Vercel Dashboard** | https://vercel.com/glopresc/web |
| **GitHub Repository** | https://github.com/glorino/talentflow-ai |

## 📱 Mobile Applications

| Platform | Link |
|----------|------|
| **Expo Dashboard** | https://expo.dev (after EAS setup) |
| **iOS Build** | Run: `cd apps/mobile && eas build --platform ios` |
| **Android Build** | Run: `cd apps/mobile && eas build --platform android` |

## 🔗 API Endpoints

```
Production:  https://web-glopresc.vercel.app/api

GET  /api/employees          - List employees
POST /api/employees          - Create employee
GET  /api/ai                 - List AI agents
POST /api/ai                 - Execute AI agent
GET  /api/ai/workflows       - List workflows
POST /api/ai/workflows/:id   - Execute workflow
GET  /api/companies/:id/stats - Company stats
```

## 🔐 Authentication

| Service | Dashboard URL |
|---------|---------------|
| **Clerk Dashboard** | https://dashboard.clerk.com |
| **Webhook URL** | https://web-glopresc.vercel.app/api/webhooks/clerk |

## 🗄️ Database

| Service | URL |
|---------|-----|
| **Neon Console** | https://console.neon.tech |
| **Connect** | `postgresql://xxx@ep-xxx.us-east-2.aws.neon.tech/talentflow` |

## 🔧 Environment Variables (Set in Vercel Dashboard)

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...
OPENAI_API_KEY=sk-...
```

## 📊 Pages Built

| Page | URL | Status |
|------|-----|--------|
| Dashboard | /dashboard | ✅ Live |
| Recruitment Jobs | /recruitment/jobs | ✅ Live |
| AI Agent Dashboard | /ai/dashboard | ✅ Live |
| API Health | /api/ai | ✅ Live |

## 🚀 GitHub Actions (CI/CD)

| Workflow | Trigger |
|----------|---------|
| CI/CD | Push to main |
| Deploy Web | Push to main |
| Build Mobile | Manual trigger |
| DB Migration | Push to packages/database |
