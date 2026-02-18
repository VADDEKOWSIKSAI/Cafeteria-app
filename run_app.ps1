# PowerShell Script to Start the Smart Cafeteria Application (Backend + Frontend)

# 1. Set Java 21 Environment (Adjust path if needed)
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.10.7-hotspot"
$env:Path = "$env:JAVA_HOME\bin;" + $env:Path

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   🍔 Smart Cafeteria - Startup Script    " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 2. Check Database Connection (MySQL Port 3306)
Write-Host "🔍 Checking Database (Port 3306)..." -NoNewline
$dbProcess = Get-NetTCPConnection -LocalPort 3306 -ErrorAction SilentlyContinue
if ($dbProcess) {
    Write-Host " [OK] (MySQL is running)" -ForegroundColor Green
}
else {
    Write-Host " [FAILED]" -ForegroundColor Red
    Write-Host "⚠️  MySQL is NOT running on port 3306." -ForegroundColor Yellow
    Write-Host "   Please start your MySQL server and try again."
    exit 1
}

# 3. Backend Setup (Port 8080)
Write-Host "`n🚀 Starting Backend Server..."
$backendProcesses = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
if ($backendProcesses) {
    Write-Host "⚠️  Port 8080 is busy. Stopping existing processes..." -ForegroundColor Yellow
    foreach ($proc in $backendProcesses) {
        try {
            Stop-Process -Id $proc.OwningProcess -Force -ErrorAction SilentlyContinue
        }
        catch {
            Write-Host "   Could not stop process $($proc.OwningProcess)" -ForegroundColor DarkGray
        }
    }
    Start-Sleep -Seconds 2
}

# Start Backend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'cafeteria-backend'; mvn spring-boot:run"
Write-Host "✅ Backend starting in a new window..." -ForegroundColor Green

# 4. Frontend Setup (Port 5173)
Write-Host "`n🎨 Starting Frontend Client..."
$frontendProcesses = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($frontendProcesses) {
    Write-Host "⚠️  Port 5173 is busy. Stopping existing processes..." -ForegroundColor Yellow
    foreach ($proc in $frontendProcesses) {
        try {
            Stop-Process -Id $proc.OwningProcess -Force -ErrorAction SilentlyContinue
        }
        catch {
            Write-Host "   Could not stop process $($proc.OwningProcess)" -ForegroundColor DarkGray
        }
    }
    Start-Sleep -Seconds 2
}

# Start Frontend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'cafeteria-frontend'; npm run dev"
Write-Host "✅ Frontend starting in a new window..." -ForegroundColor Green

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "   🎉 Application is Launching!           " -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:8080        " -ForegroundColor Gray
Write-Host "   Frontend: http://localhost:5173        " -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Cyan
