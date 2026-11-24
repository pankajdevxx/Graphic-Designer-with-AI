@echo off
echo ===================================================
echo Starting PixelGenCreativity Development Servers...
echo ===================================================

cd /d "%~dp0"

echo [1/3] Starting Django Backend on port 8000...
start "PixelGen Backend (Django)" cmd /k "cd backend && venv\Scripts\activate && python manage.py runserver 8000"

echo [2/3] Starting Vite Frontend on port 5173...
start "PixelGen Frontend (Vite)" cmd /k "cd frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Opening application in Chrome...
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" http://localhost:5173/
) else (
    start http://localhost:5173/
)

echo ==================================================
echo Servers started successfully!
echo Frontend: http://localhost:5173/
echo Backend Health: http://localhost:8000/api/health/
echo ==================================================
pause

