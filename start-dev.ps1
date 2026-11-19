# PixelGenCreativity — PowerShell Development Server Launcher
$ErrorActionPreference = "Stop"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "Starting PixelGenCreativity Development Servers..." -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

$WorkspaceRoot = $PSScriptRoot

# 1. Start Django Backend
Write-Host "[1/3] Launching Backend on http://localhost:8000..." -ForegroundColor Green
Start-Process cmd.exe -ArgumentList "/k", "cd /d `"$WorkspaceRoot\backend`" && venv\Scripts\activate && python manage.py runserver 8000"

# 2. Start Vite Frontend
Write-Host "[2/3] Launching Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process cmd.exe -ArgumentList "/k", "cd /d `"$WorkspaceRoot\frontend`" && npm run dev"

# 3. Wait and open browser in Google Chrome
Start-Sleep -Seconds 3
Write-Host "[3/3] Opening Google Chrome at http://localhost:5173/..." -ForegroundColor Yellow
$ChromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (Test-Path $ChromePath) {
    Start-Process $ChromePath "http://localhost:5173/"
} else {
    Start-Process "http://localhost:5173/"
}

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "PixelGenCreativity is live in your browser!" -ForegroundColor Green
Write-Host "Frontend:        http://localhost:5173/" -ForegroundColor Gray
Write-Host "Health Probe:    http://localhost:8000/api/health/" -ForegroundColor Gray
Write-Host "===================================================" -ForegroundColor Cyan

