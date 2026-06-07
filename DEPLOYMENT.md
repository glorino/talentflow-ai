# TalentFlow AI - Deployment Guide

## Prerequisites

- Node.js 20+
- npm 10+
- Vercel account
- Neon PostgreSQL account
- Clerk account
- OpenAI API key
- Expo account (for mobile)

## 1. GitHub Repository Setup

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: TalentFlow AI"

# Create GitHub repo (using gh CLI)
gh repo create talentflow-ai --public --source=. --remote=origin --push
```

## 2. Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
# Neon PostgreSQL
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/talentflow?sslmode=require

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx

# OpenAI
OPENAI_API_KEY=sk-xxx
```

## 3. Database Setup

```bash
# Push schema to Neon
npm run db:push

# Seed with demo data
npm run db:seed
```

## 4. Vercel Deployment

### Via CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy to production
vercel --prod
```

### Via GitHub Integration:
1. Go to vercel.com/new
2. Import GitHub repository
3. Configure:
   - Framework Preset: Next.js
   - Root Directory: apps/web
   - Build Command: npm run build
   - Output Directory: .next
4. Add environment variables
5. Deploy

### Required Vercel Secrets:
```
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
VERCEL_TOKEN=xxx
DATABASE_URL=xxx
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxx
CLERK_SECRET_KEY=xxx
CLERK_WEBHOOK_SECRET=xxx
OPENAI_API_KEY=xxx
```

## 5. Mobile App (EAS Build)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
cd apps/mobile
eas build:configure

# Build for iOS
eas build --platform ios --profile production

# Build for Android
eas build --platform android --profile production

# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

## 6. Custom Domain

1. Go to Vercel Dashboard > Settings > Domains
2. Add `app.talentflow.ai`
3. Configure DNS:
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   ```
4. Enable SSL (automatic)

## 7. GitHub Secrets Setup

Go to Settings > Secrets and variables > Actions:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel access token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook secret |
| `OPENAI_API_KEY` | OpenAI API key |
| `EXPO_TOKEN` | Expo access token |

## 8. Webhooks

### Clerk Webhook URL:
```
https://app.talentflow.ai/api/webhooks/clerk
```

### Events to subscribe:
- user.created
- user.updated
- user.deleted
- session.created

## 9. Monitoring

- **Vercel Analytics:** Enable in project settings
- **Vercel Speed Insights:** Add `@vercel/speed-insights`
- **Error Tracking:** Consider Sentry integration

## URLs

| Service | URL |
|---------|-----|
| Production | https://app.talentflow.ai |
| API | https://app.talentflow.ai/api |
| Vercel Dashboard | https://vercel.com/dashboard |
| Neon Console | https://console.neon.tech |
| Clerk Dashboard | https://dashboard.clerk.com |
| Expo Dashboard | https://expo.dev |
