#!/bin/bash

# TalentFlow AI - Setup Script

set -e

echo "🚀 Setting up TalentFlow AI..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node.js 20+ is required. Current: $(node -v)"
  exit 1
fi

echo "✅ Node.js $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
  echo "📝 Creating .env file..."
  cp .env.example .env
  echo "⚠️  Please fill in your API keys in .env"
fi

# Setup database
echo "🗄️  Setting up database..."
echo "Run these commands after filling in DATABASE_URL:"
echo "  npm run db:push"
echo "  npm run db:seed"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Fill in .env with your API keys"
echo "  2. npm run db:push"
echo "  3. npm run db:seed"
echo "  4. npm run dev"
echo ""
echo "For deployment, see DEPLOYMENT.md"
