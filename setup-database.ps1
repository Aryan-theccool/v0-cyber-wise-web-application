# Database Setup Script for CyberWise
# This script helps you set up the database quickly

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CyberWise Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (Test-Path ".env") {
    Write-Host "✓ .env file found" -ForegroundColor Green
    Write-Host ""
    Write-Host "Current DATABASE_URL:" -ForegroundColor Yellow
    Get-Content .env | Select-String "DATABASE_URL"
    Write-Host ""
    
    $continue = Read-Host "Do you want to update it? (y/n)"
    if ($continue -ne "y") {
        Write-Host "Skipping .env creation..." -ForegroundColor Yellow
        $skipEnv = $true
    }
} else {
    Write-Host "✗ .env file not found" -ForegroundColor Red
    $skipEnv = $false
}

if (-not $skipEnv) {
    Write-Host ""
    Write-Host "Choose your database provider:" -ForegroundColor Cyan
    Write-Host "1. Vercel Postgres (Recommended - Free)" -ForegroundColor White
    Write-Host "2. Supabase (Free)" -ForegroundColor White
    Write-Host "3. Neon (Free Serverless)" -ForegroundColor White
    Write-Host "4. Local PostgreSQL" -ForegroundColor White
    Write-Host "5. Custom URL" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Enter your choice (1-5)"
    
    switch ($choice) {
        "1" {
            Write-Host ""
            Write-Host "Vercel Postgres Setup:" -ForegroundColor Cyan
            Write-Host "1. Go to https://vercel.com" -ForegroundColor White
            Write-Host "2. Create a Postgres database" -ForegroundColor White
            Write-Host "3. Copy the DATABASE_URL from .env.local tab" -ForegroundColor White
            Write-Host ""
            $dbUrl = Read-Host "Paste your Vercel DATABASE_URL here"
        }
        "2" {
            Write-Host ""
            Write-Host "Supabase Setup:" -ForegroundColor Cyan
            Write-Host "1. Go to https://supabase.com" -ForegroundColor White
            Write-Host "2. Create a project" -ForegroundColor White
            Write-Host "3. Go to Settings → Database → Connection string → URI" -ForegroundColor White
            Write-Host ""
            $dbUrl = Read-Host "Paste your Supabase DATABASE_URL here"
        }
        "3" {
            Write-Host ""
            Write-Host "Neon Setup:" -ForegroundColor Cyan
            Write-Host "1. Go to https://neon.tech" -ForegroundColor White
            Write-Host "2. Create a project" -ForegroundColor White
            Write-Host "3. Copy the connection string" -ForegroundColor White
            Write-Host ""
            $dbUrl = Read-Host "Paste your Neon DATABASE_URL here"
        }
        "4" {
            Write-Host ""
            Write-Host "Local PostgreSQL Setup:" -ForegroundColor Cyan
            $username = Read-Host "Enter PostgreSQL username (default: postgres)"
            if ([string]::IsNullOrWhiteSpace($username)) { $username = "postgres" }
            
            $password = Read-Host "Enter PostgreSQL password" -AsSecureString
            $passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))
            
            $dbname = Read-Host "Enter database name (default: cyberwise)"
            if ([string]::IsNullOrWhiteSpace($dbname)) { $dbname = "cyberwise" }
            
            $dbUrl = "postgresql://${username}:${passwordPlain}@localhost:5432/${dbname}"
        }
        "5" {
            Write-Host ""
            $dbUrl = Read-Host "Enter your custom DATABASE_URL"
        }
        default {
            Write-Host "Invalid choice. Exiting..." -ForegroundColor Red
            exit
        }
    }
    
    # Create .env file
    Write-Host ""
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    
    $envContent = @"
# Database
DATABASE_URL="$dbUrl"

# Gemini AI API Key
GEMINI_API_KEY="AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw"
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✓ .env file created successfully!" -ForegroundColor Green
}

# Run Prisma commands
Write-Host ""
Write-Host "Running database migrations..." -ForegroundColor Yellow
Write-Host ""

try {
    # Generate Prisma Client
    Write-Host "Generating Prisma Client..." -ForegroundColor Cyan
    npx prisma generate
    
    Write-Host ""
    Write-Host "Running migrations..." -ForegroundColor Cyan
    npx prisma migrate dev --name init
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ Database Setup Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: npm run dev" -ForegroundColor White
    Write-Host "2. Go to: http://localhost:3000" -ForegroundColor White
    Write-Host "3. Sign up with a new account" -ForegroundColor White
    Write-Host "4. Sign in and start using CyberWise!" -ForegroundColor White
    Write-Host ""
    
    $openStudio = Read-Host "Do you want to open Prisma Studio to view your database? (y/n)"
    if ($openStudio -eq "y") {
        Write-Host "Opening Prisma Studio..." -ForegroundColor Cyan
        npx prisma studio
    }
    
} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ✗ Error during setup" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error details:" -ForegroundColor Yellow
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Cyan
    Write-Host "1. Check your DATABASE_URL is correct" -ForegroundColor White
    Write-Host "2. Ensure your database is accessible" -ForegroundColor White
    Write-Host "3. For cloud databases, check your internet connection" -ForegroundColor White
    Write-Host "4. See DATABASE_SETUP_GUIDE.md for detailed help" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
