#!/bin/bash

# TalentFlow AI - GitHub Repository Setup Script

set -e

echo "🔧 Setting up GitHub repository..."

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) is required."
  echo "Install: https://cli.github.com/"
  exit 1
fi

# Login to GitHub
echo "🔐 Logging in to GitHub..."
gh auth login

# Create repository
echo "📦 Creating repository..."
gh repo create talentflow-ai --public --source=. --remote=origin --push

# Set up branch protection
echo "🛡️  Setting up branch protection..."
gh api repos/{owner}/talentflow.ai/branches/main/protection -X PUT -f '{
  "required_status_checks": {
    "strict": true,
    "contexts": ["lint", "typecheck", "test"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1
  },
  "restrictions": null
}'

# Create secrets
echo "🔐 Setting up GitHub secrets..."
echo "Please add these secrets manually in GitHub Settings > Secrets:"
echo "  - VERCEL_TOKEN"
echo "  - VERCEL_ORG_ID"
echo "  - VERCEL_PROJECT_ID"
echo "  - DATABASE_URL"
echo "  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "  - CLERK_SECRET_KEY"
echo "  - CLERK_WEBHOOK_SECRET"
echo "  - OPENAI_API_KEY"
echo "  - EXPO_TOKEN"

echo ""
echo "✅ GitHub repository setup complete!"
echo ""
echo "Repository URL: https://github.com/{owner}/talentflow-ai"
echo "Actions URL: https://github.com/{owner}/talentflow-ai/actions"
