# TalentFlow AI - Complete Deployment Links

## 🌐 Production URLs

| Service | URL | Status |
|---------|-----|--------|
| **Web App** | https://app.talentflow.ai | Ready to deploy |
| **API** | https://app.talentflow.ai/api | Ready to deploy |
| **Mobile iOS** | https://apps.apple.com/app/talentflow-ai/id123456789 | Pending App Store |
| **Mobile Android** | https://play.google.com/store/apps/details?id=com.talentflow.ai | Pending Play Store |

## 📊 Service Dashboards

| Service | Dashboard URL |
|---------|---------------|
| **Vercel** | https://vercel.com/dashboard |
| **Neon PostgreSQL** | https://console.neon.tech |
| **Clerk Auth** | https://dashboard.clerk.com |
| **OpenAI** | https://platform.openai.com |
| **Expo (Mobile)** | https://expo.dev |
| **GitHub** | https://github.com/{org}/talentflow-ai |

## 🔗 API Endpoints

```
Base URL:        https://app.talentflow.ai/api

Employees:       GET/POST /api/employees
AI Agents:       GET/POST /api/ai
Workflows:       POST /api/ai/workflows/{workflowId}
Company Stats:   GET /api/companies/{companyId}/stats
Webhooks:        POST /api/webhooks/clerk
```

## 🚀 Deployment Commands

### Web (Vercel)
```bash
# First time setup
npm i -g vercel
vercel login
vercel link
vercel --prod
```

### Database (Neon)
```bash
npm run db:push
npm run db:seed
```

### Mobile (EAS)
```bash
cd apps/mobile
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios --profile production
eas build --platform android --profile production
```

## 🔐 Required Environment Variables

```env
# Database
DATABASE_URL=postgresql://xxx@ep-xxx.us-east-2.aws.neon.tech/talentflow

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx

# AI (OpenAI)
OPENAI_API_KEY=sk-xxx

# Mobile
EXPO_PUBLIC_API_URL=https://app.talentflow.ai
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
```

## 📱 GitHub Actions Workflows

| Workflow | Trigger | File |
|----------|---------|------|
| CI/CD | Push to main | `.github/workflows/ci.yml` |
| Deploy Web | Push to main | `.github/workflows/deploy.yml` |
| Build Mobile | Manual trigger | `.github/workflows/mobile.yml` |
| DB Migration | Push to packages/database | `.github/workflows/migrate.yml` |

## 🎯 Quick Start Links

```
1. Clone:     git clone https://github.com/{org}/talentflow-ai.git
2. Install:   cd talentflow-ai && npm install
3. Setup:     cp .env.example .env (fill in keys)
4. Database:  npm run db:push && npm run db:seed
5. Dev:       npm run dev
6. Deploy:    vercel --prod
```

## 📈 Scaling Targets

| Metric | Current | Target |
|--------|---------|--------|
| Companies | 1 | 10,000 |
| Employees | 4 | 1,000,000 |
| Concurrent Users | - | 100,000 |
| API Response Time | - | <200ms |
| Uptime | - | 99.99% |

## 🛠️ Tech Stack Summary

- **Frontend:** Next.js 15, React 19, TypeScript, TailwindCSS
- **Mobile:** React Native Expo SDK 52
- **Database:** Neon PostgreSQL, Drizzle ORM
- **Auth:** Clerk
- **AI:** OpenAI GPT-4o, Agents SDK
- **Hosting:** Vercel (Web), EAS (Mobile)
- **CI/CD:** GitHub Actions
