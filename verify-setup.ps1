# Verify PostgreSQL Setup - Check Script
# Run this to verify everything is working

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Structura Setup Verification" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check 1: PostgreSQL
Write-Host "[1/4] Checking PostgreSQL..." -ForegroundColor Yellow
$postgresPath = "C:\Program Files\PostgreSQL\15\bin\psql.exe"
$postgresPath32 = "C:\Program Files (x86)\PostgreSQL\15\bin\psql.exe"

if ((Test-Path $postgresPath) -or (Test-Path $postgresPath32)) {
    Write-Host "✓ PostgreSQL installed" -ForegroundColor Green
} else {
    Write-Host "✗ PostgreSQL not found" -ForegroundColor Red
    Write-Host "  Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
}
Write-Host ""

# Check 2: .env.local
Write-Host "[2/4] Checking .env.local..." -ForegroundColor Yellow
$envFile = "$PSScriptRoot\.env.local"
if (Test-Path $envFile) {
    Write-Host "✓ .env.local found" -ForegroundColor Green
    $content = Get-Content $envFile
    if ($content -match "DATABASE_URL") {
        Write-Host "✓ DATABASE_URL configured" -ForegroundColor Green
    }
} else {
    Write-Host "✗ .env.local not found" -ForegroundColor Red
    Write-Host "  Run: .\setup-postgres.ps1" -ForegroundColor Yellow
}
Write-Host ""

# Check 3: Node modules
Write-Host "[3/4] Checking dependencies..." -ForegroundColor Yellow
if ((Test-Path "$PSScriptRoot\node_modules\@prisma") -and (Test-Path "$PSScriptRoot\node_modules\bcryptjs") -and (Test-Path "$PSScriptRoot\node_modules\jsonwebtoken")) {
    Write-Host "✓ All dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Missing dependencies" -ForegroundColor Red
    Write-Host "  Run: npm install" -ForegroundColor Yellow
}
Write-Host ""

# Check 4: Prisma Client
Write-Host "[4/4] Checking Prisma..." -ForegroundColor Yellow
if (Test-Path "$PSScriptRoot\node_modules\.prisma\client") {
    Write-Host "✓ Prisma client generated" -ForegroundColor Green
} else {
    Write-Host "⚠ Prisma client not generated" -ForegroundColor Yellow
    Write-Host "  Run: npx prisma generate" -ForegroundColor Cyan
}
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Verification Complete" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If everything shows ✓, you can start the app:" -ForegroundColor Green
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
