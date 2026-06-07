#!/bin/bash

# TalentFlow AI - Vercel Deployment Script

set -e

echo "🚀 Deploying TalentFlow AI to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "📦 Installing Vercel CLI..."
  npm install -g vercel@latest
fi

# Login to Vercel
echo "🔐 Logging in to Vercel..."
vercel login

# Link project
echo "🔗 Linking project..."
vercel link

# Set environment variables
echo "⚙️  Setting environment variables..."
vercel env add DATABASE_URL production
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
vercel env add CLERK_SECRET_KEY production
vercel env add CLERK_WEBHOOK_SECRET production
vercel env add OPENAI_API_KEY production

# Deploy to preview first
echo "🔍 Deploying to preview..."
vercel --yes

# Deploy to production
echo "🚀 Deploying to production..."
vercel --prod --yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Production URL: https://app.talentflow.ai"
echo "Vercel Dashboard: https://vercel.com/dashboard"
