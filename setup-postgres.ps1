Write-Host "Setup Started" -ForegroundColor Green
Write-Host ""

$envPath = "$PSScriptRoot\.env.local"

Write-Host "Step 1: Creating .env.local..." -ForegroundColor Yellow

$envContent = "DATABASE_URL=postgresql://structura_user:Structura@2024!secure@localhost:5432/structura_db`nJWT_SECRET=structura_jwt_secret_minimum_32_characters_key_123456`nSESSION_SECRET=structura_session_secret_minimum_32_characters_key_123`nNEXT_PUBLIC_API_URL=http://localhost:3000`nNODE_ENV=development`nREMEMBER_ME_DURATION_DAYS=30"

$envContent | Out-File -Encoding UTF8 $envPath -Force

Write-Host "DONE: .env.local created" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
Write-Host "DONE: Prisma generated" -ForegroundColor Green
Write-Host ""

Write-Host "Setup Finished!" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT - Create Database" -ForegroundColor Cyan
Write-Host "Run this command: createdb structura_db" -ForegroundColor Yellow
Write-Host ""
Write-Host "Then start the app: npm run dev" -ForegroundColor Green

