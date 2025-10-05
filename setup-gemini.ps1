# Gemini AI Setup Script for CyberWise
Write-Host "🚀 Setting up Gemini AI for CyberWise Chatbot..." -ForegroundColor Cyan
Write-Host ""

# Check if .env.local already exists
if (Test-Path ".env.local") {
    Write-Host "⚠️  .env.local file already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "❌ Setup cancelled." -ForegroundColor Red
        exit
    }
}

# Create .env.local file
Write-Host "📝 Creating .env.local file..." -ForegroundColor Green

$envContent = @"
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/cyberwise"

# Gemini AI API Key
# Your API Key from Google AI Studio
GEMINI_API_KEY=AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "✅ .env.local file created successfully!" -ForegroundColor Green
Write-Host ""

# Display next steps
Write-Host "🎉 Setup Complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Restart your development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Open your browser:" -ForegroundColor White
Write-Host "   http://localhost:3000/chatbot" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Test the chatbot with:" -ForegroundColor White
Write-Host "   - Click quick reply buttons" -ForegroundColor Gray
Write-Host "   - Type your own messages" -ForegroundColor Gray
Write-Host "   - Try both English and Hindi" -ForegroundColor Gray
Write-Host ""
Write-Host "✨ Your chatbot is now powered by Gemini AI!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 For more info, see:" -ForegroundColor Yellow
Write-Host "   - GEMINI_AI_SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host "   - QUICK_SETUP.md" -ForegroundColor Gray
Write-Host ""
