# Quick Database Setup Script
Write-Host "🗄️ Setting up database for CyberWise..." -ForegroundColor Cyan
Write-Host ""

# Check if using SQLite or PostgreSQL
$useSQLite = Read-Host "Use SQLite (easy, no install)? (y/n)"

if ($useSQLite -eq "y") {
    Write-Host "📝 Configuring SQLite..." -ForegroundColor Green
    
    # Update .env.local for SQLite
    $envContent = @"
# Database Configuration (SQLite - No installation needed)
DATABASE_URL="file:./dev.db"

# Gemini AI API Key
GEMINI_API_KEY=AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw
"@
    
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    
    # Update schema.prisma for SQLite
    Write-Host "📝 Updating Prisma schema for SQLite..." -ForegroundColor Green
    
    $schemaContent = @"
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(cuid())
  username     String   @unique
  passwordHash String
  mobile       String
  parentMobile String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
"@
    
    $schemaContent | Out-File -FilePath "prisma\schema.prisma" -Encoding UTF8
    
    Write-Host "✅ Configuration updated!" -ForegroundColor Green
    Write-Host ""
    
} else {
    Write-Host "⚠️  Please update DATABASE_URL in .env.local manually" -ForegroundColor Yellow
    Write-Host "   Example: postgresql://user:pass@localhost:5432/cyberwise" -ForegroundColor Gray
    Write-Host ""
}

# Run Prisma commands
Write-Host "🔧 Running Prisma setup..." -ForegroundColor Cyan
Write-Host ""

Write-Host "1️⃣ Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

Write-Host ""
Write-Host "2️⃣ Creating database tables..." -ForegroundColor Yellow
npx prisma db push --skip-generate

Write-Host ""
Write-Host "✅ Database setup complete!" -ForegroundColor Green
Write-Host ""

Write-Host "📚 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Restart your dev server: npm run dev" -ForegroundColor White
Write-Host "2. Go to: http://localhost:3000" -ForegroundColor White
Write-Host "3. Sign up with a new account" -ForegroundColor White
Write-Host "4. Your profile should now work!" -ForegroundColor White
Write-Host ""

Write-Host "🔍 To view your database:" -ForegroundColor Cyan
Write-Host "   npx prisma studio" -ForegroundColor Gray
Write-Host ""
