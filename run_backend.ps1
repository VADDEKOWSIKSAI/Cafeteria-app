# PowerShell Script to Start Backend with JDK 21

# 1. Set Java 21 Environment for this session only
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.10.7-hotspot"
$env:Path = "$env:JAVA_HOME\bin;" + $env:Path

Write-Host "============================"
Write-Host "🚀 Starting with JDK 21..."
Write-Host "============================"
java -version
Write-Host "============================"

# 2. Clear Port 8080 (if busy)
$portProcess = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
if ($portProcess) {
    Write-Host "⚠️  Port 8080 is busy. Killing process $($portProcess.OwningProcess)..."
    Stop-Process -Id $portProcess.OwningProcess -Force
    Start-Sleep -Seconds 2
    Write-Host "✅ Port 8080 cleared."
}

# 3. Navigate to Backend Folder
Set-Location "$PSScriptRoot\cafeteria-backend"

# 3. Run Spring Boot (and log to file)
Write-Host "LOGGING TO: $PSScriptRoot\backend_debug.log"
mvn -B spring-boot:run | Tee-Object -FilePath "$PSScriptRoot\backend_debug.log"
