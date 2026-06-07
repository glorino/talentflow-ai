@rem TalentFlow AI - Windows Setup Script
@echo off

echo 🚀 Setting up TalentFlow AI...

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is required. Download from https://nodejs.org
    exit /b 1
)

echo ✅ Node.js found

:: Install dependencies
echo 📦 Installing dependencies...
call npm install

:: Copy environment file
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ⚠️  Please fill in your API keys in .env
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo   1. Fill in .env with your API keys
echo   2. npm run db:push
echo   3. npm run db:seed
echo   4. npm run dev
