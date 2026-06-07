# TalentFlow AI

Enterprise AI-Powered HR Operating System

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, TailwindCSS
- **Mobile:** React Native Expo (iOS & Android)
- **Database:** Neon PostgreSQL (Drizzle ORM)
- **Auth:** Clerk
- **AI:** OpenAI Agents SDK
- **Deployment:** Vercel + EAS (Mobile)

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Fill in your API keys

# Push database schema
npm run db:push

# Seed database
npm run db:seed

# Start development
npm run dev
```

## Environment Variables

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
OPENAI_API_KEY=sk-...
```

## Deployment

### Web (Vercel)
```bash
vercel --prod
```

### Mobile (EAS)
```bash
eas build --platform ios
eas build --platform android
```

## Architecture

- Monorepo with Turborepo
- 9 AI Agents with orchestration engine
- Role-based access control (10 roles)
- Real-time attendance tracking
- Multi-tenant support (10K+ companies)
