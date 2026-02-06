
$ErrorActionPreference = "Stop"

$toolsDir = "$env:USERPROFILE\tools"
if (!(Test-Path -Path $toolsDir)) {
    New-Item -ItemType Directory -Force -Path $toolsDir | Out-Null
    Write-Host "Created tools directory at $toolsDir"
}

# --- JDK 17 Setup ---
$jdkUrl = "https://api.adoptium.net/v3/binary/latest/17/ga/windows/x64/jdk/hotspot/normal/eclipse?project=jdk"
$jdkZip = "$toolsDir\jdk17.zip"
$jdkExtractPath = "$toolsDir\jdk-17"

if (!(Test-Path "$jdkExtractPath\bin\java.exe")) {
    Write-Host "Downloading JDK 17..."
    Invoke-WebRequest -Uri $jdkUrl -OutFile $jdkZip
    
    Write-Host "Extracting JDK 17..."
    Expand-Archive -Path $jdkZip -DestinationPath $toolsDir -Force
    
    # Rename extracted folder to predictable name
    $extractedFolder = Get-ChildItem -Path $toolsDir -Directory | Where-Object { $_.Name -like "jdk-17*" } | Select-Object -First 1
    if ($extractedFolder) {
        Rename-Item -Path $extractedFolder.FullName -NewName "jdk-17" -Force
    }
    Remove-Item $jdkZip -Force
    Write-Host "JDK 17 installed."
}
else {
    Write-Host "JDK 17 already seems to be in $jdkExtractPath"
}

# --- Maven Setup ---
$mvnUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"
$mvnZip = "$toolsDir\maven.zip"
$mvnExtractPath = "$toolsDir\apache-maven-3.9.6"

if (!(Test-Path "$mvnExtractPath\bin\mvn.cmd")) {
    Write-Host "Downloading Maven..."
    Invoke-WebRequest -Uri $mvnUrl -OutFile $mvnZip
    
    Write-Host "Extracting Maven..."
    Expand-Archive -Path $mvnZip -DestinationPath $toolsDir -Force
    
    Remove-Item $mvnZip -Force
    Write-Host "Maven installed."
}
else {
    Write-Host "Maven already seems to be in $mvnExtractPath"
}

# --- Path Setup ---
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$newPaths = @()

if ($currentPath -notlike "*$jdkExtractPath\bin*") {
    $newPaths += "$jdkExtractPath\bin"
}
if ($currentPath -notlike "*$mvnExtractPath\bin*") {
    $newPaths += "$mvnExtractPath\bin"
}

if ($newPaths.Count -gt 0) {
    $finalPath = $newPaths -join ";"
    if ($currentPath.Length -gt 0) {
        $finalPath = "$finalPath;$currentPath"
    }
    else {
        $finalPath = "$finalPath"
    }
    
    # Prepend to ensure they take precedence over existing Java 1.8
    [Environment]::SetEnvironmentVariable("Path", $finalPath, "User")
    Write-Host "Environment variables updated. YOU MUST RESTART YOUR TERMINAL/VSCODE."
}
else {
    Write-Host "Path already correctly configured."
}

Write-Host "Setup Complete!"
Write-Host "1. Close ALL VS Code windows and Terminals."
Write-Host "2. Re-open VS Code."
Write-Host "3. Run 'java -version' and 'mvn -version' to verify."
